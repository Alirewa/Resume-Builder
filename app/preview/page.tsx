'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useResumeStore, ACCENT_COLORS } from '@/lib/store'
import Template1 from '@/components/templates/Template1'
import Template2 from '@/components/templates/Template2'
import Template3 from '@/components/templates/Template3'
import { exportToPdf, printResume } from '@/lib/pdf'
import {
  ArrowRightIcon, ArrowDownTrayIcon, SwatchIcon,
  SunIcon, MoonIcon, DocumentTextIcon, PrinterIcon,
} from '@heroicons/react/24/outline'

const A4_PX = 794 // 210mm at 96 dpi

export default function PreviewPage() {
  const { resume, setTemplate, settings, toggleDarkMode, setAccentColor } = useResumeStore()
  const [exporting, setExporting] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const dark = settings.darkMode
  const accent = settings.accentColor

  /* ── Mobile scale ── */
  const [previewScale, setPreviewScale] = useState(1)
  const [clipHeight, setClipHeight] = useState<number | null>(null)
  const sizerRef = useRef<HTMLDivElement>(null)   // outer sizer — sets available width
  const wrapRef  = useRef<HTMLDivElement>(null)   // #preview-template-wrapper — has transform

  const recompute = useCallback(() => {
    if (!sizerRef.current || !wrapRef.current) return
    const avail = sizerRef.current.clientWidth
    const s = Math.min(1, avail / A4_PX)
    const natH = wrapRef.current.offsetHeight // unaffected by CSS transform
    setPreviewScale(s)
    setClipHeight(s < 1 ? Math.ceil(natH * s) : null)
  }, [])

  // On window resize
  useEffect(() => {
    recompute()
    window.addEventListener('resize', recompute)
    return () => window.removeEventListener('resize', recompute)
  }, [recompute])

  // Re-measure when resume content changes (template/language switch, data entry)
  useEffect(() => {
    const raf = requestAnimationFrame(recompute)
    return () => cancelAnimationFrame(raf)
  }, [resume, recompute])

  /* ── PDF export ── */
  const handleExportPdf = async () => {
    setExporting(true)
    try {
      const name = [resume.personal.firstName, resume.personal.lastName].filter(Boolean).join('_')
      await exportToPdf('resume-template', `${name || 'resume'}.pdf`)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${dark ? 'bg-gray-950' : 'bg-gray-100'}`}>

      {/* ── Top bar ── */}
      <header className={`border-b sticky top-0 z-10 no-print ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
        <div className="max-w-6xl mx-auto px-3 py-2 flex items-center gap-1.5">

          {/* Back */}
          <Link href="/builder"
            className={`flex items-center gap-1 text-sm border px-2 py-1.5 rounded-lg transition flex-shrink-0 ${
              dark ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}>
            <ArrowRightIcon className="w-4 h-4" />
            <span className="hidden md:inline text-xs">ویرایش</span>
          </Link>

          {/* Logo – only on md+ */}
          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            <DocumentTextIcon className="w-4 h-4 text-blue-500" />
            <span className={`font-bold text-sm ${dark ? 'text-gray-200' : 'text-gray-800'}`}>
              رزومه‌ساز <span className="text-blue-500">اختصاصی</span>
            </span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Template switcher */}
          <div className={`flex items-center gap-0.5 p-0.5 rounded-xl flex-shrink-0 ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            {([1, 2, 3] as const).map((t) => (
              <button key={t} onClick={() => setTemplate(t)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  resume.template === t
                    ? 'bg-white dark:bg-gray-700 shadow text-blue-700 dark:text-blue-400'
                    : dark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                }`}>
                {t === 1 ? '۱' : t === 2 ? '۲' : '۳'}
              </button>
            ))}
          </div>

          {/* Color picker */}
          <div className="relative flex-shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); setShowColorPicker((v) => !v) }}
              className={`p-1.5 rounded-xl transition cursor-pointer ${dark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="رنگ قالب"
            >
              <SwatchIcon className="w-4 h-4 text-blue-500" />
            </button>
            {showColorPicker && (
              <div
                className={`absolute top-10 left-0 z-50 rounded-2xl shadow-2xl border p-3 w-44 ${dark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <p className={`text-xs font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>رنگ قالب</p>
                <div className="grid grid-cols-4 gap-2">
                  {ACCENT_COLORS.map((c) => (
                    <button key={c.value} onClick={() => { setAccentColor(c.value); setShowColorPicker(false) }}
                      className="w-7 h-7 rounded-full border-2 cursor-pointer transition hover:scale-110"
                      style={{
                        backgroundColor: c.value,
                        borderColor: accent === c.value ? '#fff' : 'transparent',
                        boxShadow: accent === c.value ? `0 0 0 2px ${c.value}` : 'none',
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dark mode */}
          <button onClick={toggleDarkMode}
            className={`p-1.5 rounded-xl transition cursor-pointer flex-shrink-0 ${dark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {dark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>

          {/* Print – hidden on xs */}
          <button onClick={printResume}
            className={`hidden sm:flex p-1.5 rounded-xl transition cursor-pointer flex-shrink-0 items-center justify-center ${dark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            title="چاپ / ذخیره PDF">
            <PrinterIcon className="w-4 h-4" />
          </button>

          {/* PDF download */}
          <button onClick={handleExportPdf} disabled={exporting}
            className="flex items-center gap-1 text-white font-semibold px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 transition disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed flex-shrink-0 text-xs">
            {exporting
              ? <span className="animate-spin">⏳</span>
              : <><ArrowDownTrayIcon className="w-4 h-4" /><span>PDF</span></>
            }
          </button>
        </div>
      </header>

      {/* ── Resume preview ── */}
      <main
        id="preview-page-main"
        className="flex-1 py-6 sm:py-8 px-4 flex justify-center"
        onClick={() => setShowColorPicker(false)}
      >
        {/*
          sizerRef: full available width container — used to compute scale
          clipHeight: when scaled, clip the extra layout space left by CSS transform
        */}
        <div
          ref={sizerRef}
          style={{
            width: '210mm',
            maxWidth: '100%',
          }}
        >
          <div
            style={{
              overflow: 'hidden',
              height: clipHeight != null ? `${clipHeight}px` : 'auto',
              boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
              borderRadius: '4px',
            }}
          >
            <div
              ref={wrapRef}
              id="preview-template-wrapper"
              style={{
                width: '210mm',
                transformOrigin: 'top left',
                transform: previewScale < 1 ? `scale(${previewScale})` : undefined,
              }}
            >
              {resume.template === 1 && <Template1 data={resume} accentColor={accent} />}
              {resume.template === 2 && <Template2 data={resume} accentColor={accent} />}
              {resume.template === 3 && <Template3 data={resume} accentColor={accent} />}
            </div>
          </div>
        </div>
      </main>

      <div className={`text-center py-3 text-xs no-print ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
        برای بهترین خروجی: دکمه 🖨️ را بزنید و در مرورگر «Save as PDF» را انتخاب کنید
      </div>

      {/* Footer */}
      <footer className={`text-center py-3 text-xs border-t no-print ${dark ? 'border-gray-800 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
        طراحی و توسعه با <span className="text-red-500">❤️</span> توسط{' '}
        <a href="https://github.com/Alirewa" target="_blank" rel="noopener noreferrer"
          className="font-medium hover:underline text-blue-500">@Alirewa</a>
      </footer>
    </div>
  )
}
