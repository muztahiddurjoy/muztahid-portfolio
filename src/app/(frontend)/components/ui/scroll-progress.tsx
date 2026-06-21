'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const p = max > 0 ? h.scrollTop / max : 0
      if (bar.current) gsap.set(bar.current, { scaleX: p })
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[100] h-[2px] bg-transparent">
      <div
        ref={bar}
        className="h-full w-full origin-left scale-x-0"
        style={{ background: 'linear-gradient(90deg, var(--color-signal), var(--color-cloud))' }}
      />
    </div>
  )
}
