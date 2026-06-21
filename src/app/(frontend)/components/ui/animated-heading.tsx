'use client'

import { useRef, type ElementType } from 'react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'

type Props = {
  text: string | string[]
  as?: ElementType
  className?: string
  wordClassName?: string // applied to each word span (use for gradient/clip text)
  stagger?: number
  delay?: number
  immediate?: boolean // animate on mount instead of on scroll (hero)
  start?: string
}

// Per-word masked reveal (translateY from below a clip). Full text stays in the
// DOM for screen readers; only the visual presentation animates.
export function AnimatedHeading({
  text,
  as: Tag = 'h2',
  className,
  wordClassName,
  stagger = 0.07,
  delay = 0,
  immediate = false,
  start = 'top 84%',
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const lines = Array.isArray(text) ? text : [text]

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll<HTMLElement>('[data-word]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(words, { yPercent: 0, opacity: 1 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 118, opacity: 0 })
      const vars: gsap.TweenVars = {
        yPercent: 0,
        opacity: 1,
        duration: 1.05,
        ease: 'expo.out',
        stagger,
        delay,
      }
      if (immediate) gsap.to(words, vars)
      else gsap.to(words, { ...vars, scrollTrigger: { trigger: el, start, once: true } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden align-bottom">
              <span data-word className={cn('inline-block', wordClassName)}>
                {word}
                {' '}
              </span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
