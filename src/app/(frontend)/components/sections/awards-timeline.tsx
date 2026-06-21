'use client'

import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import { awards, type Award, type AwardCategory } from '@/lib/portfolio-data'
import { Reveal } from '../ui/reveal'
import { AnimatedHeading } from '../ui/animated-heading'
import { SectionLabel } from '../ui/primitives'
import { Icon, type IconName } from '../ui/lucide-icon'
import { TransitionLink } from '../ui/transition-link'

/* ------------------------------------------------------------------ */
/*  Static derived data (single source = portfolio-data)              */
/* ------------------------------------------------------------------ */

// Most recent first — but the spine still reads top→bottom chronologically clear.
const TIMELINE: Award[] = [...awards].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
)
const LATEST_YEAR = new Date(TIMELINE[0].date).getFullYear()
const EARLIEST_YEAR = new Date(TIMELINE[TIMELINE.length - 1].date).getFullYear()

const COUNTS = TIMELINE.reduce(
  (acc, a) => {
    acc[a.category] += 1
    return acc
  },
  { award: 0, competition: 0, leadership: 0 } as Record<AwardCategory, number>,
)

const LEGEND_ORDER: AwardCategory[] = ['award', 'competition', 'leadership']

type Meta = {
  label: string
  icon: IconName
  hex: string
  tagBg: string
  tagBorder: string
  tagText: string
  ring: string
}

// Award = hardware amber + Trophy · Competition = signal cyan + Award · Leadership = cloud violet + Users
const CATEGORY_META: Record<AwardCategory, Meta> = {
  award: {
    label: 'Award',
    icon: 'Trophy',
    hex: '#ffb454',
    tagBg: 'bg-hardware/10',
    tagBorder: 'border-hardware/40',
    tagText: 'text-hardware',
    ring: 'ring-hardware/40',
  },
  competition: {
    label: 'Competition',
    icon: 'Award',
    hex: '#46e3ff',
    tagBg: 'bg-signal/10',
    tagBorder: 'border-signal/40',
    tagText: 'text-signal',
    ring: 'ring-signal/40',
  },
  leadership: {
    label: 'Leadership',
    icon: 'Users',
    hex: '#8f7bff',
    tagBg: 'bg-cloud/10',
    tagBorder: 'border-cloud/40',
    tagText: 'text-cloud',
    ring: 'ring-cloud/40',
  },
}

/* ------------------------------------------------------------------ */
/*  Category tag (shared by legend + cards)                            */
/* ------------------------------------------------------------------ */

function CategoryTag({ category, className }: { category: AwardCategory; className?: string }) {
  const m = CATEGORY_META[category]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.62rem] uppercase leading-none tracking-[0.18em]',
        m.tagBg,
        m.tagBorder,
        m.tagText,
        className,
      )}
    >
      <Icon name={m.icon} className="h-3 w-3" aria-hidden />
      {m.label}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Single milestone                                                  */
/* ------------------------------------------------------------------ */

function TimelineItem({ award, index }: { award: Award; index: number }) {
  const m = CATEGORY_META[award.category]
  const isLeft = index % 2 === 0 // even → left, odd → right (desktop)
  const order = String(index + 1).padStart(2, '0')
  const link = award.link
  const external = link ? /^https?:\/\//.test(link) : false

  return (
    <li className="relative md:grid md:grid-cols-2">
      {/* connector hairline from spine → card (desktop only) */}
      <span
        aria-hidden
        className={cn(
          'absolute top-9 hidden h-px -translate-y-1/2 md:block',
          isLeft ? 'right-1/2 mr-2 w-10' : 'left-1/2 ml-2 w-10',
        )}
        style={{
          background: `linear-gradient(${isLeft ? '270deg' : '90deg'}, ${m.hex}66, transparent)`,
        }}
      />

      {/* node on the spine */}
      <span
        aria-hidden
        className="absolute left-[7px] top-9 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
      >
        <span className="relative flex h-3.5 w-3.5 items-center justify-center">
          {award.featured && (
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
              style={{ background: m.hex }}
            />
          )}
          <span
            className="relative h-3.5 w-3.5 rounded-full ring-4 ring-ink-950"
            style={{ background: m.hex, boxShadow: `0 0 ${award.featured ? '16px' : '8px'} ${m.hex}` }}
          />
        </span>
      </span>

      {/* reveal wrapper (GSAP drives this — keeps card transform free for hover) */}
      <div
        data-timeline-card
        data-side={isLeft ? 'left' : 'right'}
        className={cn(
          'ml-14 md:ml-0',
          isLeft ? 'md:col-start-1 md:pr-12' : 'md:col-start-2 md:pl-12',
        )}
      >
        <article
          data-cursor
          className={cn(
            'group surface relative overflow-hidden rounded-[var(--radius-card)] p-6 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-strong sm:p-7',
            award.featured && 'ring-1',
            award.featured && m.ring,
          )}
          style={
            award.featured
              ? { boxShadow: `0 0 0 1px ${m.hex}22, 0 24px 60px -30px ${m.hex}66` }
              : undefined
          }
        >
          {/* hover glow, tinted by category, emerging from the spine-facing corner */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(120% 90% at ${isLeft ? '100%' : '0%'} 0%, ${m.hex}16, transparent 62%)`,
            }}
          />

          {/* spine-facing accent bar (wipes in on hover/focus) */}
          <span
            aria-hidden
            className={cn(
              'absolute inset-y-5 w-[3px] origin-top scale-y-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100',
              isLeft ? 'left-0 md:left-auto md:right-0' : 'left-0',
            )}
            style={{ background: m.hex }}
          />

          <div className="relative z-10">
            {/* header: category tag + date */}
            <div
              className={cn(
                'flex items-center justify-between gap-3',
                isLeft && 'md:flex-row-reverse',
              )}
            >
              <CategoryTag category={award.category} />
              <span className="font-mono text-[0.7rem] tracking-wide text-fg-dim">
                {award.dateLabel}
              </span>
            </div>

            {/* title */}
            <h3
              className={cn(
                'mt-4 font-display text-xl font-semibold leading-tight text-fg sm:text-2xl',
                isLeft && 'md:text-right',
              )}
            >
              {award.title}
            </h3>

            {/* organization */}
            <p
              className={cn(
                'mt-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-fg-muted',
                isLeft && 'md:text-right',
              )}
            >
              {award.organization}
            </p>

            {/* description */}
            <p
              className={cn(
                'mt-3 text-pretty text-sm leading-relaxed text-fg-muted',
                isLeft && 'md:text-right',
              )}
            >
              {award.description}
            </p>

            {/* footer: index · featured · link */}
            <div
              className={cn(
                'mt-5 flex items-center justify-between gap-3 border-t border-line pt-4',
                isLeft && 'md:flex-row-reverse',
              )}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.6rem] tracking-[0.2em] text-fg-dim">
                  M-{order}
                </span>
                {award.featured && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-signal">
                    <span className="h-1 w-1 rounded-full bg-signal" />
                    Featured
                  </span>
                )}
              </div>

              {link && (
                <TransitionLink
                  href={link}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer noopener' : undefined}
                  data-cursor
                  data-cursor-label="View"
                  aria-label={`View ${award.title}`}
                  className="group/link inline-flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fg-muted transition-colors duration-300 hover:text-signal"
                >
                  View
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </TransitionLink>
              )}
            </div>
          </div>
        </article>
      </div>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

export default function AwardsTimeline() {
  const root = useRef<HTMLElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const head = useRef<HTMLSpanElement>(null)

  useIsoLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const progressEl = progress.current
      const headEl = head.current
      const frameEl = frame.current
      const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-timeline-card]'))

      // Reduced motion → show the final, fully-revealed state. No transforms.
      if (reduce) {
        if (progressEl) gsap.set(progressEl, { scaleY: 1 })
        if (headEl) gsap.set(headEl, { autoAlpha: 0 })
        return
      }

      // Progress spine + travelling head, scrubbed to the section's scroll.
      if (progressEl) gsap.set(progressEl, { scaleY: 0, transformOrigin: 'top' })
      if (headEl) gsap.set(headEl, { xPercent: -50, yPercent: -50, y: 0 })

      if (frameEl) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: frameEl,
            start: 'top 62%',
            end: 'bottom 62%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        if (progressEl) tl.fromTo(progressEl, { scaleY: 0 }, { scaleY: 1, ease: 'none' }, 0)
        if (headEl)
          tl.fromTo(headEl, { y: 0 }, { y: () => frameEl.offsetHeight, ease: 'none' }, 0)
      }

      // Each milestone slides in from its own side.
      const desktop = window.matchMedia('(min-width: 768px)').matches
      cards.forEach((card) => {
        const fromX = desktop ? (card.dataset.side === 'left' ? -64 : 64) : -32
        gsap.set(card, { opacity: 0, x: fromX })
        gsap.to(card, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id="timeline"
      aria-label="Awards, competitions and leadership timeline"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* ambient backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dotgrid opacity-50 [mask-image:radial-gradient(80%_55%_at_50%_0%,#000,transparent_75%)]" />
        <div className="absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-signal/[0.045] blur-[130px]" />
      </div>

      <div className="container-x relative">
        {/* ---------------- header ---------------- */}
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index="03">Timeline</SectionLabel>
          </Reveal>

          <h2 className="mt-6 text-h1 text-balance">
            <AnimatedHeading as="span" text="Proof beyond" className="block" />
            <AnimatedHeading
              as="span"
              text="the code."
              className="block"
              wordClassName="text-signal-gradient"
              delay={0.08}
            />
          </h2>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted md:text-lg">
              Engineering is only half the story. These are the leadership roles I&rsquo;ve carried,
              the international competitions I&rsquo;ve won, and the business acumen I&rsquo;ve built
              &mdash; the proof that lives beyond the repository.
            </p>
          </Reveal>

          {/* HUD meta line */}
          <Reveal
            delay={0.15}
            className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.68rem] text-fg-dim"
          >
            <span>{String(TIMELINE.length).padStart(2, '0')} MILESTONES</span>
            <span className="text-line-strong">/</span>
            <span>
              {EARLIEST_YEAR}&ndash;{LATEST_YEAR}
            </span>
            <span className="text-line-strong">/</span>
            <span>03 CATEGORIES</span>
          </Reveal>

          {/* legend */}
          <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="eyebrow">Legend</span>
            {LEGEND_ORDER.map((c) => (
              <span key={c} className="inline-flex items-center gap-2">
                <CategoryTag category={c} />
                <span className="font-mono text-[0.62rem] text-fg-dim">&times;{COUNTS[c]}</span>
              </span>
            ))}
          </Reveal>
        </div>

        {/* ---------------- timeline ---------------- */}
        <div ref={frame} className="relative mt-16 md:mt-24">
          {/* spine: faint track + scrubbed progress fill */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-[7px] w-px -translate-x-1/2 md:left-1/2"
          >
            <div className="absolute inset-0 bg-line-strong" />
            <div
              ref={progress}
              className="absolute inset-0 origin-top bg-gradient-to-b from-signal-bright via-signal to-cloud"
            />
          </div>

          {/* travelling head of the progress line */}
          <span
            ref={head}
            aria-hidden
            className="pointer-events-none absolute left-[7px] top-0 z-20 flex h-4 w-4 items-center justify-center md:left-1/2"
          >
            <span className="absolute h-4 w-4 rounded-full bg-signal/25 blur-[2px]" />
            <span className="h-2 w-2 rounded-full bg-signal-bright shadow-[0_0_12px_rgba(122,240,255,0.9)]" />
          </span>

          <ol className="relative space-y-12 md:space-y-16">
            {TIMELINE.map((award, i) => (
              <TimelineItem key={award.id} award={award} index={i} />
            ))}
          </ol>

          {/* terminal cap — guarantees end padding + a clean spine close */}
          <div aria-hidden className="relative mt-6 h-16">
            <span className="absolute left-[7px] top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-1/2">
              <span className="block h-2.5 w-2.5 rotate-45 border border-line-strong bg-ink-900" />
            </span>
            <span className="absolute left-[28px] top-1/2 -translate-y-1/2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-fg-dim md:left-1/2 md:ml-5">
              Est. {EARLIEST_YEAR}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
