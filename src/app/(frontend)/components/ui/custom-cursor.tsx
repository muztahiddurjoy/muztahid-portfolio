'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

// A magnetic dot + trailing ring. Hidden on touch / reduced-motion.
// Grows + labels on elements carrying [data-cursor] (optionally [data-cursor-label]).
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce || !dot.current || !ring.current) return

    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' })
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })

    const move = (e: MouseEvent) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null
      if (t) {
        const text = t.getAttribute('data-cursor-label') || ''
        gsap.to(ring.current, { scale: text ? 2.6 : 1.9, borderColor: 'rgba(70,227,255,0.9)', duration: 0.3 })
        gsap.to(dot.current, { scale: 0.4, duration: 0.3 })
        if (label.current) {
          label.current.textContent = text
          gsap.to(label.current, { opacity: 1, duration: 0.2 })
        }
      } else {
        gsap.to(ring.current, { scale: 1, borderColor: 'rgba(146,166,204,0.45)', duration: 0.3 })
        gsap.to(dot.current, { scale: 1, duration: 0.3 })
        if (label.current) gsap.to(label.current, { opacity: 0, duration: 0.2 })
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.documentElement.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.style.cursor = ''
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[110] hidden md:block">
      <div
        ref={ring}
        className="absolute -left-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full border"
        style={{ borderColor: 'rgba(146,166,204,0.45)' }}
      >
        <span
          ref={label}
          className="absolute whitespace-nowrap font-mono text-[0.5rem] uppercase tracking-[0.2em] text-signal opacity-0"
        />
      </div>
      <div ref={dot} className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-signal" />
    </div>
  )
}
