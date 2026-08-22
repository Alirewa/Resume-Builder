'use client'

import { useEffect } from 'react'
import { useResumeStore } from '@/lib/store'
import { withAlpha } from '@/lib/color'
import { uiStrings } from '@/lib/ui'

/**
 * Mirrors persisted settings onto the document element.
 *
 * `<html>` is rendered statically at build time, so language, direction, theme
 * and accent can only be applied once the store has rehydrated on the client.
 */
export default function ThemeSync() {
  const darkMode = useResumeStore((s) => s.settings.darkMode)
  const accentColor = useResumeStore((s) => s.settings.accentColor)
  const appLanguage = useResumeStore((s) => s.settings.appLanguage)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--accent', accentColor)
    // Derived tints are written as rgba() rather than declared with
    // color-mix() in CSS, because html2canvas cannot parse modern colour
    // functions and would fail the PDF export.
    root.style.setProperty('--accent-soft', withAlpha(accentColor, 0.12))
    root.style.setProperty('--accent-ring', withAlpha(accentColor, 0.45))
  }, [accentColor])

  useEffect(() => {
    const { htmlLang, dir } = uiStrings[appLanguage]
    document.documentElement.lang = htmlLang
    document.documentElement.dir = dir
  }, [appLanguage])

  return null
}
