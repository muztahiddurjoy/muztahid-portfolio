'use client'

import { useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'

/* ---------- Eyebrow (section label) ---------- */
export function Eyebrow({
  children,
  index,
  className,
}: {
  children: ReactNode
  index?: string
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {index && <span className="font-script text-lg leading-none text-muted-foreground">{index}</span>}
      <span className="h-px w-8 bg-border-strong" />
      <span className="eyebrow">{children}</span>
    </div>
  )
}

/* ---------- Tag / chip ---------- */
export function Tag({
  children,
  active = false,
  className,
}: {
  children: ReactNode
  active?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-[0.78rem] tracking-tight transition-colors duration-300',
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}

/* ---------- Divider ---------- */
export function Divider({ className }: { className?: string }) {
  return <hr className={cn('border-0 border-t border-border', className)} />
}

/* ---------- Signature (handwritten name) ---------- */
export function Signature({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('font-script', className)}>{children}</span>
}

/* ---------- Marquee (pure CSS) ---------- */
export function Marquee({
  children,
  className,
  duration = 32,
  reverse = false,
}: {
  children: ReactNode
  className?: string
  duration?: number
  reverse?: boolean
}) {
  return (
    <div className={cn('relative flex overflow-hidden', className)}>
      <div
        className="flex shrink-0 items-center"
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
  prefix = '',
  duration = 2,
  className,
}: {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${prefix}${value}${suffix}`
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
          el.textContent = `${prefix}${Math.round(obj.n)}${suffix}`
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
