'use client'

import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import {
  ventureTypeMeta,
  type Venture,
  type VentureType,
} from '@/lib/portfolio-data'
import { Reveal } from '../ui/reveal'
import { AnimatedHeading } from '../ui/animated-heading'
import { ImageFrame } from '../ui/image-frame'
import { Eyebrow, Tag } from '../ui/primitives'
import { TransitionLink } from '../ui/transition-link'

type Filter = 'all' | VentureType

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  ...(Object.entries(ventureTypeMeta) as [VentureType, { label: string }][]).map(
    ([key, meta]) => ({ key, label: meta.label }),
  ),
]

// background-clip animated underline that grows on row hover/focus (theme-aware,
// uses currentColor so it works across all 12 palettes)
const underlineGrow =
  'bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_1.5px] [background-position:0_100%] transition-[background-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1.5px] group-focus-visible:bg-[length:100%_1.5px]'

export default function VenturesPage({ ventures }: { ventures: Venture[] }) {
  const [active, setActive] = useState<Filter>('all')
  const listRef = useRef<HTMLUListElement | null>(null)

  const filtered = active === 'all' ? ventures : ventures.filter((v) => v.type === active)
  const total = String(ventures.length).padStart(2, '0')

  // Soft re-stagger of the rows whenever the filter changes. The list is re-keyed
  // (key={active}) so React remounts the rows; this effect then fades them up.
  useIsoLayoutEffect(() => {
    const root = listRef.current
    if (!root) return
    const rows = root.querySelectorAll<HTMLElement>('[data-row]')
    if (!rows.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(rows, { opacity: 1, y: 0 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.set(rows, { opacity: 0, y: 26 })
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.09,
      })
    }, listRef)
    return () => ctx.revert()
  }, [active])

  return (
    <div className="pt-28 md:pt-32">
      {/* ---------------- Hero ---------------- */}
      <section className="container-page pb-14 md:pb-20">
        <Reveal>
          <Eyebrow index={total}>Ventures</Eyebrow>
        </Reveal>

        <h1 className="mt-7 font-display text-[clamp(2.7rem,7.2vw,6rem)] leading-[0.95] tracking-tight">
          <AnimatedHeading as="span" immediate text="Things I’ve" />
          <AnimatedHeading
            as="span"
            immediate
            delay={0.14}
            text="built."
            wordClassName="display-italic"
          />
        </h1>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-col gap-8 border-t border-border pt-9 md:flex-row md:items-end md:justify-between md:gap-16">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Companies I’ve founded, products I’ve shipped, and robots I’ve taught to think.
              Each venture is a bet on a future I wanted to exist — and the engineering that made
              it real.
            </p>
            <p className="shrink-0 font-script text-3xl leading-none text-muted-foreground md:text-4xl">
              {total} ventures
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Filter + List ---------------- */}
      <section className="container-page pb-20 md:pb-28" aria-label="Ventures">
        {/* filter bar */}
        <Reveal>
          <div className="flex flex-col gap-5 border-y border-border py-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter ventures by type">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActive(f.key)}
                  data-cursor
                  aria-pressed={active === f.key}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm tracking-tight transition-all duration-300',
                    active === f.key
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground',
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p className="eyebrow shrink-0" aria-live="polite">
              {String(filtered.length).padStart(2, '0')} of {total}
            </p>
          </div>
        </Reveal>

        {/* rows */}
        {filtered.length === 0 ? (
          <EmptyState onReset={() => setActive('all')} />
        ) : (
          <ul key={active} ref={listRef} className="list-none">
            {filtered.map((v, i) => (
              <li key={v.slug}>
                <VentureRow venture={v} index={i} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

/* ---------------- Venture row ---------------- */
function VentureRow({ venture: v, index }: { venture: Venture; index: number }) {
  const flip = index % 2 === 1
  const num = String(index + 1).padStart(2, '0')

  return (
    <TransitionLink
      href={`/ventures/${v.slug}`}
      data-row
      data-cursor
      data-cursor-label="View"
      aria-label={`${v.name} — ${v.tagline}`}
      className="group block border-t border-border py-10 md:py-16"
    >
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
        {/* image */}
        <div
          className={cn(
            'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5',
            flip ? 'md:order-2' : 'md:order-1',
          )}
        >
          <ImageFrame
            label={v.cover.label}
            caption={v.cover.caption}
            ratio="aspect-[16/10]"
          />
        </div>

        {/* content */}
        <div className={cn('flex flex-col', flip ? 'md:order-1' : 'md:order-2')}>
          {/* meta line */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-script text-2xl leading-none text-muted-foreground">{num}</span>
            <span className="h-px w-8 bg-border-strong" />
            <span className="eyebrow">
              {v.year} · {v.status}
            </span>
            {v.featured && (
              <span className="font-script text-lg leading-none text-muted-foreground">
                featured
              </span>
            )}
          </div>

          <div className="mt-5">
            <Tag>{ventureTypeMeta[v.type].label}</Tag>
          </div>

          <h2
            className={cn(
              'mt-4 font-display leading-[1.0] tracking-tight',
              v.featured
                ? 'text-[clamp(2rem,4.2vw,3.5rem)]'
                : 'text-[clamp(1.6rem,2.7vw,2.4rem)]',
            )}
          >
            <span className={cn('inline', underlineGrow)}>{v.name}</span>
          </h2>

          <p className="mt-3 max-w-md text-lg leading-relaxed text-muted-foreground">
            {v.tagline}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{v.role}</p>

          {/* metrics */}
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {v.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="flex items-baseline gap-2">
                <span className="font-display text-lg leading-none">{m.value}</span>
                <span className="text-xs text-muted-foreground">{m.label}</span>
              </div>
            ))}
          </div>

          {/* arrow / cta */}
          <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium">
            <span className={cn('inline', underlineGrow)}>View venture</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1" />
          </span>
        </div>
      </div>
    </TransitionLink>
  )
}

/* ---------------- Empty state ---------------- */
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="border-t border-border py-24 text-center md:py-32">
      <p className="font-script text-4xl text-muted-foreground md:text-5xl">nothing here… yet</p>
      <p className="mx-auto mt-5 max-w-sm text-muted-foreground">
        No ventures match this filter. The next one might still be on the workbench.
      </p>
      <button
        type="button"
        onClick={onReset}
        data-cursor
        className="btn-inverse mt-8 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium tracking-tight"
      >
        View all ventures
      </button>
    </div>
  )
}
