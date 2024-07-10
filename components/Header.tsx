import Link from 'next/link'
import Image from 'next/image'
import { getSession, signOutWithForm } from '@/serverActions/auth'
import Theme from './Theme'

export default async function Header() {
  const session = await getSession()

  return (
    <header>
      <nav
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          height: '50px',
          borderBottom: '1px solid',
          padding: '10px'
        }}>
        <Link href="/">홈</Link>
        {session?.user ? (
          <>
            <Link href="/myaccount">내 정보 수정</Link>
            <Link href="/users">모든 사용자 보기</Link>
            <div style={{ flexGrow: '1' }}></div>
            <Theme key="theme" />
            <form
              action={signOutWithForm}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}>
              {session.user?.image && (
                <Image
                  src={session.user?.image as string}
                  alt={session.user?.name as string}
                  width={40}
                  height={40}
                  style={{ borderRadius: '50%' }}
                />
              )}
              <div>{session?.user?.name}</div>
              <button type="submit">로그아웃</button>
            </form>
          </>
        ) : (
          <>
            <div style={{ flexGrow: '1' }}></div>
            <Theme key="theme" />
            <Link href="/signin">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  )
}
