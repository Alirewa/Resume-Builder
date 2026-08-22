'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { onStorageError } from '@/lib/store'
import { useUi } from './useUi'

type ToastTone = 'success' | 'error'

interface ToastAction {
  label: string
  onClick: () => void
}

interface ToastMessage {
  id: number
  text: string
  tone: ToastTone
  action?: ToastAction
}

interface ToastApi {
  show: (text: string, options?: { tone?: ToastTone; action?: ToastAction }) => void
  success: (text: string, action?: ToastAction) => void
  error: (text: string) => void
}

const ToastContext = createContext<ToastApi | null>(null)

const VISIBLE_MS = 5000

/**
 * Replaces `alert()` throughout the app: non-blocking, localized, and able to
 * carry an "undo" affordance for the destructive actions.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([])
  const nextId = useRef(1)
  const ui = useUi()

  const dismiss = useCallback((id: number) => {
    setMessages((list) => list.filter((m) => m.id !== id))
  }, [])

  const show = useCallback<ToastApi['show']>((text, options) => {
    const id = nextId.current++
    setMessages((list) => [
      ...list,
      { id, text, tone: options?.tone ?? 'success', action: options?.action },
    ])
    window.setTimeout(() => setMessages((list) => list.filter((m) => m.id !== id)), VISIBLE_MS)
  }, [])

  const api = useMemo<ToastApi>(
    () => ({
      show,
      success: (text, action) => show(text, { tone: 'success', action }),
      error: (text) => show(text, { tone: 'error' }),
    }),
    [show],
  )

  // A localStorage write can fail long after the action that caused it, so the
  // provider listens directly rather than every caller having to remember.
  useEffect(() => onStorageError(() => api.error(ui.toast.storageFull)), [api, ui])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        className="fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4 pointer-events-none no-print"
        role="status"
        aria-live="polite"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`toast-enter pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg ${
              m.tone === 'error'
                ? 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200'
                : 'border-gray-200 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100'
            }`}
          >
            {m.tone === 'error' ? (
              <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            ) : (
              <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
            )}
            <p className="flex-1 leading-relaxed">{m.text}</p>
            {m.action && (
              <button
                onClick={() => {
                  m.action?.onClick()
                  dismiss(m.id)
                }}
                className="shrink-0 cursor-pointer rounded-lg px-2 py-1 text-xs font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
              >
                {m.action.label}
              </button>
            )}
            <button
              onClick={() => dismiss(m.id)}
              aria-label={ui.common.dismiss}
              className="shrink-0 cursor-pointer rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
