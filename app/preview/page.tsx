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
// Minimum scale so the resume is readable on small screens (even if wider than viewport)
const MIN_SCALE = 0.62

export default function PreviewPage() {
  const { resume, setTemplate, settings, toggleDarkMode, setAccentColor } = useResumeStore()
  const [exporting, setExporting] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const dark = settings.darkMode
  const accent = settings.accentColor

  /* ── Responsive scale ── */
  const [previewScale, setPreviewScale] = useState(1)
  const [clipHeight, setClipHeight] = useState<number | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const recompute = useCallback(() => {
    if (!wrapRef.current) return
    // Use full viewport width — the preview area has overflow-x:auto so it can scroll
    const avail = window.innerWidth
    const raw = avail / A4_PX
    // At desktop widths (≥A4), show at 1:1. On smaller screens use min MIN_SCALE for readability.
    const s = raw >= 1 ? 1 : Math.max(MIN_SCALE, raw)
    const natH = wrapRef.current.scrollHeight
    setPreviewScale(s)
    setClipHeight(s < 1 ? Math.ceil(natH * s) : null)
  }, [])

  useEffect(() => {
    recompute()
    window.addEventListener('resize', recompute)
    return () => window.removeEventListener('resize', recompute)
  }, [recompute])

  // Re-measure when resume content/template changes
  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(recompute))
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

  // Visual width of the scaled template (used to size the clip div correctly)
  const visualW = previewScale < 1 ? Math.ceil(A4_PX * previewScale) : undefined

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${dark ? 'bg-gray-950' : 'bg-gray-100'}`}>

      {/* ── Top bar ── */}
      <header className={`border-b sticky top-0 z-10 no-print ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-2 flex items-center gap-1 sm:gap-2">

          {/* Back */}
          <Link href="/builder"
            className={`p-1.5 sm:px-3 sm:py-1.5 rounded-lg border transition flex-shrink-0 flex items-center gap-1 ${
              dark ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}>
            <ArrowRightIcon className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">ویرایش</span>
          </Link>

          {/* Logo – md+ only */}
          <div className="hidden md:flex items-center gap-1.5 flex-shrink-0 mx-1">
            <DocumentTextIcon className="w-4 h-4 text-blue-500" />
            <span className={`font-bold text-sm ${dark ? 'text-gray-200' : 'text-gray-800'}`}>
              رزومه‌ساز <span className="text-blue-500">اختصاصی</span>
            </span>
          </div>

          <div className="flex-1" />

          {/* Template switcher */}
          <div className={`flex items-center gap-0.5 p-0.5 rounded-lg flex-shrink-0 ${dark ? 'bg-gray-800' : 'bg-gray-200/70'}`}>
            {([1, 2, 3] as const).map((t) => (
              <button key={t} onClick={() => setTemplate(t)}
                className={`w-8 h-7 rounded-md text-xs font-bold transition cursor-pointer ${
                  resume.template === t
                    ? `${dark ? 'bg-gray-700' : 'bg-white'} shadow text-blue-600 dark:text-blue-400`
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
              className={`p-1.5 rounded-lg transition cursor-pointer ${dark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200/70 hover:bg-gray-200'}`}
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
            className={`p-1.5 rounded-lg transition cursor-pointer flex-shrink-0 ${dark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-200/70 text-gray-600 hover:bg-gray-200'}`}>
            {dark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>

          {/* Print – hidden on xs */}
          <button onClick={printResume}
            className={`hidden sm:flex p-1.5 rounded-lg transition cursor-pointer flex-shrink-0 items-center justify-center ${dark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200/70 text-gray-600 hover:bg-gray-200'}`}
            title="چاپ / ذخیره PDF">
            <PrinterIcon className="w-4 h-4" />
          </button>

          {/* PDF download */}
          <button onClick={handleExportPdf} disabled={exporting}
            className="flex items-center gap-1 text-white font-semibold px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed flex-shrink-0 text-xs">
            {exporting
              ? <span className="animate-spin">⏳</span>
              : <><ArrowDownTrayIcon className="w-3.5 h-3.5" /><span className="hidden xs:inline sm:inline">PDF</span></>
            }
          </button>
        </div>
      </header>

      {/* ── Resume preview ──
        overflow-x: auto lets the preview scroll horizontally when scale > viewport width.
        The clip div is exactly as wide/tall as the scaled template — no dead space.
      */}
      <main
        id="preview-page-main"
        className="flex-1 py-5 sm:py-8 overflow-x-auto"
        style={{ direction: 'ltr' }}
        onClick={() => setShowColorPicker(false)}
      >
        {/*
          direction:ltr on main prevents RTL overflow going left (page has dir=rtl).
          minWidth:fit-content prevents flex-center cutting off left side when content
          is wider than viewport — makes the wrapper expand so the scrollbar covers all.
        */}
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100%', minWidth: 'fit-content', padding: '0 8px' }}>
          <div
            id="preview-clip-div"
            style={{
              overflow: 'hidden',
              // Width = visual width of scaled template so the full resume is visible
              width: visualW != null ? `${visualW}px` : '210mm',
              height: clipHeight != null ? `${clipHeight}px` : 'auto',
              boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
              borderRadius: '4px',
              flexShrink: 0,
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

      <div className={`text-center py-2 text-xs no-print ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
        بهترین خروجی: دکمه 🖨️ چاپ → «Save as PDF» در مرورگر
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
