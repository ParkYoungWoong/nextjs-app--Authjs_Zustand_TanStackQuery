'use client'
import Image from 'next/image'
import { useState, useCallback, use, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getSession } from '@/serverActions/auth'
import { updateUser } from '@/serverActions/user'
import type { UpdateUserParams } from '@/serverActions/user'

export default function MyaccountPage() {
  const [imageBase64, setImageBase64] = useState('')
  const [currentImage, setCurrentImage] = useState('')

  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ['session'],
    queryFn: () => getSession(),
    staleTime: 0 // 명시적으로 캐시를 사용하지 않음
  })

  useEffect(() => {
    setCurrentImage(session?.user?.image as string)
  }, [session])

  const { mutate, isPending: submitting } = useMutation({
    mutationFn: async (userData: UpdateUserParams) => {
      await updateUser(userData)
    }
  })

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', () => {
          const base64 = reader.result as string
          setImageBase64(base64)
          setCurrentImage(base64)
        })
      }
    },
    []
  )
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      mutate({
        displayName: formData.get('displayName') as string | null,
        profileImgBase64: imageBase64
      })
    },
    [mutate, imageBase64]
  )

  return (
    <>
      <h1>내 정보 수정</h1>
      <form
        onSubmit={handleSubmit}
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
        {sessionLoading ? (
          <div>로딩 중...</div>
        ) : (
          <>
            <label>
              <div>사용자 이름</div>
              <input
                type="text"
                name="displayName"
                defaultValue={session?.user?.name as string}
              />
            </label>
            <label>
              <div>프로필 이미지</div>
              <input
                type="file"
                name="profileImgBase64"
                onChange={handleFileChange}
              />
              {currentImage && (
                <Image
                  src={currentImage}
                  alt={session?.user?.name as string}
                  width={100}
                  height={100}
                />
              )}
            </label>
            <button
              disabled={submitting}
              type="submit">
              {submitting ? '처리 중..' : '수정'}
            </button>
          </>
        )}
      </form>
    </>
  )
}
