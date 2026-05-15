'use client'

import { useEffect } from 'react'
import { useResumeStore } from '@/lib/store'

export default function DarkModeSync() {
  const darkMode = useResumeStore((s) => s.settings.darkMode)

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [darkMode])

  return null
}
