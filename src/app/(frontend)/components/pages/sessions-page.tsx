'use client'

import { useMemo, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import {
  sessionModeMeta,
  sessionFormatMeta,
  sessionLevelMeta,
  sessionAvailabilityMeta,
  type Session,
  type SessionMode,
  type SessionsPageData,
} from '@/lib/portfolio-data'
import { Reveal } from '../ui/reveal'
import { AnimatedHeading } from '../ui/animated-heading'
import { ImageFrame } from '../ui/image-frame'
import { AmbientBackground } from '../ui/ambient-background'
import { Eyebrow, Tag } from '../ui/primitives'
import { TransitionLink } from '../ui/transition-link'
import { Icon, type IconName } from '../ui/lucide-icon'
import { usePreview } from '../preview-context'

type ModeFilter = 'all' | SessionMode
type View = 'curated' | 'recent' | 'featured'

// "Soonest" sort key: the explicit ISO date (earliest first); undated sessions
// sink to the bottom rather than jumping the queue. SSR-safe (no `now`).
const soonestOf = (s: Session): number => {
  if (s.date) {
    const t = Date.parse(s.date)
    if (!Number.isNaN(t)) return t
  }
  return Number.POSITIVE_INFINITY
}

// background-clip animated underline that grows on row hover/focus (theme-aware)
const underlineGrow =
  'bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_1.5px] [background-position:0_100%] transition-[background-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1.5px] group-focus-visible:bg-[length:100%_1.5px]'

/* small availability indicator — open pulses, waitlist/closed read muted */
function AvailabilityPill({ availability }: { availability: Session['availability'] }) {
  const label = sessionAvailabilityMeta[availability].label
  if (availability === 'open') {
    return (
      <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/40" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
        </span>
        {label}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-border-strong" />
      {label}
    </span>
  )
}

export default function SessionsPage({
  sessions,
  chrome,
}: {
  sessions: Session[]
  chrome: SessionsPageData
}) {
  const isPreview = usePreview()
  const [view, setView] = useState<View>('curated')
  const [mode, setMode] = useState<ModeFilter>('all')
  const listRef = useRef<HTMLUListElement | null>(null)

  const total = String(sessions.length).padStart(2, '0')

  const views: { key: View; label: string }[] = [
    { key: 'curated', label: chrome.curatedLabel },
    { key: 'recent', label: chrome.recentLabel },
    { key: 'featured', label: chrome.featuredLabel },
  ]

  const modeFilters: { key: ModeFilter; label: string }[] = [
    { key: 'all', label: chrome.allLabel },
    ...(Object.entries(sessionModeMeta) as [SessionMode, { label: string }][]).map(
      ([key, meta]) => ({ key, label: meta.label }),
    ),
  ]

  // Compose view + mode. Featured narrows the set; Soonest re-sorts by date;
  // Curated keeps the editor's order (sessions arrive pre-sorted by order/date).
  const filtered = useMemo(() => {
    let list = sessions
    if (view === 'featured') list = list.filter((s) => s.featured)
    if (mode !== 'all') list = list.filter((s) => s.mode === mode)
    if (view === 'recent') list = [...list].sort((a, b) => soonestOf(a) - soonestOf(b))
    return list
  }, [sessions, view, mode])

  // Soft re-stagger of the rows whenever the view/filter changes.
  useIsoLayoutEffect(() => {
    const root = listRef.current
    if (!root) return
    const rows = root.querySelectorAll<HTMLElement>('[data-row]')
    if (!rows.length) return
    const reduce = isPreview || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(rows, { opacity: 1, y: 0 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.set(rows, { opacity: 0, y: 26 })
      gsap.to(rows, { opacity: 1, y: 0, duration: 1, ease: 'power4.out', stagger: 0.09 })
    }, listRef)
    return () => ctx.revert()
  }, [view, mode, isPreview])

  const reset = () => {
    setView('curated')
    setMode('all')
  }

  return (
    <div className="pt-28 md:pt-32">
      {/* ---------------- Hero ---------------- */}
      <section className="container-page relative pb-14 md:pb-20">
        <AmbientBackground />
        <Reveal>
          <Eyebrow index={total}>{chrome.eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="mt-7 font-display text-[clamp(2.7rem,7.2vw,6rem)] leading-[0.95] tracking-tight">
          <AnimatedHeading as="span" immediate text={chrome.headlineLineOne} />
          <AnimatedHeading
            as="span"
            immediate
            delay={0.14}
            text={chrome.headlineLineTwo}
            wordClassName="display-italic"
          />
        </h1>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-col gap-8 border-t border-border pt-9 md:flex-row md:items-end md:justify-between md:gap-16">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{chrome.intro}</p>
            <p className="shrink-0 font-script text-3xl leading-none text-muted-foreground md:text-4xl">
              {total} {chrome.countNoun}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Controls + List ---------------- */}
      <section className="container-page pb-20 md:pb-28" aria-label="Sessions">
        <Reveal>
          <div className="flex flex-col gap-5 border-y border-border py-6">
            {/* view: curated / soonest / featured */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3" role="group" aria-label="Session view">
                <span className="eyebrow">{chrome.viewLabel}</span>
                <div className="flex rounded-full border border-border p-1">
                  {views.map((v) => (
                    <button
                      key={v.key}
                      type="button"
                      onClick={() => setView(v.key)}
                      data-cursor
                      aria-pressed={view === v.key}
                      className={cn(
                        'rounded-full px-4 py-1.5 text-sm tracking-tight transition-colors duration-300',
                        view === v.key
                          ? 'bg-foreground text-background'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
              <p className="eyebrow shrink-0" aria-live="polite">
                {String(filtered.length).padStart(2, '0')} {chrome.ofLabel} {total}
              </p>
            </div>

            {/* mode chips */}
            <div className="flex items-center gap-3" role="group" aria-label="Filter sessions by mode">
              <span className="eyebrow hidden shrink-0 sm:inline">{chrome.modeLabel}</span>
              <div className="flex flex-wrap gap-2.5">
                {modeFilters.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setMode(f.key)}
                    data-cursor
                    aria-pressed={mode === f.key}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm tracking-tight transition-all duration-300',
                      mode === f.key
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground',
                    )}
                  >
                    {f.key !== 'all' && (
                      <Icon name={sessionModeMeta[f.key].icon as IconName} className="h-3.5 w-3.5" />
                    )}
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* rows */}
        {filtered.length === 0 ? (
          <EmptyState view={view} onReset={reset} chrome={chrome} />
        ) : (
          <ul key={`${view}-${mode}`} ref={listRef} className="list-none">
            {filtered.map((s, i) => (
              <li key={s.slug}>
                <SessionRow session={s} index={i} chrome={chrome} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

/* ---------------- Session row ---------------- */
function SessionRow({
  session: s,
  index,
  chrome,
}: {
  session: Session
  index: number
  chrome: SessionsPageData
}) {
  const flip = index % 2 === 1
  const num = String(index + 1).padStart(2, '0')
  const modeMeta = sessionModeMeta[s.mode]

  return (
    <TransitionLink
      href={`/sessions/${s.slug}`}
      data-row
      data-cursor
      data-cursor-label="View"
      aria-label={`${s.title} — ${s.tagline}`}
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
          <ImageFrame label={s.cover.label} caption={s.cover.caption} src={s.cover.image} ratio="aspect-[16/10]" />
        </div>

        {/* content */}
        <div className={cn('flex flex-col', flip ? 'md:order-1' : 'md:order-2')}>
          {/* meta line */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-script text-2xl leading-none text-muted-foreground">{num}</span>
            <span className="h-px w-8 bg-border-strong" />
            <span className="eyebrow inline-flex items-center gap-1.5">
              <Icon name={modeMeta.icon as IconName} className="h-3.5 w-3.5" />
              {modeMeta.label}
            </span>
            {s.featured && (
              <span className="font-script text-lg leading-none text-muted-foreground">
                {chrome.featuredBadge}
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Tag>{sessionFormatMeta[s.format].label}</Tag>
            <Tag>{sessionLevelMeta[s.level].label}</Tag>
          </div>

          <h2 className="mt-4 font-display text-[clamp(1.7rem,2.9vw,2.6rem)] leading-[1.0] tracking-tight">
            <span className={cn('inline', underlineGrow)}>{s.title}</span>
          </h2>

          <p className="mt-3 max-w-md text-lg leading-relaxed text-muted-foreground">{s.tagline}</p>

          {/* logistics */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            {s.logistics.duration && (
              <span className="text-muted-foreground">{s.logistics.duration}</span>
            )}
            {s.logistics.price && (
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-border-strong" />
                <span className="font-display text-base leading-none">{s.logistics.price}</span>
              </span>
            )}
          </div>

          {/* availability + cta */}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <AvailabilityPill availability={s.availability} />
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              <span className={cn('inline', underlineGrow)}>{chrome.rowCtaLabel}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1" />
            </span>
          </div>
        </div>
      </div>
    </TransitionLink>
  )
}

/* ---------------- Empty state ---------------- */
function EmptyState({
  view,
  onReset,
  chrome,
}: {
  view: View
  onReset: () => void
  chrome: SessionsPageData
}) {
  const message = view === 'featured' ? chrome.emptyMessageFeatured : chrome.emptyMessageDefault
  return (
    <div className="border-t border-border py-24 text-center md:py-32">
      <p className="font-script text-4xl text-muted-foreground md:text-5xl">{chrome.emptyScript}</p>
      <p className="mx-auto mt-5 max-w-sm text-muted-foreground">{message}</p>
      <button
        type="button"
        onClick={onReset}
        data-cursor
        className="btn-inverse mt-8 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium tracking-tight"
      >
        {chrome.emptyCtaLabel}
      </button>
    </div>
  )
}
