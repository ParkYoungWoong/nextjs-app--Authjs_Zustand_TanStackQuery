import { getAllUsers } from '@/serverActions/user'

export default async function Users() {
  const users = await getAllUsers()
  return (
    <>
      <h1>모든 사용자</h1>
      <ul>
        {users.map(user => (
          <li key={user.email}>
            <div>{user.displayName}</div>
            <div>{user.email}</div>
            <div>{user.profileImg}</div>
          </li>
        ))}
      </ul>
    </>
  )
}
