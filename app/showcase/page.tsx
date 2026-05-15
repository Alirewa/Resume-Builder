'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Template1 from '@/components/templates/Template1'
import Template2 from '@/components/templates/Template2'
import Template3 from '@/components/templates/Template3'
import { useResumeStore } from '@/lib/store'
import { sampleDataDe } from '@/lib/sampleData'
import type { ResumeData, TemplateId } from '@/lib/types'
import { ArrowRightIcon, ArrowLeftIcon, DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline'

const ACCENT = '#2563eb'

const TEMPLATES = [
  { id: 1 as TemplateId, name: 'قالب کلاسیک', nameEn: 'Classic', desc: 'ساختار ساده و تمیز، مناسب برای خوانایی ATS' },
  { id: 2 as TemplateId, name: 'قالب مدرن', nameEn: 'Modern', desc: 'دو ستونه با سایدبار — ظاهر حرفه‌ای' },
  { id: 3 as TemplateId, name: 'قالب خلاقانه', nameEn: 'Creative', desc: 'تایم‌لاین + تگ‌های رنگی — مدرن و متفاوت' },
]

export default function ShowcasePage() {
  const { settings } = useResumeStore()
  const dark = settings.darkMode
  const accent = settings.accentColor || ACCENT
  const [active, setActive] = useState<TemplateId | null>(null)

  const mockData: ResumeData = { ...sampleDataDe, template: active ?? 1 }

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${dark ? 'bg-gray-950 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>

      {/* Header */}
      <header className={`border-b sticky top-0 z-10 ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/" className={`flex items-center gap-1.5 text-sm transition ${dark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'}`}>
            <ArrowRightIcon className="w-4 h-4" />
            بازگشت
          </Link>
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-sm"><span className="text-blue-500">Apply</span>FA</span>
          </div>
          <Link href="/builder"
            className="flex items-center gap-1.5 text-sm font-semibold text-white px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition">
            ساخت رزومه
            <ArrowLeftIcon className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-3">پیش‌نمایش قالب‌های رزومه</h1>
          <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            روی هر قالب کلیک کنید تا بزرگ‌نمایی شود
          </p>
        </div>

        {/* 3 template grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEMPLATES.map((tmpl) => (
            <div key={tmpl.id} className="flex flex-col gap-3">
              {/* Label */}
              <div className="text-center">
                <h3 className="font-bold text-sm">{tmpl.name}</h3>
                <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{tmpl.desc}</p>
              </div>

              {/* Scaled preview card */}
              <div
                className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all hover:shadow-2xl hover:scale-[1.02] ${
                  dark ? 'border-gray-700 hover:border-blue-500' : 'border-gray-200 hover:border-blue-400'
                }`}
                onClick={() => setActive(tmpl.id)}
              >
                {/* Scale wrapper — A4 ~794px wide, scale 0.348 → ~276px */}
                <div style={{ height: '340px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: 'scale(0.348)',
                    transformOrigin: 'top left',
                    width: '210mm',
                    pointerEvents: 'none',
                  }}>
                    {tmpl.id === 1 && <Template1 data={{ ...mockData, template: 1 }} accentColor={accent} />}
                    {tmpl.id === 2 && <Template2 data={{ ...mockData, template: 2 }} accentColor={accent} />}
                    {tmpl.id === 3 && <Template3 data={{ ...mockData, template: 3 }} accentColor={accent} />}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                  <span className="bg-white text-gray-800 text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                    بزرگ‌نمایی
                  </span>
                </div>
              </div>

              {/* Use this template */}
              <Link href="/builder"
                className="w-full text-center text-sm font-medium text-white py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
                onClick={() => {
                  const store = useResumeStore.getState()
                  store.resetResume()
                  store.setTemplate(tmpl.id)
                }}
              >
                استفاده از این قالب ←
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* ── Fullscreen modal ── */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto py-8 px-4"
          onClick={() => setActive(null)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {/* Close btn */}
            <button
              onClick={() => setActive(null)}
              className="absolute -top-4 -right-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
            >
              <XMarkIcon className="w-5 h-5 text-gray-700" />
            </button>

            {/* Prev / Next */}
            <button
              onClick={() => setActive((v) => (((v ?? 1) - 2 + 3) % 3 + 1) as TemplateId)}
              className="absolute top-1/2 -translate-y-1/2 -right-12 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
            >
              <ArrowRightIcon className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => setActive((v) => (((v ?? 1)) % 3 + 1) as TemplateId)}
              className="absolute top-1/2 -translate-y-1/2 -left-12 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition cursor-pointer"
            >
              <ArrowLeftIcon className="w-4 h-4 text-gray-700" />
            </button>

            {/* Full template */}
            <div style={{ width: '210mm', maxWidth: '95vw', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', borderRadius: '4px', overflow: 'hidden' }}>
              {active === 1 && <Template1 data={{ ...mockData, template: 1 }} accentColor={accent} />}
              {active === 2 && <Template2 data={{ ...mockData, template: 2 }} accentColor={accent} />}
              {active === 3 && <Template3 data={{ ...mockData, template: 3 }} accentColor={accent} />}
            </div>

            {/* Action */}
            <div className="flex justify-center mt-5">
              <Link href="/builder"
                className="flex items-center gap-2 text-white font-bold px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg transition text-sm"
                onClick={() => {
                  const store = useResumeStore.getState()
                  store.resetResume()
                  if (active !== null) store.setTemplate(active)
                }}
              >
                انتخاب این قالب و شروع ساخت رزومه
                <ArrowLeftIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <footer className={`text-center py-3 text-xs border-t ${dark ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
        رزومه‌ساز اختصاصی سایت <span className="font-semibold text-blue-500">اپلای فا</span>
        {' | '}ساخته شده با <span className="text-red-500">❤️</span> توسط{' '}
        <a href="https://github.com/Alirewa" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">@Alirewa</a>
      </footer>
    </div>
  )
}
