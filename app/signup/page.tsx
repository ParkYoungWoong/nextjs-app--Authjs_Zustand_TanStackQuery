import { signInWithCredentials, signInWithGoogle } from '@/serverActions/auth'

export default function SignUpPage() {
  return (
    <>
      <h1>회원가입</h1>
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
          <div>비밀번호(8자리 이상)</div>
          <input
            name="password"
            type="password"
          />
        </label>
        <label>
          <div>사용자 이름</div>
          <input
            name="displayName"
            type="text"
          />
        </label>
        <button>ID/PW 회원가입</button>
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
        <button type="submit">Google 회원가입</button>
      </form>
    </>
  )
}
