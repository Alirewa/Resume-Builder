'use client'

import React, { useEffect, useRef, useState } from 'react'

interface PopoverProps {
  /** The always-visible control. Receives the open state so it can look pressed. */
  trigger: (props: { open: boolean; toggle: () => void }) => React.ReactNode
  children: (props: { close: () => void }) => React.ReactNode
  align?: 'start' | 'end'
  className?: string
}

/**
 * Small dropdown with correct dismissal behaviour: clicking anywhere outside
 * closes it, Escape closes it and returns focus to the trigger, and clicks
 * *inside* the panel never close it accidentally.
 */
export default function Popover({ trigger, children, align = 'start', className = '' }: PopoverProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        containerRef.current?.querySelector('button')?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {trigger({ open, toggle: () => setOpen((v) => !v) })}
      {open && (
        <div
          className={`absolute top-11 z-50 rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl dark:border-gray-600 dark:bg-gray-800 ${
            align === 'end' ? 'end-0' : 'start-0'
          }`}
        >
          {children({ close: () => setOpen(false) })}
        </div>
      )}
    </div>
  )
}
