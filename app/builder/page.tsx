'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ArrowUpTrayIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  EyeIcon,
  LanguageIcon,
  SparklesIcon,
  TrashIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { useResumeStore } from '@/lib/store'
import { completeness, exportBaseName } from '@/lib/resume'
import { parseResumeJson } from '@/lib/schema'
import { readTextFile } from '@/lib/image'
import PersonalInfoStep from '@/components/builder/PersonalInfoStep'
import ExperienceStep from '@/components/builder/ExperienceStep'
import EducationStep from '@/components/builder/EducationStep'
import SkillsStep from '@/components/builder/SkillsStep'
import LanguagesStep from '@/components/builder/LanguagesStep'
import { Button } from '@/components/ui/FormField'
import Modal from '@/components/ui/Modal'
import {
  AccentPicker,
  AppLanguageMenu,
  SiteFooter,
  SiteHeader,
  ThemeToggle,
  Wordmark,
} from '@/components/ui/Controls'
import { useToast } from '@/components/ui/Toast'
import { useUi } from '@/components/ui/useUi'
import { useHydrated } from '@/components/ui/useHydrated'

const STEPS = [
  { icon: UserIcon, Component: PersonalInfoStep },
  { icon: BriefcaseIcon, Component: ExperienceStep },
  { icon: AcademicCapIcon, Component: EducationStep },
  { icon: WrenchScrewdriverIcon, Component: SkillsStep },
  { icon: LanguageIcon, Component: LanguagesStep },
] as const

type Confirmation = 'reset' | 'sample' | null

export default function BuilderPage() {
  const ui = useUi()
  const toast = useToast()
  const hydrated = useHydrated()

  const [currentStep, setCurrentStep] = useState(0)
  const [confirming, setConfirming] = useState<Confirmation>(null)
  const importInputRef = useRef<HTMLInputElement>(null)

  const resume = useResumeStore((s) => s.resume)
  const resetResume = useResumeStore((s) => s.resetResume)
  const importResume = useResumeStore((s) => s.importResume)
  const loadSample = useResumeStore((s) => s.loadSample)
  const undo = useResumeStore((s) => s.undo)

  const CurrentStep = STEPS[currentStep].Component
  const score = completeness(resume)
  const PrevIcon = ui.dir === 'rtl' ? ArrowLongRightIcon : ArrowLongLeftIcon
  const NextIcon = ui.dir === 'rtl' ? ArrowLongLeftIcon : ArrowLongRightIcon

  /** Every destructive action offers a single-step undo from the toast. */
  const undoAction = { label: ui.toast.undo, onClick: () => {
    undo()
    toast.success(ui.toast.undone)
  } }

  const handleReset = () => {
    resetResume()
    setCurrentStep(0)
    setConfirming(null)
    toast.success(ui.toast.cleared, undoAction)
  }

  const handleLoadSample = () => {
    loadSample()
    setCurrentStep(0)
    setConfirming(null)
    toast.success(ui.toast.sampleLoaded, undoAction)
  }

  const handleExportJson = () => {
    const filename = `${exportBaseName(resume)}_${new Date().toISOString().slice(0, 10)}.json`
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    // Revoking synchronously can cancel the download in some browsers.
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    toast.success(ui.toast.exportOk)
  }

  const handleImportJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    let text: string
    try {
      text = await readTextFile(file)
    } catch {
      toast.error(ui.toast.importBadJson)
      return
    }

    const result = parseResumeJson(text)
    if (!result.ok) {
      toast.error(result.reason === 'not-json' ? ui.toast.importBadJson : ui.toast.importNotResume)
      return
    }

    importResume(result.data)
    setCurrentStep(0)
    toast.success(ui.toast.importOk, undoAction)
  }

  const sidebarActions = (
    <>
      <Link
        href="/preview"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
      >
        <ArrowDownTrayIcon className="h-4 w-4" />
        {ui.builder.getPdf}
      </Link>
      <Button variant="secondary" fullWidth onClick={() => setConfirming('sample')}>
        <SparklesIcon className="h-4 w-4" />
        {ui.builder.loadSample}
      </Button>
      <Button variant="danger" fullWidth onClick={() => setConfirming('reset')}>
        <TrashIcon className="h-4 w-4" />
        {ui.builder.clearForm}
      </Button>

      <div className="space-y-2 border-t border-gray-200 pt-2 dark:border-gray-700">
        <p className="px-1 text-xs font-semibold text-gray-400 dark:text-gray-500">
          {ui.builder.jsonSection}
        </p>
        <Button variant="secondary" fullWidth onClick={handleExportJson}>
          <CodeBracketIcon className="h-4 w-4" />
          {ui.builder.exportJson}
        </Button>
        <Button variant="secondary" fullWidth onClick={() => importInputRef.current?.click()}>
          <ArrowUpTrayIcon className="h-4 w-4" />
          {ui.builder.importJson}
        </Button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        start={
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <PrevIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{ui.nav.back}</span>
            </Link>
            <span className="hidden md:block">
              <Wordmark />
            </span>
          </div>
        }
        end={
          <div className="flex items-center gap-1.5">
            <AppLanguageMenu />
            <AccentPicker />
            <ThemeToggle />
            <Link
              href="/preview"
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[var(--accent)] px-3 py-2 text-xs font-medium text-white transition hover:brightness-110 sm:text-sm"
            >
              <EyeIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{ui.nav.preview}</span>
            </Link>
          </div>
        }
      />

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 sm:py-8 lg:flex-row lg:gap-8">
        {/* ── Step navigation ── */}
        <aside className="shrink-0 lg:w-56">
          {/* Mobile: horizontal tab strip */}
          <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  aria-current={currentStep === i ? 'step' : undefined}
                  className={`flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-medium transition ${
                    currentStep === i
                      ? 'bg-[var(--accent)] text-white shadow-sm'
                      : 'border border-gray-200 bg-white text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {ui.builder.steps[i]}
                </button>
              )
            })}
          </div>

          {/* Desktop: sticky sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-20 space-y-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <nav aria-label={ui.nav.build} className="space-y-1">
                {STEPS.map((step, i) => {
                  const Icon = step.icon
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentStep(i)}
                      aria-current={currentStep === i ? 'step' : undefined}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        currentStep === i
                          ? 'bg-[var(--accent)] text-white'
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="text-start">{ui.builder.steps[i]}</span>
                    </button>
                  )
                })}
              </nav>

              <CompletenessMeter label={ui.builder.completeness} score={hydrated ? score : 0} />

              <div className="space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                {sidebarActions}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Current step ── */}
        <main className="min-w-0 flex-1">
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2">
              {React.createElement(STEPS[currentStep].icon, {
                className: 'h-5 w-5 shrink-0 text-[var(--accent)]',
              })}
              <h1 className="text-lg font-bold sm:text-xl">{ui.builder.steps[currentStep]}</h1>
            </div>
            <ol className="flex items-center gap-1.5">
              {STEPS.map((_, i) => (
                <li key={i} className="flex-1">
                  <button
                    onClick={() => setCurrentStep(i)}
                    aria-label={ui.builder.steps[i]}
                    className="h-1.5 w-full cursor-pointer rounded-full transition-all"
                    style={{
                      backgroundColor:
                        i <= currentStep ? 'var(--accent)' : 'rgb(156 163 175 / 0.35)',
                    }}
                  />
                </li>
              ))}
            </ol>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              {ui.builder.stepOf(currentStep + 1, STEPS.length)}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-gray-800">
            {/* The form reads persisted data, so it waits one render for hydration. */}
            {hydrated ? <CurrentStep /> : <StepSkeleton />}
          </div>

          {/* Mobile action rows */}
          <div className="mt-4 space-y-2 lg:hidden">
            <CompletenessMeter label={ui.builder.completeness} score={hydrated ? score : 0} />
            <div className="space-y-2 rounded-2xl border border-gray-100 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
              {sidebarActions}
            </div>
          </div>

          <div className="mt-4 flex justify-between gap-3 sm:mt-5">
            <Button
              variant="secondary"
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0}
            >
              <PrevIcon className="h-4 w-4" />
              {ui.builder.prev}
            </Button>

            {currentStep < STEPS.length - 1 ? (
              <Button onClick={() => setCurrentStep((s) => s + 1)}>
                {ui.builder.next}
                <NextIcon className="h-4 w-4" />
              </Button>
            ) : (
              <Link
                href="/preview"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
              >
                {ui.builder.viewResume}
                <EyeIcon className="h-4 w-4" />
              </Link>
            )}
          </div>
        </main>
      </div>

      <input
        ref={importInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleImportJson}
      />

      <Modal
        open={confirming !== null}
        onClose={() => setConfirming(null)}
        title={confirming === 'sample' ? ui.builder.loadSampleTitle : ui.builder.clearTitle}
      >
        <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">
          {confirming === 'sample' ? ui.builder.loadSampleBody : ui.builder.clearBody}
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={() => setConfirming(null)}>
            {ui.builder.cancel}
          </Button>
          <button
            onClick={confirming === 'sample' ? handleLoadSample : handleReset}
            className={`w-full cursor-pointer rounded-xl py-2.5 text-sm font-medium text-white transition ${
              confirming === 'sample'
                ? 'bg-[var(--accent)] hover:brightness-110'
                : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {confirming === 'sample' ? ui.builder.confirmLoadSample : ui.builder.confirmClear}
          </button>
        </div>
      </Modal>

      <SiteFooter />
    </div>
  )
}

function CompletenessMeter({ label, score }: { label: string; score: number }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-semibold text-gray-600 dark:text-gray-300">{label}</span>
        <span className="font-bold text-[var(--accent)]">{score}%</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

function StepSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-hidden>
      <div className="h-24 rounded-xl bg-gray-100 dark:bg-gray-700" />
      <div className="h-10 rounded-lg bg-gray-100 dark:bg-gray-700" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-10 rounded-lg bg-gray-100 dark:bg-gray-700" />
        <div className="h-10 rounded-lg bg-gray-100 dark:bg-gray-700" />
      </div>
      <div className="h-24 rounded-lg bg-gray-100 dark:bg-gray-700" />
    </div>
  )
}
