'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from '@/lib/gsap'
import type { SiteConfig } from '@/lib/portfolio-data'
import { useLenis } from './smooth-scroll'

type TransitionCtx = { navigate: (href: string) => void }
const Ctx = createContext<TransitionCtx>({ navigate: () => {} })
export const useTransition = () => useContext(Ctx)

// Soft editorial transition. The panel is parked below the viewport; a real
// navigation sweeps it up to cover, the route swaps, then it sweeps up and away.
// NB: we always pin `y: 0` so gsap's parse of the initial inline translateY(100%)
// (which it stores as a leftover px `y`) can never offset the yPercent tweens.
export function TransitionProvider({ children, site }: { children: ReactNode; site: SiteConfig }) {
  const router = useRouter()
  const pathname = usePathname()
  const lenis = useLenis()

  const overlay = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const mark = useRef<HTMLDivElement>(null)
  const navigated = useRef(false)
  const animating = useRef(false)

  const park = useCallback(() => {
    if (overlay.current) overlay.current.style.pointerEvents = 'none'
    gsap.set(panel.current, { y: 0, yPercent: 100 })
    gsap.set(mark.current, { opacity: 0, y: 16 })
    animating.current = false
  }, [])

  const navigate = useCallback(
    (href: string) => {
      if (animating.current || href.startsWith('#')) return
      animating.current = true
      navigated.current = true
      if (!overlay.current || !panel.current) {
        router.push(href)
        return
      }
      overlay.current.style.pointerEvents = 'auto'
      const tl = gsap.timeline({ onComplete: () => router.push(href) })
      tl.fromTo(
        panel.current,
        { y: 0, yPercent: 100 },
        { y: 0, yPercent: 0, duration: 0.65, ease: 'power4.inOut' },
      )
      tl.fromTo(
        mark.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.3',
      )
    },
    [router],
  )

  // Park on mount; after a real navigation, reveal (panel sweeps up and away).
  useEffect(() => {
    if (!navigated.current) {
      park()
      return
    }
    navigated.current = false
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    if (overlay.current) overlay.current.style.pointerEvents = 'auto'
    const tl = gsap.timeline({ onComplete: park })
    tl.to(mark.current, { opacity: 0, duration: 0.25, ease: 'power2.out' }, 0)
    tl.to(panel.current, { y: 0, yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, 0.05)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <Ctx.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlay}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[120]"
        style={{ pointerEvents: 'none' }}
      >
        <div
          ref={panel}
          className="absolute inset-0 flex items-center justify-center bg-foreground text-background"
          style={{ transform: 'translateY(100%)' }}
        >
          <div ref={mark} className="text-center" style={{ opacity: 0 }}>
            <span className="font-signature text-6xl leading-[1.2] md:text-7xl">{site.name}</span>
            <span className="mt-2 block text-[0.7rem] uppercase tracking-[0.35em] opacity-70">
              {site.role}
            </span>
          </div>
        </div>
      </div>
    </Ctx.Provider>
  )
}
