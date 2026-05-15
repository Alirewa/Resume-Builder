'use client'

import React, { useRef } from 'react'
import { useResumeStore } from '@/lib/store'
import { translations } from '@/lib/translations'
import { Input, Textarea } from '@/components/ui/FormField'
import type { ResumeLanguage } from '@/lib/types'
import {
  UserCircleIcon,
  LanguageIcon,
  TrashIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'

const LANG_OPTIONS: { value: ResumeLanguage; label: string; flag: string }[] = [
  { value: 'fa', label: 'فارسی', flag: '🇮🇷' },
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
]

export default function PersonalInfoStep() {
  const { resume, setPersonal, setAvatar, setLanguage } = useResumeStore()
  const { personal, language } = resume
  const t = translations[language].form
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setAvatar(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      {/* Language selector */}
      <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <LanguageIcon className="w-4 h-4 text-blue-700 dark:text-blue-400" />
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">{t.resumeLanguage}</p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          {LANG_OPTIONS.map((lang) => (
            <button
              key={lang.value}
              onClick={() => setLanguage(lang.value)}
              className={`flex-1 py-2 px-1 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition border-2 cursor-pointer text-center ${
                language === lang.value
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:border-blue-500'
              }`}
            >
              <span className="block">{lang.flag}</span>
              <span className="block leading-tight">{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Avatar */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <PhotoIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t.profilePhoto}</p>
        </div>
        <div className="flex items-center gap-4">
          <div
            className="w-20 h-20 rounded-full border-2 border-gray-300 dark:border-gray-600 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center cursor-pointer hover:border-blue-400 transition flex-shrink-0"
            onClick={() => fileInputRef.current?.click()}
          >
            {personal.avatar ? (
              <img src={personal.avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <UserCircleIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            )}
          </div>
          <div>
            <button
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 transition cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <PhotoIcon className="w-4 h-4" />
              {t.choosePhoto}
            </button>
            {personal.avatar && (
              <button
                className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 mt-1.5 transition cursor-pointer"
                onClick={() => setAvatar(null)}
              >
                <TrashIcon className="w-4 h-4" />
                {t.removePhoto}
              </button>
            )}
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t.photoHint}</p>
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

      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t.firstName}
          placeholder={t.ph.firstName}
          value={personal.firstName}
          onChange={(e) => setPersonal({ firstName: e.target.value })}
        />
        <Input
          label={t.lastName}
          placeholder={t.ph.lastName}
          value={personal.lastName}
          onChange={(e) => setPersonal({ lastName: e.target.value })}
        />
      </div>

      <Input
        label={t.jobTitle}
        placeholder={t.ph.jobTitle}
        value={personal.jobTitle}
        onChange={(e) => setPersonal({ jobTitle: e.target.value })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t.nationality}
          placeholder={t.ph.nationality}
          value={personal.nationality}
          onChange={(e) => setPersonal({ nationality: e.target.value })}
        />
        <Input
          label={t.phone}
          placeholder={t.ph.phone}
          value={personal.phone}
          onChange={(e) => setPersonal({ phone: e.target.value })}
        />
      </div>

      <Input
        label={t.address}
        placeholder={t.ph.address}
        value={personal.address}
        onChange={(e) => setPersonal({ address: e.target.value })}
      />

      <Input
        label={t.email}
        type="email"
        placeholder={t.ph.email}
        value={personal.email}
        onChange={(e) => setPersonal({ email: e.target.value })}
      />

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
