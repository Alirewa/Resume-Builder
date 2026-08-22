'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { useResumeStore } from '@/lib/store'
import { translations, type Translations } from '@/lib/translations'
import { useUi } from '@/components/ui/useUi'
import { Button } from '@/components/ui/FormField'

/**
 * Form labels follow the *app* language, not the resume language: the person
 * filling the form reads the interface, while the document they are producing
 * may well be in another language.
 */
export function useFormStrings(): Translations['form'] {
  const appLanguage = useResumeStore((s) => s.settings.appLanguage)
  return translations[appLanguage].form
}

export function useSectionTitles(): Translations {
  const appLanguage = useResumeStore((s) => s.settings.appLanguage)
  return translations[appLanguage]
}

interface SectionHeaderProps {
  title: string
  icon: React.ReactNode
  count: number
  addLabel: string
  onAdd: () => void
}

/** Title, entry count and the add button — identical across all five steps. */
export function SectionHeader({ title, icon, count, addLabel, onAdd }: SectionHeaderProps) {
  const ui = useUi()
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h3 className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
        {icon}
        {title}
        {count > 0 && (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-normal text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            {ui.builder.itemCount(count)}
          </span>
        )}
      </h3>
      {/* The label stays visible on mobile — a bare "+" gave no clue what it adds. */}
      <Button onClick={onAdd} size="sm">
        <PlusIcon className="h-4 w-4" />
        {addLabel}
      </Button>
    </div>
  )
}

export function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-gray-200 py-10 text-center dark:border-gray-700">
      <div className="mx-auto mb-2 flex justify-center text-gray-300 dark:text-gray-600">{icon}</div>
      <p className="text-sm text-gray-400 dark:text-gray-500">{text}</p>
    </div>
  )
}

interface EntryCardProps {
  icon: React.ReactNode
  title: string
  onRemove: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  canMoveUp: boolean
  canMoveDown: boolean
  children: React.ReactNode
}

/** One repeatable entry, with reordering and delete controls. */
export function EntryCard({
  icon,
  title,
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  children,
}: EntryCardProps) {
  const ui = useUi()
  const t = useFormStrings()

  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-[var(--accent)]">{icon}</span>
          <h4 className="truncate text-sm font-semibold text-gray-800 dark:text-gray-100">{title}</h4>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            onClick={onMoveUp}
            disabled={!canMoveUp}
            aria-label={ui.builder.moveUp}
            title={ui.builder.moveUp}
            className="cursor-pointer rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <ChevronUpIcon className="h-4 w-4" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={!canMoveDown}
            aria-label={ui.builder.moveDown}
            title={ui.builder.moveDown}
            className="cursor-pointer rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <ChevronDownIcon className="h-4 w-4" />
          </button>
          <button
            onClick={onRemove}
            className="flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-xs text-red-500 transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"
          >
            <TrashIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.delete}</span>
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}

/** Split textarea content into list entries, dropping blank lines only. */
function toList(text: string): string[] {
  return text.split('\n').filter((line) => line.trim() !== '')
}

interface ListTextareaProps {
  label: string
  placeholder?: string
  rows?: number
  value: string[]
  onChange: (value: string[]) => void
}

/**
 * Textarea bound to a `string[]`.
 *
 * The text is held locally while editing and only re-derived from the store
 * when the array is replaced from elsewhere (import, sample, undo). Mirroring
 * the store on every keystroke would strip the blank line the moment the user
 * pressed Enter, making it impossible to start a new entry.
 */
export function ListTextarea({ label, placeholder, rows = 4, value, onChange }: ListTextareaProps) {
  const [text, setText] = useState(() => value.join('\n'))
  const lastEmitted = useRef<string[]>(value)

  useEffect(() => {
    if (value !== lastEmitted.current) {
      lastEmitted.current = value
      setText(value.join('\n'))
    }
  }, [value])

  const handleChange = (next: string) => {
    setText(next)
    const list = toList(next)
    lastEmitted.current = list
    onChange(list)
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full min-w-0 resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
      />
    </div>
  )
}
