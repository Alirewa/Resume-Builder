'use client'

import React from 'react'
import { useResumeStore } from '@/lib/store'
import { translations } from '@/lib/translations'
import { Input } from '@/components/ui/FormField'
import { AcademicCapIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import type { Education } from '@/lib/types'

function generateId() {
  return Math.random().toString(36).slice(2)
}

function EducationCard({
  edu, t, onUpdate, onRemove,
}: {
  edu: Education
  t: typeof translations['fa']['form']
  onUpdate: (data: Partial<Education>) => void
  onRemove: () => void
}) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <AcademicCapIcon className="w-4 h-4 text-blue-500" />
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{edu.institution || t.newInstitution}</h3>
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
        <Input label={t.institution} placeholder="Azad University" value={edu.institution}
          onChange={(e) => onUpdate({ institution: e.target.value })} />
        <Input label={t.degree} placeholder="Bachelor" value={edu.degree}
          onChange={(e) => onUpdate({ degree: e.target.value })} />
      </div>

      <Input label={t.field} placeholder="Maschinenbauingenieurwesen" value={edu.field}
        onChange={(e) => onUpdate({ field: e.target.value })} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label={t.startDate} placeholder="09/2015" value={edu.startDate}
          onChange={(e) => onUpdate({ startDate: e.target.value })} />
        <Input label={t.endDate} placeholder="07/2018" value={edu.endDate}
          onChange={(e) => onUpdate({ endDate: e.target.value })} />
      </div>

      <Input label={t.notes} placeholder="..." value={edu.notes}
        onChange={(e) => onUpdate({ notes: e.target.value })} />
    </div>
  )
}

export default function EducationStep() {
  const { resume, addEducation, updateEducation, removeEducation } = useResumeStore()
  const t = translations[resume.language].form

  const handleAdd = () => {
    addEducation({ id: generateId(), institution: '', degree: '', field: '', startDate: '', endDate: '', notes: '' })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {resume.education.length === 0 ? t.noEducation : `${resume.education.length}`}
        </p>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition cursor-pointer"
        >
          <PlusIcon className="w-4 h-4" />
          <span className="hidden sm:inline">{t.addEducation}</span>
        </button>
      </div>

      {resume.education.map((edu) => (
        <EducationCard key={edu.id} edu={edu} t={t}
          onUpdate={(data) => updateEducation(edu.id, data)}
          onRemove={() => removeEducation(edu.id)} />
      ))}

      {resume.education.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
          <AcademicCapIcon className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 dark:text-gray-500 text-sm">{t.noEducation}</p>
        </div>
      )}
    </div>
  )
}
