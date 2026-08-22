'use client'

import React from 'react'
import { LanguageIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { useResumeStore } from '@/lib/store'
import { newId } from '@/lib/id'
import { Input } from '@/components/ui/FormField'
import { EmptyState, EntryCard, SectionHeader, useFormStrings, useSectionTitles } from './StepShell'

/** Common CEFR values offered as datalist suggestions. */
const LEVEL_SUGGESTIONS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export default function LanguagesStep() {
  const languages = useResumeStore((s) => s.resume.languages)
  const certificates = useResumeStore((s) => s.resume.certificates)
  const addItem = useResumeStore((s) => s.addItem)
  const updateItem = useResumeStore((s) => s.updateItem)
  const removeItem = useResumeStore((s) => s.removeItem)
  const moveItem = useResumeStore((s) => s.moveItem)

  const t = useFormStrings()
  const titles = useSectionTitles()

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <SectionHeader
          title={titles.languages}
          icon={<LanguageIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          count={languages.length}
          addLabel={t.addLanguage}
          onAdd={() => addItem('languages', { id: newId(), name: '', level: '' })}
        />

        <datalist id="cefr-levels">
          {LEVEL_SUGGESTIONS.map((level) => (
            <option key={level} value={level} />
          ))}
        </datalist>

        {languages.map((lang, index) => (
          <EntryCard
            key={lang.id}
            icon={<LanguageIcon className="h-4 w-4" />}
            title={lang.name || t.newLanguage}
            onRemove={() => removeItem('languages', lang.id)}
            onMoveUp={() => moveItem('languages', lang.id, -1)}
            onMoveDown={() => moveItem('languages', lang.id, 1)}
            canMoveUp={index > 0}
            canMoveDown={index < languages.length - 1}
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                label={t.languageName}
                value={lang.name}
                onChange={(e) => updateItem('languages', lang.id, { name: e.target.value })}
              />
              <Input
                label={t.languageLevel}
                list="cefr-levels"
                value={lang.level}
                onChange={(e) => updateItem('languages', lang.id, { level: e.target.value })}
              />
            </div>
          </EntryCard>
        ))}

        {languages.length === 0 && (
          <EmptyState icon={<LanguageIcon className="h-10 w-10" />} text={t.noLanguages} />
        )}
      </div>

      <div className="space-y-4">
        <SectionHeader
          title={titles.certificates}
          icon={<TrophyIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          count={certificates.length}
          addLabel={t.addCertificate}
          onAdd={() => addItem('certificates', { id: newId(), name: '', issuer: '', date: '' })}
        />

        {certificates.map((cert, index) => (
          <EntryCard
            key={cert.id}
            icon={<TrophyIcon className="h-4 w-4" />}
            title={cert.name || t.newCertificate}
            onRemove={() => removeItem('certificates', cert.id)}
            onMoveUp={() => moveItem('certificates', cert.id, -1)}
            onMoveDown={() => moveItem('certificates', cert.id, 1)}
            canMoveUp={index > 0}
            canMoveDown={index < certificates.length - 1}
          >
            <Input
              label={t.certName}
              value={cert.name}
              onChange={(e) => updateItem('certificates', cert.id, { name: e.target.value })}
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                label={t.certIssuer}
                value={cert.issuer}
                onChange={(e) => updateItem('certificates', cert.id, { issuer: e.target.value })}
              />
              <Input
                label={t.certDate}
                placeholder="10/2024"
                value={cert.date}
                onChange={(e) => updateItem('certificates', cert.id, { date: e.target.value })}
              />
            </div>
          </EntryCard>
        ))}

        {certificates.length === 0 && (
          <EmptyState icon={<TrophyIcon className="h-10 w-10" />} text={t.noCertificates} />
        )}
      </div>
    </div>
  )
}
