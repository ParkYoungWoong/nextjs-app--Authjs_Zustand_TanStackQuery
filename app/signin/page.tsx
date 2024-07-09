import { signInWithCredentials, signInWithGoogle } from '@/serverActions/auth'

export default function SignInPage() {
  return (
    <>
      <h1>로그인</h1>
      <form
        action={signInWithCredentials}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          gap: '10px',
          width: '200px',
          margin: '10px',
          padding: '10px',
          border: '2px solid'
        }}>
        <label>
          <div>이메일</div>
          <input
            name="email"
            type="email"
          />
        </label>
        <label>
          <div>비밀번호</div>
          <input
            name="password"
            type="password"
          />
        </label>
        <button>ID/PW 로그인</button>
      </form>
      <form
        action={signInWithGoogle}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          gap: '10px',
          width: '200px',
          margin: '10px',
          padding: '10px',
          border: '2px solid'
        }}>
        <button type="submit">Google 로그인</button>
      </form>
    </>
  )
}
