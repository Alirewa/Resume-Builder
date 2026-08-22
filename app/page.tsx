'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowDownTrayIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  CheckCircleIcon,
  EyeIcon,
  LanguageIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import { useResumeStore } from '@/lib/store'
import { hasContent } from '@/lib/resume'
import { TEMPLATE_IDS, type TemplateId } from '@/lib/types'
import { AccentPicker, AppLanguageMenu, SiteFooter, SiteHeader, ThemeToggle, Wordmark } from '@/components/ui/Controls'
import { useHydrated } from '@/components/ui/useHydrated'
import { useUi } from '@/components/ui/useUi'

export default function HomePage() {
  const ui = useUi()
  const hydrated = useHydrated()
  const template = useResumeStore((s) => s.resume.template)
  const setTemplate = useResumeStore((s) => s.setTemplate)
  const resume = useResumeStore((s) => s.resume)

  // Before hydration we cannot know whether there is saved work, so the
  // neutral "start" wording is shown for one render.
  const returning = hydrated && hasContent(resume)
  const Arrow = ui.dir === 'rtl' ? ArrowLongLeftIcon : ArrowLongRightIcon

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        start={<Wordmark />}
        end={
          <div className="flex items-center gap-1.5">
            <AppLanguageMenu />
            <AccentPicker />
            <ThemeToggle />
          </div>
        }
      />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-2xl font-extrabold sm:text-4xl">{ui.home.heroTitle}</h1>
          <p className="mx-auto max-w-xl text-sm text-gray-500 sm:text-base dark:text-gray-400">
            {ui.home.heroSubtitle}
          </p>
        </div>

        {/* Template chooser */}
        <section className="mb-10" aria-labelledby="choose-template">
          <h2
            id="choose-template"
            className="mb-4 text-center text-sm font-bold text-gray-700 sm:text-base dark:text-gray-300"
          >
            {ui.home.chooseTemplate}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {TEMPLATE_IDS.map((id) => {
              const meta = ui.templates[id]
              // Only trust the persisted choice once hydrated.
              const selected = hydrated && template === id
              return (
                <button
                  key={id}
                  onClick={() => setTemplate(id)}
                  aria-pressed={selected}
                  className={`relative cursor-pointer rounded-2xl border-2 p-4 text-start transition-all hover:shadow-lg ${
                    selected
                      ? 'border-[var(--accent)] bg-[var(--accent-soft)] shadow-md'
                      : 'border-gray-200 bg-white hover:border-[var(--accent-ring)] dark:border-gray-700 dark:bg-gray-800'
                  }`}
                >
                  {selected && (
                    <CheckCircleIcon className="absolute end-2 top-2 h-5 w-5 text-[var(--accent)]" />
                  )}
                  <TemplateMiniPreview id={id} />
                  <div className="mt-3 text-center">
                    <h3 className="text-sm font-bold">{meta.name}</h3>
                    <p className="mt-0.5 text-xs text-gray-400">{meta.sub}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                      {meta.desc}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Features */}
        <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: <LanguageIcon className="h-6 w-6 text-[var(--accent)]" />,
              title: ui.home.featureLangTitle,
              desc: ui.home.featureLangDesc,
            },
            {
              icon: <PhotoIcon className="h-6 w-6 text-green-500" />,
              title: ui.home.featurePhotoTitle,
              desc: ui.home.featurePhotoDesc,
            },
            {
              icon: <ArrowDownTrayIcon className="h-6 w-6 text-purple-500" />,
              title: ui.home.featurePdfTitle,
              desc: ui.home.featurePdfDesc,
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-2 flex justify-center">{f.icon}</div>
              <h3 className="mb-1 text-sm font-bold">{f.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* Calls to action.
            Starting the builder never clears saved work — a returning visitor
            picks up exactly where they left off. */}
        <div className="space-y-4 text-center">
          <Link
            href="/builder"
            className="inline-flex items-center gap-3 rounded-2xl bg-[var(--accent)] px-8 py-3 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110 sm:py-4 sm:text-lg"
          >
            <span>{returning ? ui.home.resume : ui.home.start}</span>
            <Arrow className="h-5 w-5" />
          </Link>
          <div>
            <Link
              href="/showcase"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <EyeIcon className="h-4 w-4" />
              {ui.home.viewTemplates}
            </Link>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">{ui.home.autosave}</p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

/** Abstract thumbnail of each layout — cheap to render and theme-aware. */
function TemplateMiniPreview({ id }: { id: TemplateId }) {
  return (
    <div className="h-28 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
      {id === 1 && (
        <div className="flex h-full w-full flex-col gap-1 p-2">
          <div className="mx-auto h-2 w-10 rounded bg-gray-400" />
          <div className="mt-1 flex gap-2">
            <div className="h-7 w-7 shrink-0 rounded-full bg-gray-300" />
            <div className="flex flex-1 flex-col gap-1">
              <div className="h-1.5 w-3/4 rounded bg-gray-500" />
              <div className="h-1 w-1/2 rounded bg-gray-300" />
            </div>
          </div>
          <div className="mt-1 space-y-1">
            <div className="h-1 rounded bg-gray-200" />
            <div className="h-1 w-4/5 rounded bg-gray-200" />
            <div className="h-1 w-3/5 rounded bg-gray-200" />
          </div>
        </div>
      )}
      {id === 2 && (
        <div className="flex h-full w-full">
          <div className="flex w-1/3 flex-col gap-1.5 bg-[var(--accent)] p-1.5">
            <div className="mx-auto h-7 w-7 rounded-full bg-white/25" />
            <div className="h-1 rounded bg-white/40" />
            <div className="h-1 w-3/4 rounded bg-white/25" />
          </div>
          <div className="flex flex-1 flex-col gap-1 bg-white p-1.5">
            <div className="h-2 w-3/4 rounded bg-gray-700" />
            <div className="h-1 w-1/2 rounded bg-[var(--accent)]" />
            <div className="mt-0.5 h-1 rounded bg-gray-200" />
            <div className="h-1 w-5/6 rounded bg-gray-200" />
          </div>
        </div>
      )}
      {id === 3 && (
        <div className="flex h-full w-full">
          <div className="w-1.5 shrink-0 bg-[var(--accent)]" />
          <div className="flex flex-1 flex-col gap-1.5 p-2">
            <div className="flex items-center gap-1.5">
              <div className="h-7 w-7 shrink-0 rounded-full bg-[var(--accent-soft)]" />
              <div>
                <div className="h-2 w-14 rounded bg-gray-600" />
                <div className="mt-0.5 h-1 w-10 rounded bg-[var(--accent)]" />
              </div>
            </div>
            <div className="h-1 rounded bg-gray-200" />
            <div className="h-1 w-4/5 rounded bg-gray-200" />
            <div className="mt-0.5 flex gap-1">
              <div className="h-1.5 w-8 rounded bg-[var(--accent-soft)]" />
              <div className="h-1.5 w-6 rounded bg-[var(--accent-soft)]" />
              <div className="h-1.5 w-10 rounded bg-[var(--accent-soft)]" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
