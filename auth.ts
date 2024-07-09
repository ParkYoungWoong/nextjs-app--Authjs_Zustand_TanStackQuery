import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

interface UserInfo {
  displayName?: string
  email: string
  password: string
}
interface ResponseValue {
  user: {
    email: string // 사용자 이메일
    displayName: string // 사용자 표시 이름
    profileImg: string | null // 사용자 프로필 이미지(URL)
  }
  accessToken: string // 사용자 접근 토큰
}

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update // Beta!
} = NextAuth({
  providers: [
    Credentials({
      authorize: async credentials => {
        const userInfo = credentials as unknown as UserInfo
        // 회원가입
        if (userInfo.displayName) {
          return _signIn('signup', userInfo)
        }
        // 로그인
        return _signIn('login', userInfo)
      }
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent' // 사용자에게 항상 동의 화면을 표시하도록 강제!
        }
      }
    })
  ],
  session: {
    strategy: 'jwt', // JSON Web Token 사용
    maxAge: 60 * 60 * 24 // 세션 만료 시간(sec)
  },
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    signIn: async ({ account, profile, user }) => {
      if (account?.provider === 'google') {
        try {
          // 사용자 확인
          const type = (await _existUser(user.email as string))
            ? 'oauth/login'
            : 'oauth/signup'
          // 회원가입 또는 로그인
          const _user = await _signIn(type, {
            displayName: user.name as string,
            email: user.email as string,
            profileImg: user.image as string
          })
          Object.assign(user, _user) // jwt 콜백의 user 속성과 병합
        } catch (error) {
          if (error instanceof Error) {
            return `/error?message=${encodeURIComponent(error.message)}`
          }
        }
        return !!profile?.email_verified
      }
      return true
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        Object.assign(token, user)
      }
      if (trigger === 'update' && session) {
        Object.assign(token, session.user)
        token.picture = session.user.image // 사진을 변경했을 때 반영!
      }
      return token
    },
    session: async ({ session, token }) => {
      Object.assign(session, token)
      return session
    }
  }
})

// 사용자 확인
async function _existUser(email: string) {
  const res = await fetch(`${process.env.HEROPY_API_URL}/auth/exists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.HEROPY_API_KEY,
      username: process.env.HEROPY_API_USERNAME,
      email
    },
    cache: 'no-store'
  })
  return (await res.json()) as boolean
}

// 회원가입 또는 로그인
async function _signIn(
  type: 'signup' | 'login' | 'oauth/signup' | 'oauth/login',
  body: {
    email: string
    password?: string
    displayName?: string
    profileImg?: string
  }
) {
  const res = await fetch(`${process.env.HEROPY_API_URL}/auth/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.HEROPY_API_KEY,
      username: process.env.HEROPY_API_USERNAME
    },
    body: JSON.stringify(body),
    cache: 'no-store'
  })
  const data = (await res.json()) as ResponseValue | string

  if (res.ok && typeof data !== 'string') {
    const { user, accessToken } = data
    return {
      email: user.email,
      name: user.displayName,
      image: user.profileImg,
      accessToken
    }
  }

  throw new Error(
    (data as string) || '문제가 발생했습니다, 잠시 후 다시 시도하세요.'
  )
}
