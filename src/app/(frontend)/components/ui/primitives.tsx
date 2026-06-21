'use client'

import { useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'

/* ---------- TechChip ---------- */
export function TechChip({
  children,
  className,
  active = false,
}: {
  children: ReactNode
  className?: string
  active?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-wide transition-colors duration-300',
        active
          ? 'border-signal/60 bg-signal/10 text-signal'
          : 'border-line text-fg-muted hover:border-line-strong hover:text-fg',
        className,
      )}
    >
      {children}
    </span>
  )
}

/* ---------- SectionLabel (eyebrow + index) ---------- */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="font-mono text-xs text-signal">{index}</span>
      <span className="h-px w-10 bg-line-strong" />
      <span className="eyebrow">{children}</span>
    </div>
  )
}

/* ---------- Marquee (pure CSS infinite) ---------- */
export function Marquee({
  children,
  className,
  duration = 28,
  reverse = false,
}: {
  children: ReactNode
  className?: string
  duration?: number
  reverse?: boolean
}) {
  return (
    <div className={cn('group/marquee relative flex overflow-hidden', className)}>
      <div
        className="flex shrink-0 items-center gap-8 pr-8"
        style={{
          animation: `marquee-x ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}

/* ---------- CountUp ---------- */
export function CountUp({
  value,
  suffix = '',
  duration = 2,
  className,
}: {
  value: number
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${value}${suffix}`
      return
    }
    const obj = { n: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.n)}${suffix}`
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}
