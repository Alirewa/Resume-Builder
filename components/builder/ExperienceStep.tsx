'use client'

import React from 'react'
import { BriefcaseIcon } from '@heroicons/react/24/outline'
import { useResumeStore } from '@/lib/store'
import { newId } from '@/lib/id'
import { Input } from '@/components/ui/FormField'
import {
  EmptyState,
  EntryCard,
  ListTextarea,
  SectionHeader,
  useFormStrings,
  useSectionTitles,
} from './StepShell'

export default function ExperienceStep() {
  const experience = useResumeStore((s) => s.resume.experience)
  const addItem = useResumeStore((s) => s.addItem)
  const updateItem = useResumeStore((s) => s.updateItem)
  const removeItem = useResumeStore((s) => s.removeItem)
  const moveItem = useResumeStore((s) => s.moveItem)

  const t = useFormStrings()
  const titles = useSectionTitles()

  const handleAdd = () =>
    addItem('experience', {
      id: newId(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [],
    })

  return (
    <div className="space-y-4">
      <SectionHeader
        title={titles.experience}
        icon={<BriefcaseIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
        count={experience.length}
        addLabel={t.addExperience}
        onAdd={handleAdd}
      />

      {experience.map((exp, index) => (
        <EntryCard
          key={exp.id}
          icon={<BriefcaseIcon className="h-4 w-4" />}
          title={exp.company || t.newCompany}
          onRemove={() => removeItem('experience', exp.id)}
          onMoveUp={() => moveItem('experience', exp.id, -1)}
          onMoveDown={() => moveItem('experience', exp.id, 1)}
          canMoveUp={index > 0}
          canMoveDown={index < experience.length - 1}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              label={t.company}
              value={exp.company}
              onChange={(e) => updateItem('experience', exp.id, { company: e.target.value })}
            />
            <Input
              label={t.role}
              value={exp.role}
              onChange={(e) => updateItem('experience', exp.id, { role: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              label={t.startDate}
              placeholder="10/2018"
              value={exp.startDate}
              onChange={(e) => updateItem('experience', exp.id, { startDate: e.target.value })}
            />
            <div>
              <Input
                label={t.endDate}
                placeholder="12/2023"
                value={exp.current ? '' : exp.endDate}
                disabled={exp.current}
                onChange={(e) => updateItem('experience', exp.id, { endDate: e.target.value })}
              />
              <label className="mt-2 flex cursor-pointer select-none items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateItem('experience', exp.id, { current: e.target.checked })}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                <span className="text-xs text-gray-600 dark:text-gray-400">{t.currentJob}</span>
              </label>
            </div>
          </div>

          <ListTextarea
            label={t.bullets}
            placeholder={t.bulletsHint}
            rows={5}
            value={exp.bullets}
            onChange={(bullets) => updateItem('experience', exp.id, { bullets })}
          />
        </EntryCard>
      ))}

      {experience.length === 0 && (
        <EmptyState icon={<BriefcaseIcon className="h-10 w-10" />} text={t.noExperience} />
      )}
    </div>
  )
}
