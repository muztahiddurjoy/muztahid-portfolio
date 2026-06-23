'use client'

import { useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import { projectTypeMeta, type Project, type ProjectPageData } from '@/lib/portfolio-data'
import { AnimatedHeading } from '../ui/animated-heading'
import { Reveal } from '../ui/reveal'
import { Magnetic } from '../ui/magnetic'
import { Eyebrow, Tag, CountUp, Signature } from '../ui/primitives'
import { ImageFrame } from '../ui/image-frame'
import { TransitionLink } from '../ui/transition-link'
import { GithubIcon } from '../ui/brand-icons'
import { usePreview } from '../preview-context'

/* small dot separator for meta rows */
function Dot() {
  return <span aria-hidden className="h-1 w-1 rounded-full bg-border-strong" />
}

/* Render a metric value: count up when it starts with a digit, else the string. */
function MetricValue({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^(\d+)(.*)$/)
  if (match) {
    return <CountUp value={parseInt(match[1], 10)} suffix={match[2]} className={className} />
  }
  return <span className={className}>{value}</span>
}

/* prev/next pager cell */
function PagerCell({
  project,
  dir,
  labels,
}: {
  project: Project
  dir: 'prev' | 'next'
  labels: ProjectPageData
}) {
  const isNext = dir === 'next'
  return (
    <TransitionLink
      href={`/projects/${project.slug}`}
      data-cursor
      className={cn(
        'group flex flex-col gap-3 p-8 transition-colors duration-500 hover:bg-elevated md:p-12',
        isNext ? 'sm:items-end sm:text-right' : 'sm:items-start',
      )}
    >
      <span className={cn('eyebrow inline-flex items-center gap-2', isNext && 'sm:flex-row-reverse')}>
        {isNext ? (
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        ) : (
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
        )}
        {isNext ? labels.pager.nextLabel : labels.pager.prevLabel}
      </span>
      <span className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.05] tracking-tight">
        {project.name}
      </span>
      <span className="eyebrow">{projectTypeMeta[project.type].label}</span>
    </TransitionLink>
  )
}

/* graceful fallback when there is no prev/next */
function PagerEnd({ dir, labels }: { dir: 'prev' | 'next'; labels: ProjectPageData }) {
  const isNext = dir === 'next'
  return (
    <TransitionLink
      href="/projects"
      data-cursor
      className={cn(
        'group flex flex-col gap-3 p-8 text-muted-foreground transition-colors duration-500 hover:bg-elevated md:p-12',
        isNext ? 'sm:items-end sm:text-right' : 'sm:items-start',
      )}
    >
      <span className="eyebrow">{isNext ? labels.pager.latestLabel : labels.pager.startLabel}</span>
      <span className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.05] tracking-tight text-foreground">
        {labels.pager.allProjectsLabel}
      </span>
      <span className="font-script text-lg">{labels.pager.allProjectsScript}</span>
    </TransitionLink>
  )
}

export default function ProjectDetail({
  project,
  prev,
  next,
  labels,
}: {
  project: Project
  prev: Project | null
  next: Project | null
  labels: ProjectPageData
}) {
  const scopeRef = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const isPreview = usePreview()

  // split the name so the final word carries an italic serif accent
  const words = project.name.trim().split(/\s+/)
  const lead = words.slice(0, -1).join(' ')
  const tail = words[words.length - 1]

  const headlineMetric = project.metrics.find((m) => m.proof) ?? project.metrics[0]
  const valueClass = 'font-display leading-none tracking-tight'

  // soft parallax drift on the cover — pure polish, final state shown without motion
  useIsoLayoutEffect(() => {
    const reduce = isPreview || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {
      const cover = coverRef.current
      if (!cover) return
      gsap.fromTo(
        cover,
        { yPercent: 4 },
        {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: cover,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      )
    }, scopeRef)
    return () => ctx.revert()
  }, [project.slug])

  return (
    <div ref={scopeRef} className="pt-28 md:pt-32">
      {/* ---------- back bar / breadcrumb ---------- */}
      <div className="container-page flex flex-wrap items-center justify-between gap-4 pb-10">
        <TransitionLink
          href="/projects"
          data-cursor
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span className="link-underline">{labels.pager.backLinkLabel}</span>
        </TransitionLink>
        <p className="eyebrow">
          projects <span className="mx-1 opacity-50">/</span> {projectTypeMeta[project.type].label}
        </p>
      </div>

      {/* ---------- hero ---------- */}
      <header className="container-page pb-16 md:pb-24">
        <Reveal y={16}>
          <Tag>{projectTypeMeta[project.type].label}</Tag>
        </Reveal>

        <h1 className="mt-7 max-w-[14ch] text-[clamp(2.6rem,7.5vw,6.5rem)] leading-[0.95]">
          {lead && <AnimatedHeading as="span" text={lead} immediate className="block" />}
          <AnimatedHeading
            as="span"
            text={tail}
            immediate
            delay={lead ? 0.12 : 0}
            wordClassName="display-italic"
            className="block"
          />
        </h1>

        <Reveal delay={0.15} className="mt-8 max-w-3xl">
          <p className="font-display text-[clamp(1.4rem,2.6vw,2.1rem)] leading-snug tracking-tight">
            {project.tagline}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
        </Reveal>

        {/* meta row */}
        <Reveal delay={0.22} y={16}>
          <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="text-foreground">{project.role}</span>
            <Dot />
            <span>{project.year}</span>
            <Dot />
            <span>{project.status}</span>
          </div>
        </Reveal>

        {/* stack + links */}
        <Reveal delay={0.28} y={16}>
          <div className="mt-10 flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
            <div>
              <Signature className="text-lg text-muted-foreground">{labels.caseStudy.builtWithLabel}</Signature>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>

            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => {
                  const isGithub = /github/i.test(link.label) || /github/i.test(link.url)
                  return (
                    <Magnetic key={link.url} strength={0.3}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor
                        className="btn-inverse group/cta inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight"
                      >
                        {isGithub && <GithubIcon className="h-4 w-4" />}
                        <span>{link.label}</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                      </a>
                    </Magnetic>
                  )
                })}
              </div>
            )}
          </div>
        </Reveal>

        {/* cover */}
        <Reveal delay={0.1} className="mt-14">
          <div ref={coverRef} className="will-change-transform">
            <ImageFrame
              label={project.cover.label}
              caption={project.cover.caption}
              src={project.cover.image}
              ratio="aspect-[16/9]"
            />
          </div>
        </Reveal>
      </header>

      {/* ---------- metrics ---------- */}
      <section aria-label="Key metrics" className="border-y border-border bg-elevated">
        <div className="container-page py-4">
          <Reveal>
            <div className="grid grid-cols-2 border-l border-t border-border md:grid-cols-4">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="border-b border-r border-border px-6 py-8 md:px-8 md:py-10"
                >
                  <MetricValue
                    value={metric.value}
                    className={cn(valueClass, 'block text-[clamp(2rem,4vw,3.25rem)]')}
                  />
                  <p className="eyebrow mt-3">{metric.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- body / case study ---------- */}
      <article className="container-prose py-24 md:py-32">
        {/* 01 — vision */}
        <Reveal as="section">
          <Eyebrow index="01">{labels.caseStudy.visionLabel}</Eyebrow>
          <p className="mt-6 font-display text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.35] tracking-tight">
            {project.vision}
          </p>
        </Reveal>

        {/* 02 — problem */}
        <Reveal as="section" className="mt-20 md:mt-28">
          <Eyebrow index="02">{labels.caseStudy.problemLabel}</Eyebrow>
          <p className="mt-6 text-lg leading-relaxed text-foreground/90 md:text-xl">
            {project.problem}
          </p>
        </Reveal>

        {/* 03 — what I built */}
        <Reveal as="section" className="mt-20 md:mt-28">
          <Eyebrow index="03">{labels.caseStudy.buildLabel}</Eyebrow>
          <ol className="mt-8 border-t border-border">
            {project.build.map((step, i) => (
              <li
                key={i}
                className="flex flex-col gap-3 border-b border-border py-7 sm:flex-row sm:gap-8"
              >
                <span className="font-script text-3xl leading-none text-muted-foreground sm:pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-lg leading-relaxed text-foreground/90">{step}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* 04 — outcome */}
        <Reveal as="section" className="mt-20 md:mt-28">
          <Eyebrow index="04">{labels.caseStudy.outcomeLabel}</Eyebrow>
          <p className="mt-6 text-lg leading-relaxed text-foreground/90 md:text-xl">
            {project.outcome}
          </p>

          {headlineMetric && (
            <div className="mt-10 overflow-hidden rounded-[var(--radius-xl)] bg-foreground p-8 text-background md:p-12">
              <Signature className="text-lg text-background/60">{labels.caseStudy.proofLabel}</Signature>
              <div className="mt-3 font-display text-[clamp(3rem,8vw,5.5rem)] leading-none tracking-tight">
                {headlineMetric.value}
              </div>
              <p className="mt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-background/60">
                {headlineMetric.label}
              </p>
            </div>
          )}
        </Reveal>
      </article>

      {/* ---------- gallery ---------- */}
      {project.gallery.length > 0 && (
        <section aria-label="Gallery" className="border-t border-border bg-card">
          <div className="container-page py-24 md:py-32">
            <Reveal>
              <Eyebrow index="05">{labels.caseStudy.galleryLabel}</Eyebrow>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {project.gallery.map((shot, i) => (
                <Reveal key={shot.label + i} delay={i * 0.08}>
                  <ImageFrame
                    label={shot.label}
                    caption={shot.caption}
                    src={shot.image || undefined}
                    ratio="aspect-[4/3]"
                    index={String(i + 1).padStart(2, '0')}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- prev / next pager ---------- */}
      <nav
        aria-label="More projects"
        className="grid divide-y divide-border border-t border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0"
      >
        {prev ? <PagerCell project={prev} dir="prev" labels={labels} /> : <PagerEnd dir="prev" labels={labels} />}
        {next ? <PagerCell project={next} dir="next" labels={labels} /> : <PagerEnd dir="next" labels={labels} />}
      </nav>
    </div>
  )
}
