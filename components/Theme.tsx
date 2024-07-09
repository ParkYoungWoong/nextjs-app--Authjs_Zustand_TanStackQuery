'use client'
import { useEffect } from 'react'
import { useThemeStore } from '@/store/theme'

export default function Theme() {
  const isLight = useThemeStore(state => state.isLight)
  const setMode = useThemeStore(state => state.setMode)

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    } else {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    }
  }, [isLight])
  return (
    <>
      {isLight ? (
        <button onClick={() => setMode('dark')}>라이트모드</button>
      ) : (
        <button onClick={() => setMode('light')}>다크모드</button>
      )}
    </>
  )
}
