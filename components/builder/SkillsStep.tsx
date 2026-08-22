'use client'

import React from 'react'
import { HeartIcon, SparklesIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
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

export default function SkillsStep() {
  const skills = useResumeStore((s) => s.resume.skills)
  const additionalSkills = useResumeStore((s) => s.resume.additionalSkills)
  const interests = useResumeStore((s) => s.resume.interests)
  const addItem = useResumeStore((s) => s.addItem)
  const updateItem = useResumeStore((s) => s.updateItem)
  const removeItem = useResumeStore((s) => s.removeItem)
  const moveItem = useResumeStore((s) => s.moveItem)
  const setAdditionalSkills = useResumeStore((s) => s.setAdditionalSkills)
  const setInterests = useResumeStore((s) => s.setInterests)

  const t = useFormStrings()
  const titles = useSectionTitles()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SectionHeader
          title={titles.skills}
          icon={<WrenchScrewdriverIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          count={skills.length}
          addLabel={t.addSkillGroup}
          onAdd={() => addItem('skills', { id: newId(), category: '', items: [] })}
        />

        {skills.map((group, index) => (
          <EntryCard
            key={group.id}
            icon={<WrenchScrewdriverIcon className="h-4 w-4" />}
            title={group.category || t.newSkillGroup}
            onRemove={() => removeItem('skills', group.id)}
            onMoveUp={() => moveItem('skills', group.id, -1)}
            onMoveDown={() => moveItem('skills', group.id, 1)}
            canMoveUp={index > 0}
            canMoveDown={index < skills.length - 1}
          >
            <Input
              label={t.skillCategory}
              value={group.category}
              onChange={(e) => updateItem('skills', group.id, { category: e.target.value })}
            />
            <ListTextarea
              label={t.skillItems}
              value={group.items}
              onChange={(items) => updateItem('skills', group.id, { items })}
            />
          </EntryCard>
        ))}

        {skills.length === 0 && (
          <EmptyState icon={<WrenchScrewdriverIcon className="h-10 w-10" />} text={t.noSkills} />
        )}
      </div>

      <div className="space-y-1">
        <p className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          <SparklesIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          {titles.additionalSkills}
        </p>
        <ListTextarea
          label={t.additionalSkillsLabel}
          rows={5}
          value={additionalSkills}
          onChange={setAdditionalSkills}
        />
      </div>

      <div className="space-y-1">
        <p className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          <HeartIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          {titles.interests}
        </p>
        <ListTextarea label={t.interestsLabel} rows={4} value={interests} onChange={setInterests} />
      </div>
    </div>
  )
}
