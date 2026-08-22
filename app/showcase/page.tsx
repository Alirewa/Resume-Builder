'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useResumeStore } from '@/lib/store'
import { sampleResume } from '@/lib/sampleData'
import { TEMPLATE_IDS, type TemplateId } from '@/lib/types'
import ResumeDocument from '@/components/templates/ResumeDocument'
import Modal from '@/components/ui/Modal'
import {
  AccentPicker,
  AppLanguageMenu,
  SiteFooter,
  SiteHeader,
  ThemeToggle,
  Wordmark,
} from '@/components/ui/Controls'
import { useUi } from '@/components/ui/useUi'
import { useHydrated } from '@/components/ui/useHydrated'

/** A4 (794 px) scaled into a 276 px card. */
const CARD_SCALE = 0.348

export default function ShowcasePage() {
  const ui = useUi()
  const hydrated = useHydrated()
  const appLanguage = useResumeStore((s) => s.settings.appLanguage)
  const accent = useResumeStore((s) => s.settings.accentColor)
  const setTemplate = useResumeStore((s) => s.setTemplate)

  const [active, setActive] = useState<TemplateId | null>(null)

  // The gallery previews the sample in whichever language the user reads.
  const demo = sampleResume(hydrated ? appLanguage : 'fa')

  const step = useCallback((delta: number) => {
    setActive((current) => {
      const index = (current ?? 1) - 1
      return (((index + delta + TEMPLATE_IDS.length) % TEMPLATE_IDS.length) + 1) as TemplateId
    })
  }, [])

  // Arrow keys walk the gallery while the lightbox is open.
  useEffect(() => {
    if (active === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [active, step])

  const NextIcon = ui.dir === 'rtl' ? ArrowLongLeftIcon : ArrowLongRightIcon

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950">
      <SiteHeader
        start={<Wordmark />}
        end={
          <div className="flex items-center gap-1.5">
            <AppLanguageMenu />
            <AccentPicker />
            <ThemeToggle />
            <Link
              href="/builder"
              className="flex items-center gap-1.5 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <span className="hidden sm:inline">{ui.nav.build}</span>
              <NextIcon className="h-4 w-4" />
            </Link>
          </div>
        }
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-2xl font-extrabold sm:text-3xl">{ui.showcase.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{ui.showcase.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TEMPLATE_IDS.map((id) => {
            const meta = ui.templates[id]
            return (
              <div key={id} className="mx-auto flex w-full max-w-[276px] flex-col gap-3">
                <div className="text-center">
                  <h2 className="text-sm font-bold">{meta.name}</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{meta.desc}</p>
                </div>

                <button
                  onClick={() => setActive(id)}
                  aria-label={`${meta.name} — ${ui.showcase.zoom}`}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 transition-all hover:border-[var(--accent)] hover:shadow-2xl dark:border-gray-700"
                >
                  <div style={{ height: '340px', overflow: 'hidden', position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        insetInlineStart: 0,
                        transform: `scale(${CARD_SCALE})`,
                        transformOrigin: 'top left',
                        width: '210mm',
                        pointerEvents: 'none',
                      }}
                    >
                      <ResumeDocument templateId={id} data={demo} accentColor={accent} />
                    </div>
                  </div>

                  <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-800 shadow-lg">
                      {ui.showcase.zoom}
                    </span>
                  </span>
                </button>

                <Link
                  href="/builder"
                  onClick={() => setTemplate(id)}
                  className="w-full rounded-xl bg-[var(--accent)] py-2.5 text-center text-sm font-medium text-white transition hover:brightness-110"
                >
                  {ui.showcase.useTemplate}
                </Link>
              </div>
            )
          })}
        </div>
      </main>

      {/* ── Lightbox ── */}
      <Modal open={active !== null} onClose={() => setActive(null)} bare labelledBy="gallery-title">
        <h2 id="gallery-title" className="sr-only">
          {active !== null ? ui.templates[active].name : ui.showcase.title}
        </h2>

        <div className="flex items-center gap-2 sm:gap-4">
          <GalleryNav label={ui.showcase.prevTemplate} onClick={() => step(-1)}>
            <ChevronLeftIcon className="h-5 w-5" />
          </GalleryNav>

          <div
            style={{
              width: '210mm',
              maxWidth: 'min(95vw, 720px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              borderRadius: '4px',
              overflow: 'hidden',
              background: '#fff',
            }}
          >
            {active !== null && (
              <ResumeDocument templateId={active} data={demo} accentColor={accent} />
            )}
          </div>

          <GalleryNav label={ui.showcase.nextTemplate} onClick={() => step(1)}>
            <ChevronRightIcon className="h-5 w-5" />
          </GalleryNav>
        </div>

        <div className="mt-5 flex justify-center gap-3">
          <Link
            href="/builder"
            onClick={() => active !== null && setTemplate(active)}
            className="flex items-center gap-2 rounded-2xl bg-[var(--accent)] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
          >
            {ui.showcase.startWithTemplate}
            <NextIcon className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setActive(null)}
            className="flex cursor-pointer items-center gap-2 rounded-2xl bg-white/90 px-4 py-3 text-sm font-medium text-gray-700 shadow-lg transition hover:bg-white"
          >
            <XMarkIcon className="h-4 w-4" />
            {ui.showcase.close}
          </button>
        </div>
      </Modal>

      <SiteFooter />
    </div>
  )
}

/** Gallery arrows sit inside the flex row rather than hanging off the panel,
 *  which used to push them off-screen on narrow viewports. */
function GalleryNav({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition hover:bg-gray-100"
    >
      {children}
    </button>
  )
}
