'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowDownTrayIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import { useResumeStore } from '@/lib/store'
import { exportBaseName } from '@/lib/resume'
import { exportToPdf, printResume } from '@/lib/pdf'
import { TEMPLATE_IDS } from '@/lib/types'
import ResumeDocument from '@/components/templates/ResumeDocument'
import { IconButton } from '@/components/ui/FormField'
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

/** 210 mm at 96 dpi. */
const A4_PX = 794
/** Below this the type becomes unreadable, so we scroll horizontally instead. */
const MIN_SCALE = 0.62

export default function PreviewPage() {
  const ui = useUi()
  const toast = useToast()
  const hydrated = useHydrated()

  const resume = useResumeStore((s) => s.resume)
  const setTemplate = useResumeStore((s) => s.setTemplate)
  const accent = useResumeStore((s) => s.settings.accentColor)
  const hideEmpty = useResumeStore((s) => s.settings.hideEmptySections)
  const toggleHideEmpty = useResumeStore((s) => s.toggleHideEmptySections)

  const [exporting, setExporting] = useState(false)
  const [previewScale, setPreviewScale] = useState(1)
  const [clipHeight, setClipHeight] = useState<number | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  const recompute = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    // Measure the scroll container rather than the window: the page has its own
    // padding, and using innerWidth left the sheet slightly clipped.
    const available = viewportRef.current?.clientWidth ?? window.innerWidth
    const raw = available / A4_PX
    const scale = raw >= 1 ? 1 : Math.max(MIN_SCALE, raw)
    setPreviewScale(scale)
    setClipHeight(scale < 1 ? Math.ceil(wrap.scrollHeight * scale) : null)
  }, [])

  useEffect(() => {
    recompute()
    window.addEventListener('resize', recompute)
    return () => window.removeEventListener('resize', recompute)
  }, [recompute])

  // The sheet's height changes with its content and with the template.
  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(recompute))
    return () => cancelAnimationFrame(raf)
  }, [resume, hideEmpty, hydrated, recompute])

  /** Primary export: vector text the employer's screening software can read. */
  const handleDownloadPdf = () => printResume(exportBaseName(resume))

  /** Secondary export: a picture of the resume, for browsers without print-to-PDF. */
  const handleExportImagePdf = async () => {
    setExporting(true)
    try {
      const result = await exportToPdf(`${exportBaseName(resume)}.pdf`)
      if (!result.ok) toast.error(ui.toast.pdfFailed)
    } finally {
      setExporting(false)
    }
  }

  const BackIcon = ui.dir === 'rtl' ? ArrowLongRightIcon : ArrowLongLeftIcon
  const visualWidth = previewScale < 1 ? Math.ceil(A4_PX * previewScale) : undefined

  return (
    <div id="preview-page-root" className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950">
      <SiteHeader
        start={
          <div className="flex items-center gap-3">
            <Link
              href="/builder"
              className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-2 py-1.5 text-xs text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <BackIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{ui.nav.edit}</span>
            </Link>
            <span className="hidden md:block">
              <Wordmark />
            </span>
          </div>
        }
        end={
          <div className="flex items-center gap-1.5">
            {/* Template switcher */}
            <div
              className="flex shrink-0 items-center gap-0.5 rounded-lg bg-gray-200/70 p-0.5 dark:bg-gray-800"
              role="group"
              aria-label={ui.nav.templates}
            >
              {TEMPLATE_IDS.map((t) => {
                const active = hydrated && resume.template === t
                return (
                  <button
                    key={t}
                    onClick={() => setTemplate(t)}
                    aria-pressed={active}
                    aria-label={ui.preview.templateN(t)}
                    title={ui.templates[t].name}
                    className={`h-7 w-8 cursor-pointer rounded-md text-xs font-bold transition ${
                      active
                        ? 'bg-white text-[var(--accent)] shadow dark:bg-gray-700'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    {t}
                  </button>
                )
              })}
            </div>

            <AppLanguageMenu />
            <AccentPicker />
            <ThemeToggle />

            {/* Image export is the fallback, so it gets the quieter treatment. */}
            <IconButton
              label={ui.preview.pdfImageTitle}
              onClick={handleExportImagePdf}
              disabled={exporting}
              className="hidden bg-gray-200/70 disabled:opacity-60 sm:inline-flex dark:bg-gray-800"
            >
              <PhotoIcon className="h-4 w-4" />
            </IconButton>

            <button
              onClick={handleDownloadPdf}
              title={ui.preview.pdfDownloadTitle}
              className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg bg-[var(--accent)] px-2.5 py-1.5 text-xs font-semibold text-white transition hover:brightness-110"
            >
              <ArrowDownTrayIcon className="h-3.5 w-3.5" />
              <span>{ui.preview.pdfDownload}</span>
            </button>
          </div>
        }
      />

      {/* Empty-section toggle: what you see here is exactly what gets exported. */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 pt-3 no-print">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <input
            type="checkbox"
            checked={hydrated ? hideEmpty : true}
            onChange={toggleHideEmpty}
            className="h-4 w-4 accent-[var(--accent)]"
          />
          <span>{ui.preview.hideEmpty}</span>
          <span className="hidden text-gray-400 sm:inline dark:text-gray-500">
            — {ui.preview.hideEmptyHint}
          </span>
        </label>
      </div>

      <main
        id="preview-page-main"
        ref={viewportRef}
        className="flex-1 overflow-x-auto py-5 sm:py-8"
        // The page may be RTL; forcing LTR here keeps the horizontal overflow
        // (and its scrollbar) on the expected side.
        style={{ direction: 'ltr' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: '100%',
            minWidth: 'fit-content',
            padding: '0 8px',
          }}
        >
          <div
            id="preview-clip-div"
            style={{
              overflow: 'hidden',
              width: visualWidth != null ? `${visualWidth}px` : '210mm',
              height: clipHeight != null ? `${clipHeight}px` : 'auto',
              boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
              borderRadius: '4px',
              flexShrink: 0,
              background: '#fff',
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
              {/* The document is built entirely from persisted data, so it is
                  rendered only once that data is available on the client. */}
              {hydrated ? (
                <ResumeDocument data={resume} accentColor={accent} hideEmpty={hideEmpty} />
              ) : (
                <div style={{ width: '210mm', minHeight: '297mm', background: '#fff' }} aria-hidden />
              )}
            </div>
          </div>
        </div>
      </main>

      <p className="py-2 text-center text-xs text-gray-400 no-print dark:text-gray-600">
        {ui.preview.pdfHint}
      </p>

      <SiteFooter />
    </div>
  )
}
