import type { ResumeData } from './types'

/**
 * Derived, presentation-independent facts about a resume.
 * Shared by all three templates so they can never disagree with each other.
 */

/** Which sections actually carry content. */
export interface SectionPresence {
  profile: boolean
  experience: boolean
  education: boolean
  skills: boolean
  languages: boolean
  certificates: boolean
  additionalSkills: boolean
  interests: boolean
}

export function sectionPresence(data: ResumeData): SectionPresence {
  return {
    profile: data.personal.profile.trim().length > 0,
    experience: data.experience.length > 0,
    education: data.education.length > 0,
    skills: data.skills.length > 0,
    languages: data.languages.length > 0,
    certificates: data.certificates.length > 0,
    additionalSkills: data.additionalSkills.length > 0,
    interests: data.interests.length > 0,
  }
}

/**
 * Should a section be rendered at all?
 *
 * With `hideEmpty` on (the default) an unfilled section disappears instead of
 * printing a "not completed yet" placeholder into a document the user is about
 * to send to an employer. With it off, the placeholder acts as a visible
 * reminder while editing.
 */
export function shouldRender(present: boolean, hideEmpty: boolean): boolean {
  return present || !hideEmpty
}

/**
 * Approximate CEFR level → progress bar width.
 * One shared table so Template 2 and Template 3 can't drift apart.
 */
export function languageLevelWidth(level: string): string {
  const l = level.toLowerCase().trim()
  const native = ['c2', 'native', 'muttersprache', 'مادری', 'زبان مادری']
  const fluent = ['c1', 'fluent', 'fließend', 'روان']
  if (native.some((k) => l.includes(k))) return '100%'
  if (fluent.some((k) => l.includes(k))) return '85%'
  if (l.includes('b2')) return '70%'
  if (l.includes('b1')) return '55%'
  if (l.includes('a2')) return '35%'
  if (l.includes('a1')) return '20%'
  return '50%'
}

export function fullName(data: ResumeData): string {
  return [data.personal.firstName, data.personal.lastName].filter(Boolean).join(' ').trim()
}

/** Safe, descriptive base filename for exports (no extension). */
export function exportBaseName(data: ResumeData): string {
  const name = fullName(data).replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, '_')
  return name || 'resume'
}

/* ── Completeness ─────────────────────────────────────────────────────────
   A light-weight progress signal for the builder: it rewards the fields that
   recruiters actually look for rather than counting every input on the form. */

export interface CompletenessCheck {
  key: keyof SectionPresence | 'name' | 'jobTitle' | 'contact'
  done: boolean
  weight: number
}

export function completenessChecks(data: ResumeData): CompletenessCheck[] {
  const p = data.personal
  const present = sectionPresence(data)
  return [
    { key: 'name', done: Boolean(p.firstName.trim() && p.lastName.trim()), weight: 15 },
    { key: 'jobTitle', done: Boolean(p.jobTitle.trim()), weight: 10 },
    { key: 'contact', done: Boolean(p.email.trim() || p.phone.trim()), weight: 15 },
    { key: 'profile', done: present.profile, weight: 15 },
    { key: 'experience', done: present.experience, weight: 20 },
    { key: 'education', done: present.education, weight: 10 },
    { key: 'skills', done: present.skills, weight: 10 },
    { key: 'languages', done: present.languages, weight: 5 },
    { key: 'certificates', done: present.certificates, weight: 0 },
    { key: 'additionalSkills', done: present.additionalSkills, weight: 0 },
    { key: 'interests', done: present.interests, weight: 0 },
  ]
}

/** 0–100 completeness score. */
export function completeness(data: ResumeData): number {
  const checks = completenessChecks(data)
  const total = checks.reduce((sum, c) => sum + c.weight, 0)
  const done = checks.reduce((sum, c) => sum + (c.done ? c.weight : 0), 0)
  return total === 0 ? 0 : Math.round((done / total) * 100)
}

/** True once the document holds anything worth returning to. */
export function hasContent(data: ResumeData): boolean {
  return completenessChecks(data).some((c) => c.done)
}
