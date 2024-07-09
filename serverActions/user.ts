'use server'
import { redirect } from 'next/navigation'
import { getSession, updateSession } from '@/serverActions/auth'

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
