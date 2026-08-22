'use client'

import React, { useEffect, useId, useRef } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  /** Rendered instead of the default panel chrome when true (used by the gallery). */
  bare?: boolean
  labelledBy?: string
  children: React.ReactNode
}

/**
 * Accessible dialog: closes on Escape and backdrop click, locks background
 * scrolling, moves focus in on open and returns it to the trigger on close.
 */
export default function Modal({ open, onClose, title, bare, labelledBy, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocusTo = useRef<HTMLElement | null>(null)
  const generatedId = useId()
  const titleId = labelledBy ?? `${generatedId}-title`

  useEffect(() => {
    if (!open) return

    restoreFocusTo.current = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return

      // Keep Tab inside the dialog.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    // Focus the panel itself so screen readers announce the dialog.
    panelRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      restoreFocusTo.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm no-print"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : labelledBy}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={
          bare
            ? 'relative my-auto outline-none'
            : 'relative w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl outline-none dark:border-gray-600 dark:bg-gray-800'
        }
      >
        {title && (
          <h2
            id={titleId}
            className="mb-2 text-center text-lg font-bold text-gray-800 dark:text-gray-100"
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  )
}
