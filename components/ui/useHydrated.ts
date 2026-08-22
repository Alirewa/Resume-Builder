'use client'

import { useSyncExternalStore } from 'react'

/** Nothing to subscribe to — the value flips once, at hydration. */
const noopSubscribe = () => () => {}

/**
 * False while rendering the pre-built HTML, true once React has hydrated.
 *
 * Every page here is statically exported, but the real state lives in
 * localStorage and zustand's persist middleware restores it *before* React
 * hydrates. Rendering that restored state on the first pass would therefore
 * never match the pre-rendered markup. Components read this flag and show the
 * build-time defaults for exactly one render, then swap to the real data.
 *
 * `useSyncExternalStore` gives this for free through its server snapshot,
 * without the cascading render an effect-plus-setState would cause.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )
}
