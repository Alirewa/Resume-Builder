'use client'

import React from 'react'
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import { useResumeStore } from '@/lib/store'
import { newId } from '@/lib/id'
import { Input } from '@/components/ui/FormField'
import { EmptyState, EntryCard, SectionHeader, useFormStrings, useSectionTitles } from './StepShell'

export default function EducationStep() {
  const education = useResumeStore((s) => s.resume.education)
  const addItem = useResumeStore((s) => s.addItem)
  const updateItem = useResumeStore((s) => s.updateItem)
  const removeItem = useResumeStore((s) => s.removeItem)
  const moveItem = useResumeStore((s) => s.moveItem)

  const t = useFormStrings()
  const titles = useSectionTitles()

  const handleAdd = () =>
    addItem('education', {
      id: newId(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      notes: '',
    })

  return (
    <div className="space-y-4">
      <SectionHeader
        title={titles.education}
        icon={<AcademicCapIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
        count={education.length}
        addLabel={t.addEducation}
        onAdd={handleAdd}
      />

      {education.map((edu, index) => (
        <EntryCard
          key={edu.id}
          icon={<AcademicCapIcon className="h-4 w-4" />}
          title={edu.institution || t.newInstitution}
          onRemove={() => removeItem('education', edu.id)}
          onMoveUp={() => moveItem('education', edu.id, -1)}
          onMoveDown={() => moveItem('education', edu.id, 1)}
          canMoveUp={index > 0}
          canMoveDown={index < education.length - 1}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              label={t.institution}
              value={edu.institution}
              onChange={(e) => updateItem('education', edu.id, { institution: e.target.value })}
            />
            <Input
              label={t.degree}
              value={edu.degree}
              onChange={(e) => updateItem('education', edu.id, { degree: e.target.value })}
            />
          </div>

          <Input
            label={t.field}
            value={edu.field}
            onChange={(e) => updateItem('education', edu.id, { field: e.target.value })}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              label={t.startDate}
              placeholder="09/2015"
              value={edu.startDate}
              onChange={(e) => updateItem('education', edu.id, { startDate: e.target.value })}
            />
            <Input
              label={t.endDate}
              placeholder="07/2018"
              value={edu.endDate}
              onChange={(e) => updateItem('education', edu.id, { endDate: e.target.value })}
            />
          </div>

          <Input
            label={t.notes}
            value={edu.notes}
            onChange={(e) => updateItem('education', edu.id, { notes: e.target.value })}
          />
        </EntryCard>
      ))}

      {education.length === 0 && (
        <EmptyState icon={<AcademicCapIcon className="h-10 w-10" />} text={t.noEducation} />
      )}
    </div>
  )
}
