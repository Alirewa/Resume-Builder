'use client'

import React, { useId } from 'react'

/* One shared field skin. Every input in the app goes through here so focus
   rings, dark mode and spacing cannot drift between the five form steps. */
const fieldClass =
  'w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ' +
  'placeholder-gray-400 transition focus:border-transparent focus:outline-none ' +
  'focus:ring-2 focus:ring-[var(--accent-ring)] ' +
  'dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500'

const labelClass = 'text-sm font-medium text-gray-700 dark:text-gray-300'

function errorClass(error?: string) {
  return error ? ' border-red-400 dark:border-red-500' : ''
}

interface FieldWrapperProps {
  id: string
  label: string
  error?: string
  hint?: string
  children: React.ReactNode
}

function FieldWrapper({ id, label, error, hint, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export function Input({ label, error, hint, className = '', id, ...props }: InputProps) {
  const generated = useId()
  const inputId = id ?? generated
  return (
    <FieldWrapper id={inputId} label={label} error={error} hint={hint}>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`${fieldClass}${errorClass(error)} ${className}`}
        {...props}
      />
    </FieldWrapper>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
}

export function Textarea({ label, error, hint, className = '', id, rows = 3, ...props }: TextareaProps) {
  const generated = useId()
  const inputId = id ?? generated
  return (
    <FieldWrapper id={inputId} label={label} error={error} hint={hint}>
      <textarea
        id={inputId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`${fieldClass} resize-y${errorClass(error)} ${className}`}
        {...props}
      />
    </FieldWrapper>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: { value: string; label: string }[]
  error?: string
}

export function Select({ label, options, error, className = '', id, ...props }: SelectProps) {
  const generated = useId()
  const inputId = id ?? generated
  return (
    <FieldWrapper id={inputId} label={label} error={error}>
      <select id={inputId} className={`${fieldClass}${errorClass(error)} ${className}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
}

/* ── Buttons ─────────────────────────────────────────────────────────────── */

type ButtonVariant = 'accent' | 'primary' | 'secondary' | 'danger' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantClass: Record<ButtonVariant, string> = {
  // Follows the user's chosen accent colour.
  accent: 'bg-[var(--accent)] text-white hover:brightness-110',
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary:
    'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 ' +
    'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
  danger:
    'border border-red-200 text-red-600 hover:bg-red-50 ' +
    'dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40',
  ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

const buttonBase =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-medium ' +
  'transition disabled:cursor-not-allowed disabled:opacity-50'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

export function Button({
  variant = 'accent',
  size = 'md',
  fullWidth,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${buttonBase} ${variantClass[variant]} ${sizeClass[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: these buttons have no visible text. */
  label: string
}

export function IconButton({ label, className = '', children, type = 'button', ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={`inline-flex cursor-pointer items-center justify-center rounded-xl p-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
