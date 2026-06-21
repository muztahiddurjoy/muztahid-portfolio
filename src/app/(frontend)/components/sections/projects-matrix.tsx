'use client'

import { useRef, useState, type CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import { projects, categoryMeta, type Category, type Project } from '@/lib/portfolio-data'
import { AnimatedHeading } from '../ui/animated-heading'
import { Reveal } from '../ui/reveal'
import { SectionLabel, TechChip } from '../ui/primitives'
import { CtaButton } from '../ui/cta-button'
import { TransitionLink } from '../ui/transition-link'
import { Icon } from '../ui/lucide-icon'

/* ------------------------------------------------------------------ */
/*  Static derivations (single-pass, module scope)                     */
/* ------------------------------------------------------------------ */

type FilterKey = 'all' | Category

const pad = (n: number) => String(n).padStart(2, '0')

const categoryCounts = projects.reduce(
  (acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1
    return acc
  },
  {} as Record<Category, number>,
)

const FILTERS: { key: FilterKey; label: string; short: string; hex: string; count: number }[] = [
  { key: 'all', label: 'All Systems', short: 'All', hex: '#46e3ff', count: projects.length },
  ...(Object.keys(categoryMeta) as Category[]).map((c) => ({
    key: c as FilterKey,
    label: categoryMeta[c].label,
    short: categoryMeta[c].short,
    hex: categoryMeta[c].hex,
    count: categoryCounts[c] ?? 0,
  })),
]

/* ================================================================== */
/*  ProjectsMatrix — "The Core Engine" (FR-2)                          */
/* ================================================================== */

export default function ProjectsMatrix() {
  const [filter, setFilter] = useState<FilterKey>('all')

  const gridRef = useRef<HTMLDivElement>(null)
  const revealed = useRef(false)

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  // Re-runs on every filter change (deps: [filter]); the grid is re-keyed so the
  // card nodes are fresh each pass. First pass reveals on scroll, subsequent
  // passes (filter switches) animate immediately since the user is already here.
  useIsoLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = grid.querySelectorAll<HTMLElement>('[data-card]')
    if (!cards.length) return

    const ctx = gsap.context(() => {
      if (!revealed.current) {
        revealed.current = true
        gsap.from(cards, {
          opacity: 0,
          y: 46,
          duration: 0.95,
          ease: 'expo.out',
          stagger: 0.07,
          clearProps: 'all',
          scrollTrigger: { trigger: grid, start: 'top 82%', once: true },
        })
      } else {
        gsap.from(cards, {
          opacity: 0,
          y: 28,
          scale: 0.985,
          duration: 0.6,
          ease: 'expo.out',
          stagger: 0.045,
          clearProps: 'all',
        })
      }
    }, gridRef)

    return () => ctx.revert()
  }, [filter])

  return (
    <section id="projects" className="relative overflow-hidden py-24 md:py-32">
      {/* ambient blueprint backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(82%_58%_at_50%_0%,#000_0%,transparent_72%)]" />
        <div
          className="absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
          style={{
            background:
              'radial-gradient(closest-side, rgba(70,227,255,0.10), rgba(143,123,255,0.05), transparent)',
          }}
        />
      </div>

      <div className="container-x">
        {/* ---------------- header ---------------- */}
        <header className="flex flex-col gap-8">
          <Reveal>
            <SectionLabel index="01">Projects Matrix</SectionLabel>
          </Reveal>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
                <AnimatedHeading as="span" text="Systems I have" className="block" />
                <AnimatedHeading
                  as="span"
                  text="shipped to the field."
                  delay={0.08}
                  className="block"
                  wordClassName="text-signal-gradient"
                />
              </h2>
              <Reveal
                as="p"
                delay={0.12}
                className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-fg-muted md:text-lg"
              >
                A cross-section of what I have designed, built, and run in production — autonomous
                navigation stacks, multi-tenant backends, and the real-time firmware in between.
                Filter by discipline; every tile opens a full case study.
              </Reveal>
            </div>

            <Reveal delay={0.16} className="shrink-0">
              <div className="flex items-end gap-3 font-mono text-xs text-fg-dim">
                <span className="font-display text-4xl font-semibold leading-none text-fg md:text-5xl">
                  {pad(projects.length)}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-signal">/ built</span>
                  <span>&amp; documented</span>
                </span>
              </div>
            </Reveal>
          </div>
        </header>

        {/* ---------------- filter bar ---------------- */}
        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-col gap-4 border-y border-line py-4 md:flex-row md:items-center md:justify-between">
            <div
              role="group"
              aria-label="Filter projects by engineering discipline"
              className="flex flex-wrap items-center gap-2.5"
            >
              {FILTERS.map((f) => {
                const active = filter === f.key
                return (
                  <button
                    key={f.key}
                    type="button"
                    data-cursor
                    aria-pressed={active}
                    onClick={() => setFilter(f.key)}
                    className={cn(
                      'group/f inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs tracking-wide transition-all duration-300',
                      active
                        ? 'text-fg'
                        : 'border-line text-fg-muted hover:border-line-strong hover:text-fg',
                    )}
                    style={
                      active
                        ? {
                            color: f.hex,
                            borderColor: `${f.hex}59`,
                            backgroundColor: `${f.hex}12`,
                            boxShadow: `0 0 28px -10px ${f.hex}80`,
                          }
                        : undefined
                    }
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full transition-transform duration-300"
                      style={{
                        backgroundColor: active ? f.hex : 'currentColor',
                        transform: active ? 'scale(1)' : 'scale(0.65)',
                      }}
                    />
                    <span className="hidden md:inline">{f.label}</span>
                    <span className="md:hidden">{f.short}</span>
                    <span className={cn('tabular-nums text-[0.65rem]', active ? 'opacity-70' : 'opacity-45')}>
                      {pad(f.count)}
                    </span>
                  </button>
                )
              })}
            </div>

            <p
              aria-live="polite"
              className="font-mono text-xs text-fg-dim md:text-right"
            >
              <span className="text-signal">// </span>
              showing {pad(filtered.length)} of {pad(projects.length)} systems
            </p>
          </div>
        </Reveal>

        {/* ---------------- grid / empty ---------------- */}
        {filtered.length === 0 ? (
          <div className="mt-10 flex min-h-[220px] flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-line-strong bg-ink-900/40 p-10 text-center">
            <Icon name="Terminal" aria-hidden className="h-6 w-6 text-fg-dim" />
            <p className="mt-4 font-mono text-sm text-fg-dim">
              // no projects in this category yet
            </p>
            <button
              type="button"
              data-cursor
              onClick={() => setFilter('all')}
              className="mt-3 font-mono text-xs text-signal underline-offset-4 hover:underline"
            >
              reset filter →
            </button>
          </div>
        ) : (
          <div
            key={filter}
            ref={gridRef}
            className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
          >
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i + 1}
                wide={p.featured && filtered.length > 1}
              />
            ))}
          </div>
        )}

        {/* ---------------- footer note ---------------- */}
        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs leading-relaxed text-fg-dim">
            <span className="text-signal">//</span> each tile opens a full case study — problem,
            architecture, code &amp; measured results.
          </p>
          <CtaButton href="/projects/autonomous-navigation-rover" variant="ghost" icon="arrow-up">
            Open featured case study
          </CtaButton>
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  ProjectCard                                                        */
/* ================================================================== */

function ProjectCard({
  project,
  index,
  wide,
}: {
  project: Project
  index: number
  wide: boolean
}) {
  const meta = categoryMeta[project.category]
  const accent = meta.hex
  const techShown = project.tech.slice(0, 6)
  const overflow = project.tech.length - techShown.length

  // pointer-follow spotlight — writes CSS vars directly (no re-render)
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div data-card className={cn('h-full', wide && 'md:col-span-2')}>
      <TransitionLink
        href={`/projects/${project.slug}`}
        data-cursor
        data-cursor-label="Case study"
        onMouseMove={handleMove}
        aria-label={`${project.title} — ${meta.label} case study`}
        style={{ '--card-accent': accent } as CSSProperties}
        className="group/card surface relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line p-6 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-line-strong focus-visible:-translate-y-1.5 md:p-7"
      >
        {/* pointer spotlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background: `radial-gradient(440px circle at var(--mx,50%) var(--my,50%), ${accent}14, transparent 62%)`,
          }}
        />
        {/* top accent hairline (wipes in on hover) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-x-100"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
        {/* signal glow on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{ boxShadow: `0 28px 80px -34px ${accent}5e, inset 0 0 0 1px ${accent}26` }}
        />

        {/* corner arrow */}
        <span
          aria-hidden
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-muted transition-colors duration-500 group-hover/card:border-[color:var(--card-accent)] group-hover/card:text-[color:var(--card-accent)]"
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
        </span>

        {/* index · year */}
        <div className="relative z-10 flex items-center gap-3 font-mono text-xs text-fg-dim">
          <span className="text-[color:var(--card-accent)]">{pad(index)}</span>
          <span className="h-px w-6 bg-line-strong" />
          <span>{project.year}</span>
        </div>

        {/* category chip + featured tag */}
        <div className="relative z-10 mt-5 flex flex-wrap items-center gap-2.5">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider"
            style={{ color: accent, borderColor: `${accent}40`, backgroundColor: `${accent}12` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
            {meta.short}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-fg-dim">
              <span className="h-1 w-1 rounded-full bg-fg-dim" />
              Featured
            </span>
          )}
        </div>

        {/* title + subtitle */}
        <h3
          className={cn(
            'relative z-10 mt-4 max-w-[18ch] pr-10 font-display font-semibold tracking-[-0.01em] text-fg',
            wide ? 'text-[1.5rem] md:text-[1.9rem]' : 'text-xl md:text-[1.35rem]',
          )}
        >
          {project.title}
        </h3>
        <p className="relative z-10 mt-1.5 font-mono text-xs text-fg-dim">{project.subtitle}</p>

        {/* summary */}
        <p
          className={cn(
            'relative z-10 mt-3 text-sm leading-relaxed text-fg-muted',
            wide ? 'line-clamp-3 max-w-2xl' : 'line-clamp-2',
          )}
        >
          {project.summary}
        </p>

        {/* featured-only key-metric strip — fills the wider bento tile */}
        {wide && (
          <dl className="relative z-10 mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-4 sm:grid-cols-4">
            {project.keyMetrics.slice(0, 4).map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[0.62rem] uppercase tracking-wider text-fg-dim">
                  {m.label}
                </dt>
                <dd className="mt-0.5 font-display text-lg font-semibold text-fg">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* stack zone — reserved height, no layout shift on reveal */}
        <div className="relative z-10 mt-auto pt-6">
          <div className="relative h-[3.5rem] overflow-hidden">
            {/* resting: dim mono stack list (desktop only, hidden from SR) */}
            <p
              aria-hidden
              className="absolute inset-0 hidden font-mono text-[0.7rem] leading-relaxed text-fg-dim transition-all duration-500 group-hover/card:-translate-y-1 group-hover/card:opacity-0 md:block"
            >
              <span className="text-fg-muted">STACK</span> // {project.tech.join(' · ')}
            </p>
            {/* revealed: real tech chips (always visible ≤md; hover/focus on md+) */}
            <ul className="absolute inset-0 flex flex-wrap content-start gap-1.5 transition-all duration-500 md:translate-y-2 md:opacity-0 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100 md:group-focus-visible/card:translate-y-0 md:group-focus-visible/card:opacity-100">
              {techShown.map((t) => (
                <li key={t}>
                  <TechChip>{t}</TechChip>
                </li>
              ))}
              {overflow > 0 && (
                <li>
                  <TechChip>+{overflow}</TechChip>
                </li>
              )}
            </ul>
          </div>

          {/* success metric (always shown; goes signal on touch + on hover) + cta */}
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3.5">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-signal transition-colors duration-300 md:text-fg-muted md:group-hover/card:text-signal">
              <Icon name="Zap" aria-hidden className="h-3.5 w-3.5 shrink-0" />
              {project.successMetric}
            </span>
            <span className="hidden shrink-0 items-center gap-1 font-mono text-[0.7rem] uppercase tracking-wider text-fg-dim transition-colors duration-300 group-hover/card:text-fg sm:inline-flex">
              Case study
              <ArrowUpRight aria-hidden className="h-3 w-3" />
            </span>
          </div>
        </div>
      </TransitionLink>
    </div>
  )
}
