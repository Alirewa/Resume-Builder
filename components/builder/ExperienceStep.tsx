'use client'

import React, { useState } from 'react'
import { useResumeStore } from '@/lib/store'
import { translations } from '@/lib/translations'
import { Input, Textarea } from '@/components/ui/FormField'
import { Button } from '@/components/ui/FormField'
import { BriefcaseIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import type { WorkExperience } from '@/lib/types'

function generateId() {
  return Math.random().toString(36).slice(2)
}

function ExperienceCard({
  exp,
  t,
  onUpdate,
  onRemove,
}: {
  exp: WorkExperience
  t: typeof translations['fa']['form']
  onUpdate: (data: Partial<WorkExperience>) => void
  onRemove: () => void
}) {
  const [bulletsText, setBulletsText] = useState(exp.bullets.join('\n'))

  const handleBulletsChange = (val: string) => {
    setBulletsText(val)
    onUpdate({ bullets: val.split('\n').filter((b) => b.trim()) })
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="w-4 h-4 text-blue-500" />
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
            {exp.company || t.newCompany}
          </h3>
        </div>
        <button
          onClick={onRemove}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition cursor-pointer px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30"
        >
          <TrashIcon className="w-3.5 h-3.5" />
          {t.delete}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label={t.company} placeholder="Radin Polymer Co." value={exp.company}
          onChange={(e) => onUpdate({ company: e.target.value })} />
        <Input label={t.role} placeholder="CNC-Techniker" value={exp.role}
          onChange={(e) => onUpdate({ role: e.target.value })} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label={t.startDate} placeholder="10/2018" value={exp.startDate}
          onChange={(e) => onUpdate({ startDate: e.target.value })} />
        <div>
          <Input label={t.endDate} placeholder="12/2023" value={exp.endDate}
            onChange={(e) => onUpdate({ endDate: e.target.value })} disabled={exp.current} />
          <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
            <input type="checkbox" checked={exp.current}
              onChange={(e) => onUpdate({ current: e.target.checked })}
              className="w-4 h-4 accent-blue-600" />
            <span className="text-xs text-gray-600 dark:text-gray-400">{t.currentJob}</span>
          </label>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">{t.bullets}</label>
        <textarea
          className="border border-gray-300 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={5}
          placeholder={t.bulletsHint}
          value={bulletsText}
          onChange={(e) => handleBulletsChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default function ExperienceStep() {
  const { resume, addExperience, updateExperience, removeExperience } = useResumeStore()
  const t = translations[resume.language].form

  const handleAdd = () => {
    addExperience({ id: generateId(), company: '', role: '', startDate: '', endDate: '', current: false, bullets: [] })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {resume.experience.length === 0 ? t.noExperience : `${resume.experience.length}`}
        </p>
        <Button onClick={handleAdd} className="text-xs sm:text-sm">
          <PlusIcon className="w-4 h-4" />
          <span className="hidden sm:inline">{t.addExperience}</span>
        </Button>
      </div>

      {resume.experience.map((exp) => (
        <ExperienceCard key={exp.id} exp={exp} t={t}
          onUpdate={(data) => updateExperience(exp.id, data)}
          onRemove={() => removeExperience(exp.id)} />
      ))}

      {resume.experience.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
          <BriefcaseIcon className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 dark:text-gray-500 text-sm">{t.noExperience}</p>
        </div>
      )}
    </div>
  )
}
