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
import { useLenis } from './smooth-scroll'

type TransitionCtx = { navigate: (href: string) => void }
const Ctx = createContext<TransitionCtx>({ navigate: () => {} })
export const useTransition = () => useContext(Ctx)

const COLS = 6

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const lenis = useLenis()

  const overlayRef = useRef<HTMLDivElement>(null)
  const colsRef = useRef<HTMLDivElement[]>([])
  const labelRef = useRef<HTMLDivElement>(null)
  const animating = useRef(false)
  const firstLoad = useRef(true)

  const setCol = (el: HTMLDivElement | null, i: number) => {
    if (el) colsRef.current[i] = el
  }

  // REVEAL: panels retract upward after the new route paints
  const reveal = useCallback(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    const tl = gsap.timeline({
      onComplete: () => {
        overlay.style.pointerEvents = 'none'
        animating.current = false
      },
    })
    tl.set(overlay, { pointerEvents: 'auto' })
    tl.to(labelRef.current, { opacity: 0, duration: 0.25, ease: 'power2.out' }, 0)
    tl.to(
      colsRef.current,
      {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.7,
        ease: 'expo.inOut',
        stagger: 0.06,
      },
      0.05,
    )
  }, [])

  // COVER: panels grow from the bottom to hide the page, then push the route
  const navigate = useCallback(
    (href: string) => {
      if (animating.current) return
      // same in-page hash → let the anchor handler deal with it
      if (href.startsWith('#')) return
      animating.current = true
      const overlay = overlayRef.current
      if (!overlay) {
        router.push(href)
        return
      }
      const tl = gsap.timeline({
        onComplete: () => router.push(href),
      })
      tl.set(overlay, { pointerEvents: 'auto' })
      tl.set(colsRef.current, { scaleY: 0, transformOrigin: 'bottom' })
      tl.to(colsRef.current, {
        scaleY: 1,
        duration: 0.6,
        ease: 'expo.inOut',
        stagger: 0.05,
      })
      tl.to(labelRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' }, '-=0.25')
    },
    [router],
  )

  // On every route change: jump to top, then reveal.
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false
      // initial mount: panels start covering → reveal in
      gsap.set(colsRef.current, { scaleY: 1, transformOrigin: 'top' })
      reveal()
      return
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    gsap.set(colsRef.current, { scaleY: 1, transformOrigin: 'top' })
    reveal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <Ctx.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[120] flex"
        style={{ pointerEvents: 'none' }}
      >
        {Array.from({ length: COLS }).map((_, i) => (
          <div
            key={i}
            ref={(el) => setCol(el, i)}
            className="h-full flex-1 bg-ink-950"
            style={{
              transform: 'scaleY(0)',
              boxShadow: '1px 0 0 rgba(70,227,255,0.06)',
            }}
          />
        ))}
        <div
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-signal">
            Loading
            <span className="caret" />
          </span>
        </div>
      </div>
    </Ctx.Provider>
  )
}
