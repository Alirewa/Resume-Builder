import React from 'react'
import type { ResumeData } from '@/lib/types'

export interface TemplateProps {
  data: ResumeData
  accentColor?: string
  /** Omit sections the user has not filled in (default: true). */
  hideEmpty?: boolean
}

/**
 * Inline SVG icons.
 *
 * Icon *fonts* and external sprites are invisible to html2canvas, so the
 * resume templates draw their own paths. `size` keeps the three templates
 * visually consistent at their slightly different type scales.
 */
export function icons(size: number) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    display: 'inline',
    verticalAlign: 'middle',
    flexShrink: 0,
  }
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    style,
  } as const

  return {
    calendar: (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    globe: (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    pin: (
      <svg {...common}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    phone: (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    mail: (
      <svg {...common}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    link: (
      <svg {...common}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  }
}

/** Placeholder shown for an unfilled section while `hideEmpty` is off. */
export function EmptySection({ text, isRTL }: { text: string; isRTL: boolean }) {
  return (
    <div
      style={{
        minHeight: '46px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isRTL ? 'flex-end' : 'flex-start',
        padding: '10px 14px',
        borderRadius: '6px',
        background: '#f9fafb',
        border: '1px dashed #e5e7eb',
        color: '#aaa',
        fontSize: '9.5px',
        fontStyle: 'italic',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      {text}
    </div>
  )
}

/** Avatar circle with a neutral fallback glyph. */
export function Avatar({
  src,
  alt,
  size,
  borderColor,
  background,
  glyphColor,
}: {
  src: string | null
  alt: string
  size: number
  borderColor: string
  background: string
  glyphColor: string
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        border: `3px solid ${borderColor}`,
        backgroundColor: background,
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- inline data: URL rendered into a canvas by html2canvas; next/image cannot participate
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: glyphColor,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ width: size * 0.575, height: size * 0.575 }}
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}
    </div>
  )
}

/** A date range, with an empty result when neither end is filled in. */
export function dateRange(start: string, end: string, current: boolean, currentLabel: string): string {
  const to = current ? currentLabel : end
  if (!start && !to) return ''
  if (!to) return start
  if (!start) return to
  return `${start} – ${to}`
}

/** Drop the falsy entries produced by `condition && {...}` contact lists. */
export function compact<T>(entries: (T | false | '' | null | undefined)[]): T[] {
  return entries.filter((entry): entry is T => Boolean(entry))
}
