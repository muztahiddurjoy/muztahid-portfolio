'use client'

import { useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import {
  sessionModeMeta,
  sessionFormatMeta,
  sessionLevelMeta,
  sessionAvailabilityMeta,
  type Session,
  type SessionPageData,
} from '@/lib/portfolio-data'
import { AnimatedHeading } from '../ui/animated-heading'
import { Reveal } from '../ui/reveal'
import { Magnetic } from '../ui/magnetic'
import { Eyebrow, Tag, Signature } from '../ui/primitives'
import { ImageFrame } from '../ui/image-frame'
import { TransitionLink } from '../ui/transition-link'
import { Icon, type IconName } from '../ui/lucide-icon'
import { usePreview } from '../preview-context'
import { SessionBooking } from './session-booking'

/* small dot separator for meta rows */
function Dot() {
  return <span aria-hidden className="h-1 w-1 rounded-full bg-border-strong" />
}

/* one cell in the logistics grid (only rendered when it has a value) */
function LogisticsCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-r border-border px-6 py-7 md:px-8 md:py-8">
      <p className="eyebrow">{label}</p>
      <div className="mt-3 font-display text-[clamp(1.05rem,1.8vw,1.5rem)] leading-tight tracking-tight">
        {children}
      </div>
    </div>
  )
}

/* prev/next pager cell */
function PagerCell({
  session,
  dir,
  labels,
}: {
  session: Session
  dir: 'prev' | 'next'
  labels: SessionPageData
}) {
  const isNext = dir === 'next'
  return (
    <TransitionLink
      href={`/sessions/${session.slug}`}
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
        {session.title}
      </span>
      <span className="eyebrow">{sessionFormatMeta[session.format].label}</span>
    </TransitionLink>
  )
}

/* graceful fallback when there is no prev/next */
function PagerEnd({ dir, labels }: { dir: 'prev' | 'next'; labels: SessionPageData }) {
  const isNext = dir === 'next'
  return (
    <TransitionLink
      href="/sessions"
      data-cursor
      className={cn(
        'group flex flex-col gap-3 p-8 text-muted-foreground transition-colors duration-500 hover:bg-elevated md:p-12',
        isNext ? 'sm:items-end sm:text-right' : 'sm:items-start',
      )}
    >
      <span className="eyebrow">{isNext ? labels.pager.latestLabel : labels.pager.startLabel}</span>
      <span className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.05] tracking-tight text-foreground">
        {labels.pager.allLabel}
      </span>
      <span className="font-script text-lg">{labels.pager.allScript}</span>
    </TransitionLink>
  )
}

export default function SessionDetail({
  session,
  prev,
  next,
  labels,
  siteEmail,
}: {
  session: Session
  prev: Session | null
  next: Session | null
  labels: SessionPageData
  siteEmail: string
}) {
  const scopeRef = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const isPreview = usePreview()
  const D = labels.detail

  const modeMeta = sessionModeMeta[session.mode]
  const { logistics: log } = session

  // split the title so the final word carries an italic serif accent
  const words = session.title.trim().split(/\s+/)
  const lead = words.slice(0, -1).join(' ')
  const tail = words[words.length - 1] ?? session.title

  // Body sections are optional — only the populated ones render, numbered in order.
  const bodySections = [
    session.audience && { label: D.audienceLabel, kind: 'audience' as const },
    session.highlights.length && { label: D.highlightsLabel, kind: 'highlights' as const },
    session.agenda.length && { label: D.agendaLabel, kind: 'agenda' as const },
    session.prerequisites.length && { label: D.prerequisitesLabel, kind: 'prerequisites' as const },
  ].filter(Boolean) as { label: string; kind: string }[]

  // soft parallax drift on the cover — pure polish, final state shown without motion
  useIsoLayoutEffect(() => {
    if (isPreview || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const cover = coverRef.current
      if (!cover) return
      gsap.fromTo(
        cover,
        { yPercent: 4 },
        {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: { trigger: cover, start: 'top bottom', end: 'bottom top', scrub: 1 },
        },
      )
    }, scopeRef)
    return () => ctx.revert()
  }, [session.slug])

  return (
    <div ref={scopeRef} className="pt-28 md:pt-32">
      {/* ---------- back bar / breadcrumb ---------- */}
      <div className="container-page flex flex-wrap items-center justify-between gap-4 pb-10">
        <TransitionLink
          href="/sessions"
          data-cursor
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span className="link-underline">{labels.pager.backLinkLabel}</span>
        </TransitionLink>
        <p className="eyebrow">
          sessions <span className="mx-1 opacity-50">/</span> {sessionFormatMeta[session.format].label}
        </p>
      </div>

      {/* ---------- hero ---------- */}
      <header className="container-page pb-16 md:pb-24">
        <Reveal y={16}>
          <div className="flex flex-wrap items-center gap-2">
            <Tag>{sessionFormatMeta[session.format].label}</Tag>
            <Tag>{sessionLevelMeta[session.level].label}</Tag>
          </div>
        </Reveal>

        <h1 className="mt-7 max-w-[16ch] text-[clamp(2.4rem,7vw,6rem)] leading-[0.95]">
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
            {session.tagline}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{session.summary}</p>
        </Reveal>

        {/* meta row */}
        <Reveal delay={0.22} y={16}>
          <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 text-foreground">
              <Icon name={modeMeta.icon as IconName} className="h-4 w-4" />
              {modeMeta.label}
            </span>
            {log.duration && (
              <>
                <Dot />
                <span>{log.duration}</span>
              </>
            )}
            {log.price && (
              <>
                <Dot />
                <span>{log.price}</span>
              </>
            )}
            <Dot />
            <span>{sessionAvailabilityMeta[session.availability].label}</span>
          </div>
        </Reveal>

        {/* topics + primary CTA */}
        <Reveal delay={0.28} y={16}>
          <div className="mt-10 flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
            {session.topics.length > 0 && (
              <div>
                <Signature className="text-lg text-muted-foreground">{D.topicsLabel}</Signature>
                <div className="mt-3 flex flex-wrap gap-2">
                  {session.topics.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            )}

            <Magnetic strength={0.3}>
              <a
                href="#book"
                data-cursor
                className="btn-inverse group/cta inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight"
              >
                <span>{labels.booking.eyebrow}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
              </a>
            </Magnetic>
          </div>
        </Reveal>

        {/* cover */}
        <Reveal delay={0.1} className="mt-14">
          <div ref={coverRef} className="will-change-transform">
            <ImageFrame
              label={session.cover.label}
              caption={session.cover.caption}
              src={session.cover.image}
              ratio="aspect-[16/9]"
            />
          </div>
        </Reveal>
      </header>

      {/* ---------- logistics ---------- */}
      <section aria-label={D.logisticsLabel} className="border-y border-border bg-elevated">
        <div className="container-page py-4">
          <Reveal>
            <p className="eyebrow pt-6">{D.logisticsLabel}</p>
            <div className="mt-6 grid grid-cols-2 border-l border-t border-border md:grid-cols-3">
              {log.duration && <LogisticsCell label={D.durationLabel}>{log.duration}</LogisticsCell>}
              {log.price && <LogisticsCell label={D.priceLabel}>{log.price}</LogisticsCell>}
              {log.capacity && <LogisticsCell label={D.capacityLabel}>{log.capacity}</LogisticsCell>}
              <LogisticsCell label={D.modeLabel}>
                <span className="inline-flex items-center gap-2">
                  <Icon name={modeMeta.icon as IconName} className="h-[1.1em] w-[1.1em]" />
                  {modeMeta.label}
                </span>
              </LogisticsCell>
              {log.location && <LogisticsCell label={D.locationLabel}>{log.location}</LogisticsCell>}
              {log.languages.length > 0 && (
                <LogisticsCell label={D.languagesLabel}>{log.languages.join(', ')}</LogisticsCell>
              )}
              <LogisticsCell label={D.availabilityLabel}>
                {sessionAvailabilityMeta[session.availability].label}
              </LogisticsCell>
            </div>
            {log.deliveryNote && (
              <p className="mt-5 max-w-2xl pb-6 text-sm leading-relaxed text-muted-foreground">
                {log.deliveryNote}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------- body ---------- */}
      {bodySections.length > 0 && (
        <article className="container-prose py-24 md:py-32">
          {bodySections.map((sec, i) => {
            const idx = String(i + 1).padStart(2, '0')
            const spacing = i === 0 ? '' : 'mt-20 md:mt-28'
            if (sec.kind === 'audience') {
              return (
                <Reveal as="section" key={sec.kind} className={spacing}>
                  <Eyebrow index={idx}>{sec.label}</Eyebrow>
                  <p className="mt-6 font-display text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.35] tracking-tight">
                    {session.audience}
                  </p>
                </Reveal>
              )
            }
            if (sec.kind === 'highlights') {
              return (
                <Reveal as="section" key={sec.kind} className={spacing}>
                  <Eyebrow index={idx}>{sec.label}</Eyebrow>
                  <ul className="mt-8 border-t border-border">
                    {session.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-4 border-b border-border py-6">
                        <Check className="mt-1 h-5 w-5 shrink-0 text-foreground" />
                        <p className="text-lg leading-relaxed text-foreground/90">{h}</p>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )
            }
            if (sec.kind === 'agenda') {
              return (
                <Reveal as="section" key={sec.kind} className={spacing}>
                  <Eyebrow index={idx}>{sec.label}</Eyebrow>
                  <ol className="mt-8 border-t border-border">
                    {session.agenda.map((step, si) => (
                      <li key={si} className="flex flex-col gap-3 border-b border-border py-7 sm:flex-row sm:gap-8">
                        <span className="font-script text-3xl leading-none text-muted-foreground sm:pt-1">
                          {String(si + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className="font-display text-xl leading-tight tracking-tight">{step.title}</p>
                          {step.detail && (
                            <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{step.detail}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              )
            }
            // prerequisites
            return (
              <Reveal as="section" key={sec.kind} className={spacing}>
                <Eyebrow index={idx}>{sec.label}</Eyebrow>
                <ul className="mt-8 flex flex-col gap-3">
                  {session.prerequisites.map((p, pi) => (
                    <li key={pi} className="flex items-start gap-3 text-lg leading-relaxed text-foreground/90">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border-strong" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </article>
      )}

      {/* ---------- FAQs ---------- */}
      {session.faqs.length > 0 && (
        <section aria-label={D.faqLabel} className="border-t border-border bg-card">
          <div className="container-prose py-24 md:py-32">
            <Reveal>
              <Eyebrow>{D.faqLabel}</Eyebrow>
            </Reveal>
            <div className="mt-8 border-t border-border">
              {session.faqs.map((f, fi) => (
                <Reveal key={fi} delay={fi * 0.05}>
                  <details className="group border-b border-border py-6">
                    <summary
                      data-cursor
                      className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium tracking-tight marker:hidden"
                    >
                      {f.question}
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border-strong transition-transform duration-300 group-open:rotate-45">
                        <span aria-hidden className="text-lg leading-none">+</span>
                      </span>
                    </summary>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{f.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- testimonials ---------- */}
      {session.testimonials.length > 0 && (
        <section aria-label={D.testimonialsLabel} className="border-t border-border">
          <div className="container-page py-24 md:py-32">
            <Reveal>
              <Eyebrow>{D.testimonialsLabel}</Eyebrow>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {session.testimonials.map((t, ti) => (
                <Reveal key={ti} delay={ti * 0.08}>
                  <figure className="flex h-full flex-col justify-between rounded-[var(--radius-xl)] border border-border bg-card p-8 md:p-10">
                    <blockquote className="font-display text-[clamp(1.3rem,2.2vw,1.7rem)] leading-snug tracking-tight">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-7 flex items-baseline gap-3">
                      <span className="font-script text-2xl leading-none">{t.author}</span>
                      {t.role && <span className="eyebrow">{t.role}</span>}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- booking ---------- */}
      <SessionBooking session={session} labels={labels} siteEmail={siteEmail} />

      {/* ---------- prev / next pager ---------- */}
      <nav
        aria-label="More sessions"
        className="grid divide-y divide-border border-t border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0"
      >
        {prev ? <PagerCell session={prev} dir="prev" labels={labels} /> : <PagerEnd dir="prev" labels={labels} />}
        {next ? <PagerCell session={next} dir="next" labels={labels} /> : <PagerEnd dir="next" labels={labels} />}
      </nav>
    </div>
  )
}
