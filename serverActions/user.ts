'use server'
import { redirect } from 'next/navigation'
import { getSession, updateSession } from '@/serverActions/auth'

export type Users = User[]
export interface User {
  email: string // 사용자 아이디
  displayName: string // 사용자 표시 이름
  profileImg: string // 사용자 프로필 이미지 URL
}
export interface UpdateUserParams {
  displayName: string | null
  profileImgBase64: string | null
}

export async function updateUser(body: UpdateUserParams) {
  const session = await getSession()
  const res = await fetch(`${process.env.HEROPY_API_URL}/auth/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.HEROPY_API_KEY,
      username: process.env.HEROPY_API_USERNAME,
      Authorization: `Bearer ${session?.accessToken}`
    },
    body: JSON.stringify(body),
    cache: 'no-store'
  })
  const updatedUser = await res.json()
  await updateSession({
    user: {
      name: updatedUser.displayName,
      image: updatedUser.profileImg
    }
  })
  redirect('/myaccount')
}

export async function authorizeUser() {
  const session = await getSession()
  const res = await fetch(`${process.env.HEROPY_API_URL}/auth/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.HEROPY_API_KEY,
      username: process.env.HEROPY_API_USERNAME,
      Authorization: `Bearer ${session?.accessToken}`
    },
    cache: 'no-store'
  })
  const json = await res.json()
  return !!json?.email
}

export async function getAllUsers(): Promise<Users> {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const res = await fetch(`${process.env.HEROPY_API_URL}/auth/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      apikey: process.env.HEROPY_API_KEY,
      username: process.env.HEROPY_API_USERNAME,
      masterKey: 'true'
    },
    cache: 'no-store'
  })
  return await res.json()
}
