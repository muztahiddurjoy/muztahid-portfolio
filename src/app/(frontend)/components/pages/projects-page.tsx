'use client'

import { useMemo, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import {
  projectTypeMeta,
  type Project,
  type ProjectType,
  type ProjectsPageData,
} from '@/lib/portfolio-data'
import { Reveal } from '../ui/reveal'
import { AnimatedHeading } from '../ui/animated-heading'
import { ImageFrame } from '../ui/image-frame'
import { AmbientBackground } from '../ui/ambient-background'
import { Eyebrow, Tag } from '../ui/primitives'
import { TransitionLink } from '../ui/transition-link'
import { usePreview } from '../preview-context'

type TypeFilter = 'all' | ProjectType
type View = 'curated' | 'recent' | 'featured'

// A sortable timestamp for the "Recent" view: prefer the explicit ISO date,
// fall back to the first 4-digit year in the (possibly ranged) year string,
// else 0 so undated projects sink to the bottom rather than jumping the queue.
const recencyOf = (p: Project): number => {
  if (p.date) {
    const t = Date.parse(p.date)
    if (!Number.isNaN(t)) return t
  }
  const m = p.year.match(/\d{4}/)
  if (m) {
    const t = Date.parse(`${m[0]}-01-01`)
    if (!Number.isNaN(t)) return t
  }
  return 0
}

// background-clip animated underline that grows on row hover/focus (theme-aware,
// uses currentColor so it works across all 12 palettes)
const underlineGrow =
  'bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_1.5px] [background-position:0_100%] transition-[background-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1.5px] group-focus-visible:bg-[length:100%_1.5px]'

export default function ProjectsPage({
  projects,
  chrome,
}: {
  projects: Project[]
  chrome: ProjectsPageData
}) {
  const isPreview = usePreview()
  const [view, setView] = useState<View>('curated')
  const [type, setType] = useState<TypeFilter>('all')
  const listRef = useRef<HTMLUListElement | null>(null)

  const total = String(projects.length).padStart(2, '0')

  const views: { key: View; label: string }[] = [
    { key: 'curated', label: chrome.curatedLabel },
    { key: 'recent', label: chrome.recentLabel },
    { key: 'featured', label: chrome.featuredLabel },
  ]

  const typeFilters: { key: TypeFilter; label: string }[] = [
    { key: 'all', label: chrome.allLabel },
    ...(Object.entries(projectTypeMeta) as [ProjectType, { label: string }][]).map(
      ([key, meta]) => ({ key, label: meta.label }),
    ),
  ]

  // Compose view + type. Featured narrows the set; Recent re-sorts by recency;
  // Curated keeps the editor's order (projects arrive pre-sorted by order/year).
  const filtered = useMemo(() => {
    let list = projects
    if (view === 'featured') list = list.filter((p) => p.featured)
    if (type !== 'all') list = list.filter((p) => p.type === type)
    if (view === 'recent') list = [...list].sort((a, b) => recencyOf(b) - recencyOf(a))
    return list
  }, [projects, view, type])

  // Soft re-stagger of the rows whenever the view/filter changes. The list is
  // re-keyed so React remounts the rows; this effect then fades them up.
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
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.09,
      })
    }, listRef)
    return () => ctx.revert()
  }, [view, type, isPreview])

  const reset = () => {
    setView('curated')
    setType('all')
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
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              {chrome.intro}
            </p>
            <p className="shrink-0 font-script text-3xl leading-none text-muted-foreground md:text-4xl">
              {total} {chrome.countNoun}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Controls + List ---------------- */}
      <section className="container-page pb-20 md:pb-28" aria-label="Projects">
        <Reveal>
          <div className="flex flex-col gap-5 border-y border-border py-6">
            {/* view: curated / recent / featured */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3" role="group" aria-label="Project view">
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

            {/* type chips */}
            <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter projects by type">
              {typeFilters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setType(f.key)}
                  data-cursor
                  aria-pressed={type === f.key}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm tracking-tight transition-all duration-300',
                    type === f.key
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground',
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* rows */}
        {filtered.length === 0 ? (
          <EmptyState view={view} onReset={reset} chrome={chrome} />
        ) : (
          <ul key={`${view}-${type}`} ref={listRef} className="list-none">
            {filtered.map((v, i) => (
              <li key={v.slug}>
                <ProjectRow project={v} index={i} chrome={chrome} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

/* ---------------- Project row ---------------- */
function ProjectRow({
  project: v,
  index,
  chrome,
}: {
  project: Project
  index: number
  chrome: ProjectsPageData
}) {
  const flip = index % 2 === 1
  const num = String(index + 1).padStart(2, '0')

  return (
    <TransitionLink
      href={`/projects/${v.slug}`}
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
            src={v.cover.image}
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
                {chrome.featuredBadge}
              </span>
            )}
          </div>

          <div className="mt-5">
            <Tag>{projectTypeMeta[v.type].label}</Tag>
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
            <span className={cn('inline', underlineGrow)}>{chrome.rowCtaLabel}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1" />
          </span>
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
  chrome: ProjectsPageData
}) {
  const message =
    view === 'featured' ? chrome.emptyMessageFeatured : chrome.emptyMessageDefault
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
