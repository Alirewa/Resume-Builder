/** Language the resume itself is written in. */
export type ResumeLanguage = 'fa' | 'en' | 'de'
/** Language of the application shell (menus, buttons, labels). */
export type AppLanguage = ResumeLanguage

export type TemplateId = 1 | 2 | 3

export const RESUME_LANGUAGES: readonly ResumeLanguage[] = ['fa', 'en', 'de']
export const TEMPLATE_IDS: readonly TemplateId[] = [1, 2, 3]

export interface PersonalInfo {
  firstName: string
  lastName: string
  jobTitle: string
  birthDate: string
  birthPlace: string
  nationality: string
  address: string
  phone: string
  email: string
  website: string
  avatar: string | null
  profile: string
}

export interface WorkExperience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  current: boolean
  bullets: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  notes: string
}

export interface SkillGroup {
  id: string
  category: string
  items: string[]
}

export interface Language {
  id: string
  name: string
  level: string
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
}

export interface ResumeData {
  language: ResumeLanguage
  template: TemplateId
  personal: PersonalInfo
  experience: WorkExperience[]
  education: Education[]
  skills: SkillGroup[]
  languages: Language[]
  certificates: Certificate[]
  additionalSkills: string[]
  interests: string[]
}

/** Keys of ResumeData that hold an array of items with an `id`. */
export type ResumeListKey =
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'certificates'

/**
 * Fresh, deeply-independent empty resume.
 *
 * This MUST be a factory: a shared module-level object would be handed out to
 * every `reset()` call, so any accidental in-place edit would corrupt the
 * "empty" baseline for the rest of the session.
 */
export function createEmptyResume(): ResumeData {
  return {
    language: 'de',
    template: 1,
    personal: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      birthDate: '',
      birthPlace: '',
      nationality: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      avatar: null,
      profile: '',
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certificates: [],
    additionalSkills: [],
    interests: [],
  }
}
