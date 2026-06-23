'use client'

import { createContext, useContext, type ReactNode } from 'react'

/**
 * Signals that the tree is rendering inside the Payload live-preview iframe.
 * Animation primitives (Reveal, AnimatedHeading, CountUp) and the per-page GSAP
 * effects read this to render their FINAL state immediately — so an editor sees
 * the whole page (and every keystroke) without scrolling, and nothing is ever
 * left stuck at opacity:0 by a scroll-trigger that never fires in the iframe.
 */
const PreviewContext = createContext(false)

export const usePreview = (): boolean => useContext(PreviewContext)

export function PreviewProvider({ value = true, children }: { value?: boolean; children: ReactNode }) {
  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>
}
