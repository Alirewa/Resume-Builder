export type ResumeLanguage = 'fa' | 'en' | 'de'
export type TemplateId = 1 | 2 | 3

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

export const defaultResumeData: ResumeData = {
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
