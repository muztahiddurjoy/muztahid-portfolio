'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

// Fixed, GPU-light atmosphere behind all content: blueprint grid + drifting glows.
export function AmbientBackdrop() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !root.current) return
    const blobs = root.current.querySelectorAll<HTMLElement>('[data-blob]')
    const ctx = gsap.context(() => {
      blobs.forEach((b, i) => {
        gsap.to(b, {
          xPercent: i % 2 === 0 ? 8 : -8,
          yPercent: i % 2 === 0 ? -6 : 6,
          duration: 14 + i * 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(120%_90%_at_50%_0%,#000_30%,transparent_75%)]" />
      <div
        data-blob
        className="absolute -top-[20%] left-[8%] h-[55vh] w-[55vh] rounded-full opacity-50 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(70,227,255,0.22), transparent 65%)' }}
      />
      <div
        data-blob
        className="absolute top-[55%] right-[2%] h-[60vh] w-[60vh] rounded-full opacity-40 blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(143,123,255,0.2), transparent 65%)' }}
      />
      <div
        data-blob
        className="absolute bottom-[-15%] left-[35%] h-[45vh] w-[45vh] rounded-full opacity-25 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(255,180,84,0.16), transparent 65%)' }}
      />
      {/* top + bottom vignette */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  )
}
