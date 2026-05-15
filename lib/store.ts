'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  ResumeData, WorkExperience, Education, SkillGroup,
  Language, Certificate, TemplateId, ResumeLanguage,
} from './types'
import { defaultResumeData } from './types'

interface AppSettings {
  darkMode: boolean
  accentColor: string
}

interface ResumeStore {
  resume: ResumeData
  settings: AppSettings
  // Settings actions
  toggleDarkMode: () => void
  setAccentColor: (color: string) => void
  // Resume actions
  setTemplate: (t: TemplateId) => void
  setLanguage: (l: ResumeLanguage) => void
  setPersonal: (data: Partial<ResumeData['personal']>) => void
  setAvatar: (url: string | null) => void
  addExperience: (exp: WorkExperience) => void
  updateExperience: (id: string, exp: Partial<WorkExperience>) => void
  removeExperience: (id: string) => void
  addEducation: (edu: Education) => void
  updateEducation: (id: string, edu: Partial<Education>) => void
  removeEducation: (id: string) => void
  addSkillGroup: (group: SkillGroup) => void
  updateSkillGroup: (id: string, group: Partial<SkillGroup>) => void
  removeSkillGroup: (id: string) => void
  addLanguage: (lang: Language) => void
  updateLanguage: (id: string, lang: Partial<Language>) => void
  removeLanguage: (id: string) => void
  addCertificate: (cert: Certificate) => void
  updateCertificate: (id: string, cert: Partial<Certificate>) => void
  removeCertificate: (id: string) => void
  setAdditionalSkills: (skills: string[]) => void
  setInterests: (interests: string[]) => void
  resetResume: () => void
  importResume: (data: ResumeData) => void
}

const defaultSettings: AppSettings = {
  darkMode: false,
  accentColor: '#2563eb',
}

export const ACCENT_COLORS = [
  { name: 'آبی', value: '#2563eb' },
  { name: 'بنفش', value: '#7c3aed' },
  { name: 'سبز', value: '#059669' },
  { name: 'قرمز', value: '#dc2626' },
  { name: 'نارنجی', value: '#ea580c' },
  { name: 'صورتی', value: '#db2777' },
  { name: 'فیروزه', value: '#0891b2' },
  { name: 'مشکی', value: '#1e293b' },
]

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: defaultResumeData,
      settings: defaultSettings,

      toggleDarkMode: () =>
        set((s) => ({ settings: { ...s.settings, darkMode: !s.settings.darkMode } })),
      setAccentColor: (color) =>
        set((s) => ({ settings: { ...s.settings, accentColor: color } })),

      setTemplate: (t) => set((s) => ({ resume: { ...s.resume, template: t } })),
      setLanguage: (l) => set((s) => ({ resume: { ...s.resume, language: l } })),
      setPersonal: (data) =>
        set((s) => ({ resume: { ...s.resume, personal: { ...s.resume.personal, ...data } } })),
      setAvatar: (url) =>
        set((s) => ({ resume: { ...s.resume, personal: { ...s.resume.personal, avatar: url } } })),

      addExperience: (exp) =>
        set((s) => ({ resume: { ...s.resume, experience: [...s.resume.experience, exp] } })),
      updateExperience: (id, exp) =>
        set((s) => ({ resume: { ...s.resume, experience: s.resume.experience.map((e) => e.id === id ? { ...e, ...exp } : e) } })),
      removeExperience: (id) =>
        set((s) => ({ resume: { ...s.resume, experience: s.resume.experience.filter((e) => e.id !== id) } })),

      addEducation: (edu) =>
        set((s) => ({ resume: { ...s.resume, education: [...s.resume.education, edu] } })),
      updateEducation: (id, edu) =>
        set((s) => ({ resume: { ...s.resume, education: s.resume.education.map((e) => e.id === id ? { ...e, ...edu } : e) } })),
      removeEducation: (id) =>
        set((s) => ({ resume: { ...s.resume, education: s.resume.education.filter((e) => e.id !== id) } })),

      addSkillGroup: (group) =>
        set((s) => ({ resume: { ...s.resume, skills: [...s.resume.skills, group] } })),
      updateSkillGroup: (id, group) =>
        set((s) => ({ resume: { ...s.resume, skills: s.resume.skills.map((g) => g.id === id ? { ...g, ...group } : g) } })),
      removeSkillGroup: (id) =>
        set((s) => ({ resume: { ...s.resume, skills: s.resume.skills.filter((g) => g.id !== id) } })),

      addLanguage: (lang) =>
        set((s) => ({ resume: { ...s.resume, languages: [...s.resume.languages, lang] } })),
      updateLanguage: (id, lang) =>
        set((s) => ({ resume: { ...s.resume, languages: s.resume.languages.map((l) => l.id === id ? { ...l, ...lang } : l) } })),
      removeLanguage: (id) =>
        set((s) => ({ resume: { ...s.resume, languages: s.resume.languages.filter((l) => l.id !== id) } })),

      addCertificate: (cert) =>
        set((s) => ({ resume: { ...s.resume, certificates: [...s.resume.certificates, cert] } })),
      updateCertificate: (id, cert) =>
        set((s) => ({ resume: { ...s.resume, certificates: s.resume.certificates.map((c) => c.id === id ? { ...c, ...cert } : c) } })),
      removeCertificate: (id) =>
        set((s) => ({ resume: { ...s.resume, certificates: s.resume.certificates.filter((c) => c.id !== id) } })),

      setAdditionalSkills: (skills) =>
        set((s) => ({ resume: { ...s.resume, additionalSkills: skills } })),
      setInterests: (interests) =>
        set((s) => ({ resume: { ...s.resume, interests } })),

      resetResume: () => set({ resume: defaultResumeData }),
      importResume: (data) => set({ resume: data }),
    }),
    { name: 'resume-saz-data' }
  )
)
