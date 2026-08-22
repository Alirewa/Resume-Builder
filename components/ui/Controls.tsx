'use client'

import React from 'react'
import Link from 'next/link'
import { DocumentTextIcon, MoonIcon, SunIcon, SwatchIcon, LanguageIcon } from '@heroicons/react/24/outline'
import { ACCENT_COLORS, useResumeStore } from '@/lib/store'
import { APP_LANGUAGE_OPTIONS } from '@/lib/ui'
import { IconButton } from './FormField'
import Popover from './Popover'
import { useUi } from './useUi'

/* The chrome controls that appear on every page, defined once so the header
   of each route cannot drift out of sync with the others. */

export function ThemeToggle() {
  const ui = useUi()
  const darkMode = useResumeStore((s) => s.settings.darkMode)
  const toggleDarkMode = useResumeStore((s) => s.toggleDarkMode)

  return (
    <IconButton
      label={darkMode ? ui.common.lightMode : ui.common.darkMode}
      aria-pressed={darkMode}
      onClick={toggleDarkMode}
      className="bg-gray-100 dark:bg-gray-800 dark:text-yellow-400"
    >
      {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </IconButton>
  )
}

export function AccentPicker() {
  const ui = useUi()
  const accentColor = useResumeStore((s) => s.settings.accentColor)
  const setAccentColor = useResumeStore((s) => s.setAccentColor)

  return (
    <Popover
      align="end"
      trigger={({ toggle, open }) => (
        <IconButton
          label={ui.common.accentColor}
          aria-expanded={open}
          onClick={toggle}
          className="bg-gray-100 dark:bg-gray-800"
        >
          <SwatchIcon className="h-4 w-4" style={{ color: accentColor }} />
        </IconButton>
      )}
    >
      {({ close }) => (
        <div className="w-44">
          <p className="mb-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
            {ui.common.accentColor}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {ACCENT_COLORS.map((c) => {
              const selected = accentColor === c.value
              return (
                <button
                  key={c.value}
                  onClick={() => {
                    setAccentColor(c.value)
                    close()
                  }}
                  aria-label={ui.colors[c.key]}
                  aria-pressed={selected}
                  title={ui.colors[c.key]}
                  className="h-8 w-8 cursor-pointer rounded-full border-2 transition hover:scale-110"
                  style={{
                    backgroundColor: c.value,
                    borderColor: selected ? '#fff' : 'transparent',
                    boxShadow: selected ? `0 0 0 2px ${c.value}` : 'none',
                  }}
                />
              )
            })}
          </div>
        </div>
      )}
    </Popover>
  )
}

export function AppLanguageMenu() {
  const ui = useUi()
  const appLanguage = useResumeStore((s) => s.settings.appLanguage)
  const setAppLanguage = useResumeStore((s) => s.setAppLanguage)
  const active = APP_LANGUAGE_OPTIONS.find((o) => o.value === appLanguage)

  return (
    <Popover
      align="end"
      trigger={({ toggle, open }) => (
        <IconButton
          label={ui.common.appLanguage}
          aria-expanded={open}
          onClick={toggle}
          className="bg-gray-100 dark:bg-gray-800"
        >
          <span className="flex items-center gap-1 text-xs font-semibold uppercase">
            <LanguageIcon className="h-4 w-4" />
            {active?.value}
          </span>
        </IconButton>
      )}
    >
      {({ close }) => (
        <div className="w-40">
          <p className="mb-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
            {ui.common.appLanguage}
          </p>
          <div className="flex flex-col gap-1">
            {APP_LANGUAGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setAppLanguage(opt.value)
                  close()
                }}
                aria-pressed={opt.value === appLanguage}
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${
                  opt.value === appLanguage
                    ? 'bg-[var(--accent)] text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span aria-hidden>{opt.flag}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </Popover>
  )
}

export function Wordmark({ href = '/' }: { href?: string }) {
  const ui = useUi()
  return (
    <Link href={href} className="flex items-center gap-2">
      <DocumentTextIcon className="h-6 w-6 shrink-0 text-[var(--accent)]" />
      <span className="text-sm font-extrabold text-gray-800 sm:text-base dark:text-gray-100">
        {ui.appName} <span className="text-[var(--accent)]">{ui.appNameAccent}</span>
      </span>
    </Link>
  )
}

export function SiteHeader({ start, end }: { start?: React.ReactNode; end?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white shadow-sm no-print dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2.5 sm:px-6">
        {start}
        <div className="flex-1" />
        {end}
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 py-4 text-center text-xs text-gray-400 no-print dark:border-gray-800 dark:text-gray-500">
      <span className="inline-flex items-center gap-1">
        Made with <span className="text-red-500">❤</span> by
        <a
          href="https://github.com/Alirewa"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[var(--accent)] hover:underline"
        >
          @Alirewa
        </a>
      </span>
    </footer>
  )
}
