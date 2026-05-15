'use client'

import React from 'react'
import { useResumeStore } from '@/lib/store'
import { translations } from '@/lib/translations'
import { Input } from '@/components/ui/FormField'
import { LanguageIcon, TrashIcon, PlusIcon, TrophyIcon } from '@heroicons/react/24/outline'

function generateId() {
  return Math.random().toString(36).slice(2)
}

export default function LanguagesStep() {
  const { resume, addLanguage, updateLanguage, removeLanguage, addCertificate, updateCertificate, removeCertificate } = useResumeStore()
  const t = translations[resume.language].form

  return (
    <div className="space-y-8">
      {/* Languages */}
      <div className="space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <LanguageIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            {translations[resume.language].languages}
          </h3>
          <button
            onClick={() => addLanguage({ id: generateId(), name: '', level: '' })}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition cursor-pointer"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline">{t.addLanguage}</span>
          </button>
        </div>

        {resume.languages.map((lang) => (
          <div key={lang.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <LanguageIcon className="w-4 h-4 text-blue-500" />
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{lang.name || t.newLanguage}</h4>
              </div>
              <button
                onClick={() => removeLanguage(lang.id)}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition cursor-pointer px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <TrashIcon className="w-3.5 h-3.5" />
                {t.delete}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input label={t.languageName} placeholder="Deutsch / فارسی" value={lang.name}
                onChange={(e) => updateLanguage(lang.id, { name: e.target.value })} />
              <Input label={t.languageLevel} placeholder="B2 / Muttersprache / مادری" value={lang.level}
                onChange={(e) => updateLanguage(lang.id, { level: e.target.value })} />
            </div>
          </div>
        ))}

        {resume.languages.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
            <LanguageIcon className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <p className="text-gray-400 dark:text-gray-500 text-sm">{t.noLanguages}</p>
          </div>
        )}
      </div>

      {/* Certificates */}
      <div className="space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <TrophyIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            {translations[resume.language].certificates}
          </h3>
          <button
            onClick={() => addCertificate({ id: generateId(), name: '', issuer: '', date: '' })}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition cursor-pointer"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline">{t.addCertificate}</span>
          </button>
        </div>

        {resume.certificates.map((cert) => (
          <div key={cert.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <TrophyIcon className="w-4 h-4 text-blue-500" />
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{cert.name || t.newCertificate}</h4>
              </div>
              <button
                onClick={() => removeCertificate(cert.id)}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition cursor-pointer px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <TrashIcon className="w-3.5 h-3.5" />
                {t.delete}
              </button>
            </div>
            <div className="space-y-3">
              <Input label={t.certName} placeholder="TELC Deutsch B2" value={cert.name}
                onChange={(e) => updateCertificate(cert.id, { name: e.target.value })} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label={t.certIssuer} placeholder="Akademie Istanbul" value={cert.issuer}
                  onChange={(e) => updateCertificate(cert.id, { issuer: e.target.value })} />
                <Input label={t.certDate} placeholder="10/2024" value={cert.date}
                  onChange={(e) => updateCertificate(cert.id, { date: e.target.value })} />
              </div>
            </div>
          </div>
        ))}

        {resume.certificates.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
            <TrophyIcon className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <p className="text-gray-400 dark:text-gray-500 text-sm">{t.noCertificates}</p>
          </div>
        )}
      </div>
    </div>
  )
}
