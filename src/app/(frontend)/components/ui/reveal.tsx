'use client'

import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { usePreview } from '../preview-context'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  delay?: number
  y?: number
  duration?: number
  once?: boolean
  start?: string
  className?: string
}

// Scroll-triggered enter. Content is server-rendered & visible without JS;
// the initial hidden state is only applied in the browser (before paint).
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  y = 30,
  duration = 0.9,
  once = true,
  start = 'top 86%',
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const isPreview = usePreview()

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    // In live preview, leave content at its final (visible) state — no hide,
    // no scroll-trigger that would otherwise never fire inside the iframe.
    if (isPreview) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y })
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start, once },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  )
}
