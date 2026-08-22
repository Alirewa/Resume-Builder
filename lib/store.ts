'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  AppLanguage,
  ResumeData,
  ResumeListKey,
  ResumeLanguage,
  TemplateId,
} from './types'
import { createEmptyResume } from './types'
import { migrateResume } from './schema'
import { sampleResume } from './sampleData'

const STORAGE_KEY = 'resume-saz-data'
/** Bump when the persisted shape changes; `migrate` re-validates through zod. */
const STORAGE_VERSION = 2

export interface AppSettings {
  darkMode: boolean
  accentColor: string
  /** Language of the app shell — independent of the resume's own language. */
  appLanguage: AppLanguage
  /** Omit sections the user has not filled in from the rendered resume. */
  hideEmptySections: boolean
}

/** Any item stored in one of the resume's `id`-keyed lists. */
type ItemOf<K extends ResumeListKey> = ResumeData[K][number]

interface ResumeStore {
  resume: ResumeData
  settings: AppSettings
  /** False until the persisted document has been read back from localStorage. */
  hydrated: boolean
  setHydrated: () => void
  /** One-step snapshot taken before any destructive whole-document action. */
  undoSnapshot: ResumeData | null

  // Settings
  toggleDarkMode: () => void
  setAccentColor: (color: string) => void
  setAppLanguage: (lang: AppLanguage) => void
  toggleHideEmptySections: () => void

  // Document-level
  setTemplate: (t: TemplateId) => void
  setLanguage: (l: ResumeLanguage) => void
  setPersonal: (data: Partial<ResumeData['personal']>) => void
  setAvatar: (url: string | null) => void
  setAdditionalSkills: (skills: string[]) => void
  setInterests: (interests: string[]) => void

  // Generic list CRUD — one implementation for every id-keyed list
  addItem: <K extends ResumeListKey>(key: K, item: ItemOf<K>) => void
  updateItem: <K extends ResumeListKey>(key: K, id: string, patch: Partial<ItemOf<K>>) => void
  removeItem: <K extends ResumeListKey>(key: K, id: string) => void
  moveItem: <K extends ResumeListKey>(key: K, id: string, direction: -1 | 1) => void

  // Destructive, undoable
  resetResume: () => void
  importResume: (data: ResumeData) => void
  loadSample: () => void
  undo: () => void
}

const defaultSettings: AppSettings = {
  darkMode: false,
  accentColor: '#2563eb',
  appLanguage: 'fa',
  hideEmptySections: true,
}

export const ACCENT_COLORS = [
  { value: '#2563eb', key: 'blue' },
  { value: '#7c3aed', key: 'violet' },
  { value: '#059669', key: 'green' },
  { value: '#dc2626', key: 'red' },
  { value: '#ea580c', key: 'orange' },
  { value: '#db2777', key: 'pink' },
  { value: '#0891b2', key: 'cyan' },
  { value: '#1e293b', key: 'slate' },
] as const

export type AccentKey = (typeof ACCENT_COLORS)[number]['key']

/* ── Storage-failure reporting ────────────────────────────────────────────
   A photo-heavy resume can exceed the ~5 MB localStorage budget. The write
   throws inside zustand's persist middleware, where no component can catch
   it, so we surface it through a tiny listener list instead of failing mute. */

type StorageErrorListener = () => void
const storageErrorListeners = new Set<StorageErrorListener>()

export function onStorageError(listener: StorageErrorListener): () => void {
  storageErrorListeners.add(listener)
  return () => storageErrorListeners.delete(listener)
}

const safeLocalStorage: Storage | undefined =
  typeof window === 'undefined'
    ? undefined
    : {
        get length() {
          return window.localStorage.length
        },
        clear: () => window.localStorage.clear(),
        key: (i: number) => window.localStorage.key(i),
        getItem: (k: string) => {
          try {
            return window.localStorage.getItem(k)
          } catch {
            return null
          }
        },
        removeItem: (k: string) => {
          try {
            window.localStorage.removeItem(k)
          } catch {
            /* nothing useful to do */
          }
        },
        setItem: (k: string, v: string) => {
          try {
            window.localStorage.setItem(k, v)
          } catch {
            storageErrorListeners.forEach((fn) => fn())
          }
        },
      }

/** Used during SSG, where there is no window to persist into. */
const emptyStorage: Storage = {
  length: 0,
  clear: () => {},
  key: () => null,
  getItem: () => null,
  removeItem: () => {},
  setItem: () => {},
}

/** Replace one list inside the resume, leaving everything else untouched. */
function withList<K extends ResumeListKey>(
  resume: ResumeData,
  key: K,
  next: ResumeData[K],
): ResumeData {
  return { ...resume, [key]: next }
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resume: createEmptyResume(),
      settings: defaultSettings,
      hydrated: false,
      setHydrated: () => set({ hydrated: true }),
      undoSnapshot: null,

      toggleDarkMode: () =>
        set((s) => ({ settings: { ...s.settings, darkMode: !s.settings.darkMode } })),
      setAccentColor: (color) => set((s) => ({ settings: { ...s.settings, accentColor: color } })),
      setAppLanguage: (appLanguage) => set((s) => ({ settings: { ...s.settings, appLanguage } })),
      toggleHideEmptySections: () =>
        set((s) => ({
          settings: { ...s.settings, hideEmptySections: !s.settings.hideEmptySections },
        })),

      setTemplate: (t) => set((s) => ({ resume: { ...s.resume, template: t } })),
      setLanguage: (l) => set((s) => ({ resume: { ...s.resume, language: l } })),
      setPersonal: (data) =>
        set((s) => ({ resume: { ...s.resume, personal: { ...s.resume.personal, ...data } } })),
      setAvatar: (url) =>
        set((s) => ({ resume: { ...s.resume, personal: { ...s.resume.personal, avatar: url } } })),
      setAdditionalSkills: (additionalSkills) =>
        set((s) => ({ resume: { ...s.resume, additionalSkills } })),
      setInterests: (interests) => set((s) => ({ resume: { ...s.resume, interests } })),

      addItem: (key, item) =>
        set((s) => ({
          resume: withList(s.resume, key, [...s.resume[key], item] as ResumeData[typeof key]),
        })),

      updateItem: (key, id, patch) =>
        set((s) => ({
          resume: withList(
            s.resume,
            key,
            s.resume[key].map((it) =>
              it.id === id ? { ...it, ...patch } : it,
            ) as ResumeData[typeof key],
          ),
        })),

      removeItem: (key, id) =>
        set((s) => ({
          resume: withList(
            s.resume,
            key,
            s.resume[key].filter((it) => it.id !== id) as ResumeData[typeof key],
          ),
        })),

      moveItem: (key, id, direction) =>
        set((s) => {
          const list = [...s.resume[key]]
          const from = list.findIndex((it) => it.id === id)
          const to = from + direction
          if (from < 0 || to < 0 || to >= list.length) return s
          const [moved] = list.splice(from, 1)
          list.splice(to, 0, moved)
          return { resume: withList(s.resume, key, list as ResumeData[typeof key]) }
        }),

      resetResume: () =>
        set((s) => ({
          undoSnapshot: s.resume,
          // Keep the template and the resume language — clearing the *content*
          // should not silently throw away those choices too.
          resume: {
            ...createEmptyResume(),
            template: s.resume.template,
            language: s.resume.language,
          },
        })),

      importResume: (data) => set((s) => ({ undoSnapshot: s.resume, resume: data })),

      loadSample: () =>
        set((s) => ({
          undoSnapshot: s.resume,
          resume: { ...sampleResume(s.resume.language), template: s.resume.template },
        })),

      undo: () => {
        const snapshot = get().undoSnapshot
        if (!snapshot) return
        set({ resume: snapshot, undoSnapshot: null })
      },
    }),
    {
      name: STORAGE_KEY,
      version: STORAGE_VERSION,
      storage: createJSONStorage(() => safeLocalStorage ?? emptyStorage),
      // `hydrated` and `undoSnapshot` are session state, never persisted.
      partialize: (s) => ({ resume: s.resume, settings: s.settings }),
      migrate: (persisted) => {
        const state = (persisted ?? {}) as Partial<{ resume: unknown; settings: unknown }>
        return {
          resume: migrateResume(state.resume),
          settings: { ...defaultSettings, ...(state.settings as object | undefined) },
        }
      },
      // Runs for the current version too, so a hand-edited or half-written
      // localStorage entry can never crash a template with `undefined.map`.
      merge: (persisted, current) => {
        const state = (persisted ?? {}) as Partial<{ resume: unknown; settings: AppSettings }>
        return {
          ...current,
          resume: migrateResume(state.resume),
          settings: { ...defaultSettings, ...state.settings },
        }
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    },
  ),
)
