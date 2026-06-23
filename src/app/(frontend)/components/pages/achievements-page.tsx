'use client'

import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import {
  achievementTypeMeta,
  type Achievement,
  type AchievementType,
  type AchievementsPageData,
} from '@/lib/portfolio-data'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { Reveal } from '../ui/reveal'
import { AnimatedHeading } from '../ui/animated-heading'
import { Eyebrow, Tag, CountUp, Signature, AccentText } from '../ui/primitives'
import { CtaButton } from '../ui/cta-button'
import { Icon, type IconName } from '../ui/lucide-icon'
import { usePreview } from '../preview-context'

/* ---- derived, static (data is hardcoded) ---- */

const typeIcon: Record<AchievementType, IconName> = {
  award: 'Trophy',
  competition: 'Award',
  leadership: 'Users',
  milestone: 'Rocket',
}

const typeOrder: AchievementType[] = ['award', 'competition', 'leadership', 'milestone']

/* ---- small featured highlight card (paper) ---- */
function FeaturedHighlight({ a }: { a: Achievement }) {
  return (
    <article className="group flex h-full flex-col rounded-[var(--radius-xl)] border border-border bg-card p-7 transition-colors duration-500 hover:border-border-strong md:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-strong transition-transform duration-500 group-hover:-translate-y-0.5">
          <Icon name={typeIcon[a.type]} className="h-5 w-5" />
        </span>
        <span className="eyebrow">{achievementTypeMeta[a.type].label}</span>
      </div>
      <h3 className="mt-7 font-display text-2xl tracking-tight md:text-[1.7rem]">{a.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {a.organization} · {a.dateLabel}
      </p>
      <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
        {a.description}
      </p>
    </article>
  )
}

export default function AchievementsPage({
  achievements,
  chrome,
}: {
  achievements: Achievement[]
  chrome: AchievementsPageData
}) {
  const isPreview = usePreview()
  const listRef = useRef<HTMLOListElement>(null)

  const featured = achievements.filter((a) => a.featured)

  const byDateDesc = [...achievements].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  )

  const totals = achievements.reduce<Record<AchievementType, number>>(
    (acc, a) => {
      acc[a.type] += 1
      return acc
    },
    { award: 0, competition: 0, leadership: 0, milestone: 0 },
  )

  const statItems = [
    { value: achievements.length, label: chrome.statLabels[0] ?? 'Milestones on the record' },
    { value: totals.award + totals.competition, label: chrome.statLabels[1] ?? 'Awards & competitions' },
    { value: totals.leadership, label: chrome.statLabels[2] ?? 'Leadership roles held' },
  ]

  // Soft reveal-from-side for the timeline rows. Initial hidden state is applied
  // only in the browser before paint, so content stays readable without JS.
  useIsoLayoutEffect(() => {
    const el = listRef.current
    if (!el) return
    const reduce = isPreview || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const rows = el.querySelectorAll<HTMLElement>('[data-tl-row]')
    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        gsap.set(row, { opacity: 0, x: -36 })
        gsap.to(row, {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
        })
      })
    }, listRef)
    return () => ctx.revert()
  }, [])

  const lead = featured[0]

  return (
    <main id="achievements" className="pt-28 md:pt-32">
      {/* ============ HERO ============ */}
      <section className="container-page pb-16 md:pb-20">
        <Reveal>
          <Eyebrow index="01">{chrome.eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="mt-7 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.98] tracking-tight">
          <AnimatedHeading as="span" text={[chrome.headingLineOne]} immediate className="block" />
          <AnimatedHeading
            as="span"
            text={[chrome.headingLineTwo]}
            immediate
            delay={0.12}
            wordClassName="display-italic"
            className="block"
          />
        </h1>

        <Reveal
          delay={0.18}
          className="mt-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            {chrome.lede}
          </p>
          <Signature className="shrink-0 text-2xl text-muted-foreground md:text-3xl">
            {chrome.signature}
          </Signature>
        </Reveal>
      </section>

      {/* ============ STATS BAND ============ */}
      <section className="container-page">
        <Reveal className="grid grid-cols-1 gap-8 border-y border-border py-10 sm:grid-cols-3 md:py-12">
          {statItems.map((s) => (
            <div key={s.label}>
              <p className="font-display text-5xl tracking-tight md:text-6xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ============ FEATURED HIGHLIGHTS ============ */}
      <section className="mt-24 border-y border-border bg-elevated py-24 md:mt-32 md:py-32">
        <div className="container-page">
          <Reveal>
            <Eyebrow index="02">{chrome.highlightsEyebrow}</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.04] tracking-tight">
              <AccentText text={chrome.highlightsHeading} accent={chrome.highlightsHeadingAccent} />
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              {chrome.highlightsBlurb}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:gap-6">
            {/* lead — WICE Gold, treated as an ink block */}
            {lead && (
              <Reveal>
                <article className="relative grid gap-8 overflow-hidden rounded-[var(--radius-xl)] border border-foreground bg-foreground p-8 text-background md:grid-cols-[0.85fr_1.15fr] md:gap-12 md:p-12">
                  <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-[0.06]" />
                  <div className="relative flex flex-col justify-between gap-10">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-background/25">
                      <Icon name={typeIcon[lead.type]} className="h-6 w-6" />
                    </span>
                    <div>
                      <Signature className="text-3xl text-background/55 md:text-4xl">
                        {chrome.leadScript}
                      </Signature>
                      <p className="mt-2 text-sm text-background/60">{lead.dateLabel}</p>
                    </div>
                  </div>

                  <div className="relative flex flex-col">
                    <span className="inline-flex w-fit items-center rounded-full border border-background/30 px-3 py-1 text-[0.78rem] tracking-tight text-background/80">
                      {achievementTypeMeta[lead.type].label}
                    </span>
                    <h3 className="mt-5 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-tight">
                      {lead.title}
                    </h3>
                    <p className="mt-3 text-sm text-background/70">{lead.organization}</p>
                    <p className="mt-5 max-w-xl leading-relaxed text-background/75">
                      {lead.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            )}

            {/* the two supporting highlights */}
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              {featured.slice(1, 3).map((a, i) => (
                <Reveal key={a.id} delay={0.06 + i * 0.08} className="h-full">
                  <FeaturedHighlight a={a} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FULL RECORD / TIMELINE ============ */}
      <section className="container-page py-24 md:py-32">
        <Reveal>
          <Eyebrow index="03">{chrome.recordEyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.04] tracking-tight">
            <AccentText text={chrome.recordHeading} accent={chrome.recordHeadingAccent} />
          </h2>
        </Reveal>

        {/* legend with per-type counts */}
        <Reveal delay={0.08} className="mt-8 flex flex-wrap items-center gap-2.5">
          {typeOrder.map((t) => (
            <Tag key={t}>
              {achievementTypeMeta[t].label} · {totals[t]}
            </Tag>
          ))}
        </Reveal>

        <ol ref={listRef} className="mt-14">
          {byDateDesc.map((a) => (
            <li
              key={a.id}
              data-tl-row
              className="grid gap-5 border-t border-border py-9 md:grid-cols-[210px_1fr] md:gap-12 md:py-11"
            >
              <div className="flex items-center justify-between gap-4 md:flex-col md:items-start md:justify-start md:gap-4">
                <span className="font-script text-2xl leading-none text-muted-foreground md:text-[1.7rem]">
                  {a.dateLabel}
                </span>
                <Tag>{achievementTypeMeta[a.type].label}</Tag>
              </div>

              <div className="group">
                <h3 className="font-display text-[1.55rem] leading-tight tracking-tight md:text-3xl">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.organization}</p>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                  {a.description}
                </p>
                {a.link && (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-medium"
                  >
                    <span className="link-underline">{chrome.linkLabel}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* closing — cross-link, builder framing */}
        <Reveal className="mt-12 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md font-display text-xl leading-snug md:text-2xl">
            <AccentText text={chrome.closingText} accent={chrome.closingTextAccent} />
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <CtaButton href={chrome.primaryCta.href} variant="outline" icon="arrow-right">
              {chrome.primaryCta.label}
            </CtaButton>
            <CtaButton href={chrome.secondaryCta.href} variant="text" icon="arrow-up">
              {chrome.secondaryCta.label}
            </CtaButton>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
