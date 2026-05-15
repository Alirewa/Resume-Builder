'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { useResumeStore, ACCENT_COLORS } from '@/lib/store'
import PersonalInfoStep from '@/components/builder/PersonalInfoStep'
import ExperienceStep from '@/components/builder/ExperienceStep'
import EducationStep from '@/components/builder/EducationStep'
import SkillsStep from '@/components/builder/SkillsStep'
import LanguagesStep from '@/components/builder/LanguagesStep'
import {
  UserIcon, BriefcaseIcon, AcademicCapIcon,
  WrenchScrewdriverIcon, LanguageIcon,
  DocumentTextIcon, ArrowRightIcon, ArrowLeftIcon,
  EyeIcon, ArrowDownTrayIcon, TrashIcon,
  SunIcon, MoonIcon, SwatchIcon,
  ArrowUpTrayIcon, CodeBracketIcon,
} from '@heroicons/react/24/outline'

const steps = [
  { id: 0, labelFa: 'اطلاعات شخصی', icon: UserIcon, component: PersonalInfoStep },
  { id: 1, labelFa: 'سابقه کاری', icon: BriefcaseIcon, component: ExperienceStep },
  { id: 2, labelFa: 'تحصیلات', icon: AcademicCapIcon, component: EducationStep },
  { id: 3, labelFa: 'مهارت‌ها', icon: WrenchScrewdriverIcon, component: SkillsStep },
  { id: 4, labelFa: 'زبان‌ها و گواهینامه‌ها', icon: LanguageIcon, component: LanguagesStep },
]

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const importInputRef = useRef<HTMLInputElement>(null)
  const { resume, resetResume, importResume, settings, toggleDarkMode, setAccentColor } = useResumeStore()
  const dark = settings.darkMode
  const CurrentComponent = steps[currentStep].component

  const handleReset = () => {
    resetResume()
    setCurrentStep(0)
    setShowResetConfirm(false)
  }

  const handleExportJson = () => {
    const name = [resume.personal.firstName, resume.personal.lastName].filter(Boolean).join('_')
    const filename = `${name || 'resume'}_${new Date().toISOString().slice(0, 10)}.json`
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string)
        if (!data || typeof data !== 'object' || !data.personal || !data.template || !data.language) {
          alert('فایل JSON معتبر نیست — ساختار رزومه یافت نشد')
          return
        }
        importResume(data)
        setCurrentStep(0)
      } catch {
        alert('خطا در خواندن فایل — مطمئن شوید فایل JSON سالم است')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${dark ? 'bg-gray-950' : 'bg-gray-50'}`}>

      {/* ── Navbar ── */}
      <header className={`border-b sticky top-0 z-10 ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          <Link href="/" className={`flex items-center gap-1.5 text-sm flex-shrink-0 transition ${dark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'}`}>
            <ArrowRightIcon className="w-4 h-4" />
            <span className="hidden sm:inline">بازگشت</span>
          </Link>

          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5 text-blue-500" />
            <span className={`font-bold text-sm sm:text-base ${dark ? 'text-gray-100' : 'text-gray-800'}`}>
              <span className="text-blue-500">Apply</span>FA
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Color picker toggle */}
            <div className="relative">
              <button
                onClick={() => { setShowColorPicker((v) => !v); setShowResetConfirm(false) }}
                className={`p-2 rounded-xl transition cursor-pointer ${dark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                title="رنگ قالب"
              >
                <SwatchIcon className="w-4 h-4 text-blue-500" />
              </button>

              {showColorPicker && (
                <div className={`absolute top-10 left-0 z-50 rounded-2xl shadow-2xl border p-3 w-48 ${dark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
                  <p className={`text-xs font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>رنگ قالب</p>
                  <div className="grid grid-cols-4 gap-2">
                    {ACCENT_COLORS.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => { setAccentColor(c.value); setShowColorPicker(false) }}
                        className="w-8 h-8 rounded-full border-2 cursor-pointer transition hover:scale-110"
                        style={{
                          backgroundColor: c.value,
                          borderColor: settings.accentColor === c.value ? '#fff' : 'transparent',
                          boxShadow: settings.accentColor === c.value ? `0 0 0 2px ${c.value}` : 'none',
                        }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dark mode */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-xl transition cursor-pointer ${dark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {dark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            </button>

            {/* Preview */}
            <Link
              href="/preview"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-xl transition flex items-center gap-1.5 flex-shrink-0"
            >
              <EyeIcon className="w-4 h-4" />
              <span className="hidden sm:inline">پیش‌نمایش</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8"
        onClick={() => { setShowColorPicker(false) }}>

        {/* ── Sidebar ── */}
        <aside className="lg:w-56 flex-shrink-0">
          {/* Mobile tabs */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <button key={step.id} onClick={() => setCurrentStep(step.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                    currentStep === step.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : dark ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-white text-gray-600 border border-gray-200'
                  }`}>
                  <Icon className="w-3.5 h-3.5" />
                  {step.labelFa}
                </button>
              )
            })}
          </div>

          {/* Desktop sidebar */}
          <div className={`hidden lg:flex flex-col gap-3`}>
            <div className={`rounded-2xl shadow-sm border p-3 sticky top-20 ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
              <p className={`text-xs font-semibold px-2 mb-2 uppercase tracking-wider ${dark ? 'text-gray-400' : 'text-gray-400'}`}>مراحل</p>
              <nav className="space-y-1">
                {steps.map((step) => {
                  const Icon = step.icon
                  return (
                    <button key={step.id} onClick={() => setCurrentStep(step.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                        currentStep === step.id
                          ? 'bg-blue-600 text-white'
                          : dark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
                      }`}>
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{step.labelFa}</span>
                    </button>
                  )
                })}
              </nav>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <Link href="/preview"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2.5 rounded-xl transition">
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  دریافت PDF
                </Link>
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className={`w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-xl transition cursor-pointer border ${
                    dark ? 'border-red-700 text-red-400 hover:bg-red-900/30' : 'border-red-200 text-red-500 hover:bg-red-50'
                  }`}>
                  <TrashIcon className="w-4 h-4" />
                  پاک کردن فرم
                </button>

                {/* JSON export / import */}
                <div className={`pt-2 border-t ${dark ? 'border-gray-700' : 'border-gray-200'} space-y-2`}>
                  <p className={`text-xs font-semibold px-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>فایل JSON</p>
                  <button
                    onClick={handleExportJson}
                    className={`w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-xl transition cursor-pointer border ${
                      dark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}>
                    <CodeBracketIcon className="w-4 h-4" />
                    برون‌ریزی JSON
                  </button>
                  <button
                    onClick={() => importInputRef.current?.click()}
                    className={`w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-xl transition cursor-pointer border ${
                      dark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}>
                    <ArrowUpTrayIcon className="w-4 h-4" />
                    درون‌ریزی JSON
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 min-w-0">
          {/* Progress */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              {React.createElement(steps[currentStep].icon, {
                className: `w-5 h-5 flex-shrink-0 ${dark ? 'text-blue-400' : 'text-blue-600'}`
              })}
              <h2 className={`text-lg sm:text-xl font-bold ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
                {steps[currentStep].labelFa}
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              {steps.map((s) => (
                <div key={s.id}
                  className={`h-1.5 flex-1 rounded-full transition-all cursor-pointer`}
                  style={{ backgroundColor: s.id <= currentStep ? '#2563eb' : dark ? '#374151' : '#e5e7eb' }}
                  onClick={() => setCurrentStep(s.id)}
                />
              ))}
            </div>
            <p className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
              مرحله {currentStep + 1} از {steps.length}
            </p>
          </div>

          {/* Form card */}
          <div className={`rounded-2xl shadow-sm border p-4 sm:p-6 ${dark ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-100'}`}>
            <CurrentComponent />
          </div>

          {/* Mobile reset/PDF row */}
          <div className="lg:hidden flex gap-2 mt-4">
            <Link href="/preview"
              className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2.5 rounded-xl transition">
              <ArrowDownTrayIcon className="w-4 h-4" />
              PDF
            </Link>
            <button onClick={() => setShowResetConfirm(true)}
              className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-medium py-2.5 rounded-xl border transition cursor-pointer ${
                dark ? 'border-red-700 text-red-400' : 'border-red-200 text-red-500'
              }`}>
              <TrashIcon className="w-4 h-4" />
              پاک کردن
            </button>
          </div>
          {/* Mobile JSON row */}
          <div className="lg:hidden flex gap-2 mt-2">
            <button
              onClick={handleExportJson}
              className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-medium py-2.5 rounded-xl border transition cursor-pointer ${
                dark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}>
              <CodeBracketIcon className="w-4 h-4" />
              برون‌ریزی
            </button>
            <button
              onClick={() => importInputRef.current?.click()}
              className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-medium py-2.5 rounded-xl border transition cursor-pointer ${
                dark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}>
              <ArrowUpTrayIcon className="w-4 h-4" />
              درون‌ریزی
            </button>
          </div>

          {/* Nav buttons */}
          <div className="flex justify-between mt-4 sm:mt-5 gap-3">
            <button
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                dark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}>
              <ArrowRightIcon className="w-4 h-4" />
              <span className="hidden sm:inline">مرحله قبل</span>
              <span className="sm:hidden">قبل</span>
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep((s) => s + 1)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition cursor-pointer">
                <span className="hidden sm:inline">مرحله بعد</span>
                <span className="sm:hidden">بعد</span>
                <ArrowLeftIcon className="w-4 h-4" />
              </button>
            ) : (
              <Link href="/preview"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition">
                <span>مشاهده رزومه</span>
                <EyeIcon className="w-4 h-4" />
              </Link>
            )}
          </div>
        </main>
      </div>

      {/* Hidden JSON import input */}
      <input
        ref={importInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleImportJson}
      />

      {/* ── Reset confirm modal ── */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`rounded-2xl shadow-2xl p-6 max-w-sm w-full border ${dark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <TrashIcon className="w-7 h-7 text-red-500" />
              </div>
            </div>
            <h3 className={`text-center font-bold text-lg mb-2 ${dark ? 'text-gray-100' : 'text-gray-800'}`}>
              پاک کردن فرم
            </h3>
            <p className={`text-center text-sm mb-6 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              تمام اطلاعات وارد شده پاک می‌شود. آیا مطمئن هستید؟
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition cursor-pointer ${
                  dark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}>
                انصراف
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition cursor-pointer">
                بله، پاک کن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`text-center py-3 text-xs border-t ${dark ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
        رزومه‌ساز اختصاصی سایت <span className="font-semibold text-blue-500">اپلای فا</span>
        {' | '}ساخته شده با <span className="text-red-500">❤️</span> توسط{' '}
        <a href="https://github.com/Alirewa" target="_blank" rel="noopener noreferrer"
          className="font-medium hover:underline text-blue-500">@Alirewa</a>
      </footer>
    </div>
  )
}
