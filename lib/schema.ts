import { z } from 'zod'
import { newId } from './id'
import { createEmptyResume, type ResumeData } from './types'

/**
 * Runtime schema for ResumeData.
 *
 * Every leaf is `.catch(...)`-guarded so that a single malformed field in an
 * imported / persisted document degrades to its default instead of throwing
 * the whole resume away. Structural mistakes (a string where an array of
 * entries belongs) still degrade gracefully to an empty list.
 */

const str = (fallback = '') => z.string().catch(fallback)
const strList = z.array(z.string()).catch([])
const id = z.string().min(1).catch(() => newId())

/** Only inline images are accepted — a remote URL would leak the viewer's IP
 *  and would silently break offline PDF export. */
const avatar = z
  .string()
  .refine((v) => v.startsWith('data:image/'), 'avatar must be an inline data: image')
  .nullable()
  .catch(null)

const experienceSchema = z.object({
  id,
  company: str(),
  role: str(),
  startDate: str(),
  endDate: str(),
  current: z.boolean().catch(false),
  bullets: strList,
})

const educationSchema = z.object({
  id,
  institution: str(),
  degree: str(),
  field: str(),
  startDate: str(),
  endDate: str(),
  notes: str(),
})

const skillGroupSchema = z.object({
  id,
  category: str(),
  items: strList,
})

const languageSchema = z.object({
  id,
  name: str(),
  level: str(),
})

const certificateSchema = z.object({
  id,
  name: str(),
  issuer: str(),
  date: str(),
})

export const resumeSchema = z.object({
  language: z.enum(['fa', 'en', 'de']).catch('de'),
  template: z.union([z.literal(1), z.literal(2), z.literal(3)]).catch(1),
  personal: z
    .object({
      firstName: str(),
      lastName: str(),
      jobTitle: str(),
      birthDate: str(),
      birthPlace: str(),
      nationality: str(),
      address: str(),
      phone: str(),
      email: str(),
      website: str(),
      avatar,
      profile: str(),
    })
    .catch(() => createEmptyResume().personal),
  experience: z.array(experienceSchema).catch([]),
  education: z.array(educationSchema).catch([]),
  skills: z.array(skillGroupSchema).catch([]),
  languages: z.array(languageSchema).catch([]),
  certificates: z.array(certificateSchema).catch([]),
  additionalSkills: strList,
  interests: strList,
})

export type ParseResult =
  | { ok: true; data: ResumeData }
  | { ok: false; reason: 'not-json' | 'not-a-resume' }

/**
 * Parse an unknown value (typically JSON from a user-supplied file) into a
 * complete ResumeData. Returns a discriminated result instead of throwing so
 * callers can show a localized message.
 */
export function parseResume(input: unknown): ParseResult {
  if (input === null || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, reason: 'not-a-resume' }
  }
  // A resume must at least carry the personal block — otherwise the caller
  // most likely picked the wrong file and we would silently produce a blank CV.
  if (!('personal' in input)) {
    return { ok: false, reason: 'not-a-resume' }
  }
  const result = resumeSchema.safeParse(input)
  if (!result.success) return { ok: false, reason: 'not-a-resume' }
  return { ok: true, data: result.data }
}

/** Parse a JSON string straight into ResumeData. */
export function parseResumeJson(text: string): ParseResult {
  let raw: unknown
  try {
    raw = JSON.parse(text)
  } catch {
    return { ok: false, reason: 'not-json' }
  }
  return parseResume(raw)
}

/**
 * Bring a persisted document up to the current shape, filling in fields added
 * by later versions (e.g. `personal.website`). Never throws.
 */
export function migrateResume(raw: unknown): ResumeData {
  const result = parseResume(raw)
  return result.ok ? result.data : createEmptyResume()
}
