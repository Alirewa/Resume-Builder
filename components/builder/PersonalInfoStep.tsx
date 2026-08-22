'use client'

import React, { useRef, useState } from 'react'
import { LanguageIcon, PhotoIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useResumeStore } from '@/lib/store'
import { fileToAvatar } from '@/lib/image'
import { RESUME_LANGUAGES, type ResumeLanguage } from '@/lib/types'
import { APP_LANGUAGE_OPTIONS } from '@/lib/ui'
import { Input, Textarea } from '@/components/ui/FormField'
import { useToast } from '@/components/ui/Toast'
import { useUi } from '@/components/ui/useUi'
import { useFormStrings } from './StepShell'

export default function PersonalInfoStep() {
  const personal = useResumeStore((s) => s.resume.personal)
  const resumeLanguage = useResumeStore((s) => s.resume.language)
  const setPersonal = useResumeStore((s) => s.setPersonal)
  const setAvatar = useResumeStore((s) => s.setAvatar)
  const setLanguage = useResumeStore((s) => s.setLanguage)

  const t = useFormStrings()
  const ui = useUi()
  const toast = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [processing, setProcessing] = useState(false)

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    // Reset immediately so picking the same file twice still fires a change.
    e.target.value = ''
    if (!file) return

    setProcessing(true)
    const result = await fileToAvatar(file)
    setProcessing(false)

    if (!result.ok) {
      const message =
        result.reason === 'not-an-image'
          ? ui.toast.avatarNotImage
          : result.reason === 'too-large'
            ? ui.toast.avatarTooLarge
            : ui.toast.avatarFailed
      toast.error(message)
      return
    }
    setAvatar(result.dataUrl)
  }

  const languageOptions = RESUME_LANGUAGES.map(
    (value) => APP_LANGUAGE_OPTIONS.find((o) => o.value === value)!,
  )

  return (
    <div className="space-y-6">
      {/* Resume language — the language of the *document*, not of the app. */}
      <fieldset className="rounded-xl border border-[var(--accent-ring)] bg-[var(--accent-soft)] p-4">
        <legend className="flex items-center gap-2 px-1 text-sm font-semibold text-gray-700 dark:text-gray-200">
          <LanguageIcon className="h-4 w-4" />
          {t.resumeLanguage}
        </legend>
        <div className="mt-2 flex gap-2 sm:gap-3">
          {languageOptions.map((lang) => {
            const selected = resumeLanguage === lang.value
            return (
              <button
                key={lang.value}
                onClick={() => setLanguage(lang.value as ResumeLanguage)}
                aria-pressed={selected}
                className={`flex-1 cursor-pointer rounded-lg border-2 px-1 py-2 text-center text-xs font-medium transition sm:px-3 sm:text-sm ${
                  selected
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-[var(--accent)] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                <span className="block" aria-hidden>
                  {lang.flag}
                </span>
                <span className="block leading-tight">{lang.label}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Avatar */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <PhotoIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t.profilePhoto}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            aria-label={t.choosePhoto}
            className="flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-gray-300 bg-gray-100 transition hover:border-[var(--accent)] dark:border-gray-600 dark:bg-gray-700"
          >
            {personal.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element -- inline data: URL, not an optimizable asset
              <img src={personal.avatar} alt="" className="h-full w-full object-cover" />
            ) : (
              <UserCircleIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            )}
          </button>
          <div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={processing}
              className="flex cursor-pointer items-center gap-1.5 text-sm text-[var(--accent)] transition hover:underline disabled:opacity-50"
            >
              <PhotoIcon className="h-4 w-4" />
              {t.choosePhoto}
            </button>
            {personal.avatar && (
              <button
                onClick={() => setAvatar(null)}
                className="mt-1.5 flex cursor-pointer items-center gap-1.5 text-sm text-red-500 transition hover:text-red-700"
              >
                <TrashIcon className="h-4 w-4" />
                {t.removePhoto}
              </button>
            )}
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{t.photoHint}</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label={t.firstName}
          placeholder={t.ph.firstName}
          autoComplete="given-name"
          value={personal.firstName}
          onChange={(e) => setPersonal({ firstName: e.target.value })}
        />
        <Input
          label={t.lastName}
          placeholder={t.ph.lastName}
          autoComplete="family-name"
          value={personal.lastName}
          onChange={(e) => setPersonal({ lastName: e.target.value })}
        />
      </div>

      <Input
        label={t.jobTitle}
        placeholder={t.ph.jobTitle}
        autoComplete="organization-title"
        value={personal.jobTitle}
        onChange={(e) => setPersonal({ jobTitle: e.target.value })}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label={t.birthDate}
          placeholder={t.ph.birthDate}
          value={personal.birthDate}
          onChange={(e) => setPersonal({ birthDate: e.target.value })}
        />
        <Input
          label={t.birthPlace}
          placeholder={t.ph.birthPlace}
          value={personal.birthPlace}
          onChange={(e) => setPersonal({ birthPlace: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label={t.nationality}
          placeholder={t.ph.nationality}
          value={personal.nationality}
          onChange={(e) => setPersonal({ nationality: e.target.value })}
        />
        <Input
          label={t.phone}
          type="tel"
          dir="ltr"
          placeholder={t.ph.phone}
          autoComplete="tel"
          value={personal.phone}
          onChange={(e) => setPersonal({ phone: e.target.value })}
        />
      </div>

      <Input
        label={t.address}
        placeholder={t.ph.address}
        autoComplete="street-address"
        value={personal.address}
        onChange={(e) => setPersonal({ address: e.target.value })}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label={t.email}
          type="email"
          dir="ltr"
          placeholder={t.ph.email}
          autoComplete="email"
          value={personal.email}
          onChange={(e) => setPersonal({ email: e.target.value })}
        />
        <Input
          label={t.website}
          dir="ltr"
          placeholder={t.ph.website}
          autoComplete="url"
          value={personal.website}
          onChange={(e) => setPersonal({ website: e.target.value })}
        />
      </div>

      <Textarea
        label={t.profileText}
        placeholder={t.ph.profileText}
        value={personal.profile}
        onChange={(e) => setPersonal({ profile: e.target.value })}
        rows={5}
      />
    </div>
  )
}
