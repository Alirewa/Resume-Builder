'use client'

import React, { useState, useEffect } from 'react'
import { useResumeStore } from '@/lib/store'
import { translations } from '@/lib/translations'
import { Input } from '@/components/ui/FormField'
import { WrenchScrewdriverIcon, TrashIcon, PlusIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline'
import type { SkillGroup } from '@/lib/types'

function generateId() {
  return Math.random().toString(36).slice(2)
}

function SkillGroupCard({
  group, t, onUpdate, onRemove,
}: {
  group: SkillGroup
  t: typeof translations['fa']['form']
  onUpdate: (data: Partial<SkillGroup>) => void
  onRemove: () => void
}) {
  const [itemsText, setItemsText] = useState(group.items.join('\n'))

  const handleItemsChange = (val: string) => {
    setItemsText(val)
    onUpdate({ items: val.split('\n').filter((i) => i.trim()) })
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <WrenchScrewdriverIcon className="w-4 h-4 text-blue-500" />
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{group.category || t.newSkillGroup}</h3>
        </div>
        <button
          onClick={onRemove}
          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition cursor-pointer px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30"
        >
          <TrashIcon className="w-3.5 h-3.5" />
          {t.delete}
        </button>
      </div>
      <Input label={t.skillCategory} placeholder="CNC & Fertigung" value={group.category}
        onChange={(e) => onUpdate({ category: e.target.value })} />
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">{t.skillItems}</label>
        <textarea
          className="border border-gray-300 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
          placeholder={'CNC-Fräsen\nCNC-Drehen\nMaschinenrüstung'}
          value={itemsText}
          onChange={(e) => handleItemsChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default function SkillsStep() {
  const { resume, addSkillGroup, updateSkillGroup, removeSkillGroup, setAdditionalSkills, setInterests } = useResumeStore()
  const t = translations[resume.language].form

  const [additionalText, setAdditionalText] = useState(resume.additionalSkills.join('\n'))
  const [interestsText, setInterestsText] = useState(resume.interests.join('\n'))

  // Sync when resume data changes externally (e.g. sample load)
  useEffect(() => { setAdditionalText(resume.additionalSkills.join('\n')) }, [resume.additionalSkills])
  useEffect(() => { setInterestsText(resume.interests.join('\n')) }, [resume.interests])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <WrenchScrewdriverIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            {translations[resume.language].skills}
          </h3>
          <button
            onClick={() => addSkillGroup({ id: generateId(), category: '', items: [] })}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition cursor-pointer"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline">{t.addSkillGroup}</span>
          </button>
        </div>

        {resume.skills.map((group) => (
          <SkillGroupCard key={group.id} group={group} t={t}
            onUpdate={(data) => updateSkillGroup(group.id, data)}
            onRemove={() => removeSkillGroup(group.id)} />
        ))}

        {resume.skills.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
            <WrenchScrewdriverIcon className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <p className="text-gray-400 dark:text-gray-500 text-sm">{t.noSkills}</p>
          </div>
        )}
      </div>

      {/* Additional skills */}
      <div>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
          <SparklesIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          {t.additionalSkillsLabel}
        </label>
        <textarea
          className="border border-gray-300 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={5}
          placeholder={'Führerschein Klasse B\nTeamfähigkeit\nMS Office'}
          value={additionalText}
          onChange={(e) => {
            setAdditionalText(e.target.value)
            setAdditionalSkills(e.target.value.split('\n').filter((s) => s.trim()))
          }}
        />
      </div>

      {/* Interests */}
      <div>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
          <HeartIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          {t.interestsLabel}
        </label>
        <textarea
          className="border border-gray-300 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
          placeholder={'Fitness und Sport\nReisen\nFotografie'}
          value={interestsText}
          onChange={(e) => {
            setInterestsText(e.target.value)
            setInterests(e.target.value.split('\n').filter((s) => s.trim()))
          }}
        />
      </div>
    </div>
  )
}
