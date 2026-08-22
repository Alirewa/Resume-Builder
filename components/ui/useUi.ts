'use client'

import { useResumeStore } from '@/lib/store'
import { uiStrings, type UiStrings } from '@/lib/ui'
import { useHydrated } from './useHydrated'

/** The language the statically exported HTML is built with. */
const BUILD_LANGUAGE = 'fa'

/**
 * Strings for the app shell, in the user's chosen interface language.
 * Falls back to the build-time language for the first render so the markup
 * matches the pre-rendered HTML (see `useHydrated`).
 */
export function useUi(): UiStrings {
  const lang = useResumeStore((s) => s.settings.appLanguage)
  const hydrated = useHydrated()
  return uiStrings[hydrated ? lang : BUILD_LANGUAGE]
}
