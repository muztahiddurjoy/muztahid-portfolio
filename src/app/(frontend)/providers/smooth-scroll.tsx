'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const LenisContext = createContext<Lenis | null>(null)

export const useLenis = () => useContext(LenisContext)

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.1,
    })

    setLenis(instance)
    instance.on('scroll', ScrollTrigger.update)

    const onRaf = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(onRaf)
    gsap.ticker.lagSmoothing(0)

    // make ScrollTrigger refresh after fonts/images settle
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    return () => {
      gsap.ticker.remove(onRaf)
      window.removeEventListener('load', refresh)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
