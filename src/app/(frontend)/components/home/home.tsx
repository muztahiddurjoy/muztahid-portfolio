'use client'

import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import {
  projectTypeMeta,
  writingCategoryMeta,
  achievementTypeMeta,
  type AchievementType,
  type SiteConfig,
  type HomeData,
  type Stat,
  type Project,
  type Article,
  type Achievement,
  type Certificate,
} from '@/lib/portfolio-data'

import { Reveal } from '../ui/reveal'
import { AnimatedHeading } from '../ui/animated-heading'
import { CtaButton } from '../ui/cta-button'
import { Eyebrow, Tag, Signature, Marquee, CountUp, AccentText } from '../ui/primitives'
import { ImageFrame } from '../ui/image-frame'
import { AmbientBackground } from '../ui/ambient-background'
import { TransitionLink } from '../ui/transition-link'
import { Icon, type IconName } from '../ui/lucide-icon'
import { usePreview } from '../preview-context'

const achievementIcon: Record<AchievementType, IconName> = {
  award: 'Trophy',
  competition: 'Award',
  leadership: 'Users',
  milestone: 'Rocket',
}

export function Home({
  siteConfig,
  home,
  stats,
  projects,
  articles,
  achievements,
  certificates,
}: {
  siteConfig: SiteConfig
  home: HomeData
  stats: Stat[]
  projects: Project[]
  articles: Article[]
  achievements: Achievement[]
  certificates: Certificate[]
}) {
  // Featured projects pinned to the top; fall back to the most recent few so the
  // section never renders empty if nothing is flagged.
  const featuredProjects = (
    projects.some((v) => v.featured) ? projects.filter((v) => v.featured) : projects
  ).slice(0, 4)
  const latestPosts = articles.slice(0, 3)
  const featuredWins = achievements.filter((a) => a.featured).slice(0, 3)
  // Featured certificates → homepage; fall back to most-recent (already date-sorted).
  const featuredCerts = (
    certificates.some((c) => c.featured) ? certificates.filter((c) => c.featured) : certificates
  ).slice(0, 3)

  const accent = home.headlineAccent.toLowerCase()

  const scope = useRef<HTMLElement>(null)
  const isPreview = usePreview()

  useIsoLayoutEffect(() => {
    const root = scope.current
    if (!root) return
    const reduce = isPreview || window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('[data-hero-word]')

      if (reduce) {
        gsap.set(words, { yPercent: 0, opacity: 1 })
        return
      }

      // hero headline — per-word masked serif reveal (on mount)
      gsap.set(words, { yPercent: 118, opacity: 0 })
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 1.15,
        ease: 'expo.out',
        stagger: 0.07,
        delay: 0.15,
      })

      // soft parallax on the hero portrait
      const portrait = root.querySelector<HTMLElement>('[data-hero-parallax]')
      const hero = root.querySelector<HTMLElement>('[data-hero]')
      if (portrait && hero) {
        gsap.to(portrait, {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        })
      }

      // quiet scroll cue bob
      gsap.to('[data-cue-dot]', {
        y: 16,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: 'sine.inOut',
      })
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={scope} className="pt-28 md:pt-32">
      {/* ============================================================
          01 · HERO
          ============================================================ */}
      <section data-hero className="container-page relative min-h-[86vh] pb-16">
        <AmbientBackground />
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
          {/* headline column */}
          <div className="relative z-10">
            <Reveal y={16}>
              <Eyebrow index="01">{home.eyebrow}</Eyebrow>
            </Reveal>

            <h1 className="mt-7 font-display text-[clamp(2.8rem,9vw,7.4rem)] leading-[0.92] tracking-[-0.03em]">
              {home.headline.map((line, li) => (
                <span key={li} className="block">
                  {line.split(' ').map((word, wi) => {
                    const clean = word.replace(/[^a-zA-Z]/g, '').toLowerCase()
                    const isAccent = clean === accent
                    return (
                      <span
                        key={wi}
                        className="mr-[0.26em] inline-block overflow-hidden align-bottom"
                      >
                        <span
                          data-hero-word
                          className={cn('inline-block', isAccent && 'display-italic')}
                        >
                          {word}
                        </span>
                      </span>
                    )
                  })}
                </span>
              ))}
            </h1>

            <Reveal delay={0.5} y={14}>
              <Signature className="mt-5 block -rotate-3 pl-1 text-2xl text-muted-foreground md:text-[1.7rem]">
                {home.script}
              </Signature>
            </Reveal>

            <Reveal as="p" delay={0.3} className="mt-9 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {home.lede}
            </Reveal>

            <Reveal delay={0.42} className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
              <CtaButton href={home.primaryCta.href} variant="solid" icon="arrow-right">
                {home.primaryCta.label}
              </CtaButton>
              <CtaButton href={home.secondaryCta.href} variant="text" icon="arrow-up">
                {home.secondaryCta.label}
              </CtaButton>
            </Reveal>
          </div>

          {/* portrait column */}
          <Reveal delay={0.2} y={40} className="relative">
            <div data-hero-parallax className="will-change-transform">
              <ImageFrame
                label={siteConfig.shortName}
                caption={home.heroCaption}
                src={home.heroImage || undefined}
                alt={siteConfig.name}
                ratio="aspect-[4/5]"
              />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <Signature className="-rotate-2 text-xl text-muted-foreground">{home.heroBadge}</Signature>
              <span className="eyebrow">{siteConfig.location}</span>
            </div>
          </Reveal>
        </div>

        {/* scroll cue */}
        <Reveal delay={0.7} className="mt-14 flex items-center gap-4 md:mt-20">
          <span className="eyebrow">Scroll</span>
          <span className="relative block h-12 w-px bg-border-strong/70">
            <span
              data-cue-dot
              className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full bg-foreground"
            />
          </span>
        </Reveal>
      </section>

      {/* ============================================================
          MARQUEE band
          ============================================================ */}
      <section className="border-y border-border bg-elevated py-7 md:py-9" aria-label="Selected work and recognition">
        <Marquee duration={40}>
          {home.marquee.map((item, i) => (
            <span key={i} className="flex shrink-0 items-center">
              <span className="font-display text-3xl tracking-tight md:text-5xl">{item}</span>
              <span
                aria-hidden
                className="px-7 font-display text-2xl leading-none text-muted-foreground md:px-12 md:text-4xl"
              >
                *
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ============================================================
          02 · MANIFESTO + NOW
          ============================================================ */}
      <section className="container-page py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow index="02">{home.manifesto.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal as="h2" delay={0.08} className="mt-8 max-w-2xl font-display text-[clamp(1.7rem,3.4vw,2.95rem)] leading-[1.14] tracking-tight">
              <AccentText text={home.manifesto.heading} accent={home.manifesto.headingAccent} />
            </Reveal>
            <Reveal as="p" delay={0.16} className="mt-7 max-w-md text-muted-foreground">
              {home.manifesto.body}
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <div className="flex items-baseline gap-4">
              <Signature className="text-2xl text-muted-foreground">{home.manifesto.nowLabel}</Signature>
              <span className="h-px flex-1 bg-border" />
            </div>
            <dl className="mt-2">
              {home.now.map((item, i) => (
                <Reveal key={item.label} delay={i * 0.06} className="border-t border-border py-5">
                  <dt className="eyebrow mb-2.5">{item.label}</dt>
                  <dd className="font-display text-lg leading-snug tracking-tight md:text-xl">
                    {item.value}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============================================================
          03 · FEATURED PROJECTS
          ============================================================ */}
      <section className="border-t border-border">
        <div className="container-page py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <Reveal>
                <Eyebrow index="03">{home.projectsSection.eyebrow}</Eyebrow>
              </Reveal>
              <h2 className="mt-7 font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.04] tracking-tight">
                <AnimatedHeading as="span" className="block" text={home.projectsSection.headingLineOne} />
                <AnimatedHeading
                  as="span"
                  className="block"
                  wordClassName="display-italic"
                  text={home.projectsSection.headingLineTwo}
                  delay={0.08}
                />
              </h2>
            </div>
            <Reveal as="p" delay={0.15} className="max-w-xs text-muted-foreground">
              {home.projectsSection.description}
            </Reveal>
          </div>

          <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
            {featuredProjects.map((v, i) => {
              const flip = i % 2 === 1
              const href = `/projects/${v.slug}`
              return (
                <article key={v.slug} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                  <Reveal y={40} className={cn('relative', flip && 'md:order-2')}>
                    <TransitionLink href={href} data-cursor aria-label={`View ${v.name}`} className="block">
                      <ImageFrame label={v.cover.label} caption={v.cover.caption} src={v.cover.image} ratio="aspect-[16/12]" />
                    </TransitionLink>
                  </Reveal>

                  <Reveal y={30} delay={0.1} className={cn(flip && 'md:order-1')}>
                    <div className="flex items-center gap-4">
                      <Signature className="text-xl text-muted-foreground">0{i + 1}</Signature>
                      <Tag>{projectTypeMeta[v.type].label}</Tag>
                    </div>

                    <h3 className="mt-5 font-display text-title leading-[1.05] tracking-tight">
                      <TransitionLink href={href} data-cursor className="link-underline">
                        {v.name}
                      </TransitionLink>
                    </h3>

                    <p className="mt-4 text-lg text-muted-foreground">{v.tagline}</p>
                    <p className="mt-4 text-sm text-muted-foreground">
                      {v.role} &middot; {v.year} &middot; {v.status}
                    </p>

                    <dl className="mt-7 flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-7">
                      {v.metrics.slice(0, 2).map((m) => (
                        <div key={m.label}>
                          <dt className="eyebrow mb-1.5">{m.label}</dt>
                          <dd className="font-display text-2xl tracking-tight md:text-[1.7rem]">{m.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-8">
                      <CtaButton href={href} variant="text" icon="arrow-up">
                        View project
                      </CtaButton>
                    </div>
                  </Reveal>
                </article>
              )
            })}
          </div>

          <Reveal className="mt-16 flex justify-center md:mt-20">
            <CtaButton href={home.projectsSection.ctaHref} variant="outline" icon="arrow-right">
              {home.projectsSection.ctaLabel}
            </CtaButton>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          04 · BY THE NUMBERS
          ============================================================ */}
      <section className="border-y border-border bg-elevated">
        <div className="container-page py-20 md:py-24">
          <Reveal>
            <Eyebrow index="04">{home.statsEyebrow}</Eyebrow>
          </Reveal>

          <dl className="mt-12 grid grid-cols-2 md:mt-14 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.08}
                className={cn(
                  'py-8 pr-6 md:py-2',
                  i >= 2 && 'border-t border-border md:border-t-0',
                  i % 2 === 1 && 'border-l border-border pl-6',
                  i % 4 !== 0 && 'md:border-l md:border-border md:pl-10',
                )}
              >
                <dd className="font-display text-[clamp(2.6rem,6.5vw,4.6rem)] leading-none tracking-tight">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-4 max-w-[12rem] text-sm leading-snug text-muted-foreground">
                  {s.label}
                </dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ============================================================
          05 · SELECTED WRITING
          ============================================================ */}
      <section className="container-page py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <Reveal>
              <Eyebrow index="05">{home.writingSection.eyebrow}</Eyebrow>
            </Reveal>
            <h2 className="mt-7 font-display text-[clamp(1.9rem,4.2vw,3.3rem)] leading-[1.04] tracking-tight">
              <AnimatedHeading as="span" className="block" text={home.writingSection.heading} />
            </h2>
          </div>
          <Reveal delay={0.12}>
            <CtaButton href={home.writingSection.ctaHref} variant="text" icon="arrow-up">
              {home.writingSection.ctaLabel}
            </CtaButton>
          </Reveal>
        </div>

        <ul className="mt-14 border-t border-border">
          {latestPosts.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 0.05} className="border-b border-border">
              <TransitionLink
                href={`/writing/${a.slug}`}
                data-cursor
                className="group block py-9 md:py-10"
              >
                <div className="grid gap-5 md:grid-cols-[0.8fr_2.2fr] md:gap-12">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span>{a.dateLabel}</span>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-border-strong" />
                    <span>{a.readTime}</span>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-border-strong" />
                    <span>{writingCategoryMeta[a.category].label}</span>
                  </div>

                  <div>
                    <h3 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] leading-[1.14] tracking-tight transition-opacity duration-300 group-hover:opacity-100">
                      <span className="link-underline">{a.title}</span>
                    </h3>
                    <p className="mt-3 max-w-2xl text-muted-foreground">{a.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      {home.writingSection.itemCtaLabel}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </TransitionLink>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ============================================================
          06 · FEATURED CERTIFICATES
          ============================================================ */}
      {featuredCerts.length > 0 && (
        <section className="border-t border-border">
          <div className="container-page py-24 md:py-32">
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
              <div>
                <Reveal>
                  <Eyebrow index="06">{home.certificatesSection.eyebrow}</Eyebrow>
                </Reveal>
                <h2 className="mt-7 font-display text-[clamp(1.9rem,4.2vw,3.3rem)] leading-[1.04] tracking-tight">
                  <AnimatedHeading as="span" className="block" text={home.certificatesSection.headingLineOne} />
                  <AnimatedHeading
                    as="span"
                    className="block"
                    wordClassName="display-italic"
                    text={home.certificatesSection.headingLineTwo}
                    delay={0.08}
                  />
                </h2>
              </div>
              <Reveal delay={0.12}>
                <CtaButton href={home.certificatesSection.ctaHref} variant="text" icon="arrow-up">
                  {home.certificatesSection.ctaLabel}
                </CtaButton>
              </Reveal>
            </div>

            <ul className="mt-14 grid list-none gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {featuredCerts.map((cert, i) => (
                <Reveal as="li" key={cert.id} delay={i * 0.08} className="h-full">
                  <article className="group flex h-full flex-col rounded-[var(--radius-xl)] border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_24px_60px_-34px_rgba(0,0,0,0.4)]">
                    <header className="flex items-start justify-between gap-4">
                      <p className="eyebrow pt-1">{cert.issuer}</p>
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-500 group-hover:border-border-strong group-hover:text-foreground">
                        <Icon name="Award" className="h-3 w-3" aria-hidden="true" />
                        Verified
                      </span>
                    </header>
                    <h3 className="mt-5 font-display text-xl leading-snug tracking-tight md:text-2xl">
                      {cert.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground">{cert.dateLabel}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-7">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <Tag key={skill}>{skill}</Tag>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ============================================================
          07 · ACHIEVEMENTS teaser
          ============================================================ */}
      <section className="border-t border-border bg-elevated">
        <div className="container-page py-24 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <Reveal>
                <Eyebrow index="07">{home.achievementsSection.eyebrow}</Eyebrow>
              </Reveal>
              <h2 className="mt-7 font-display text-[clamp(1.9rem,4.2vw,3.3rem)] leading-[1.04] tracking-tight">
                <AnimatedHeading as="span" className="block" text={home.achievementsSection.headingLineOne} />
                <AnimatedHeading
                  as="span"
                  className="block"
                  wordClassName="display-italic"
                  text={home.achievementsSection.headingLineTwo}
                  delay={0.08}
                />
              </h2>
            </div>
            <Reveal delay={0.12}>
              <CtaButton href={home.achievementsSection.ctaHref} variant="text" icon="arrow-up">
                {home.achievementsSection.ctaLabel}
              </CtaButton>
            </Reveal>
          </div>

          <ul className="mt-14 grid md:grid-cols-3">
            {featuredWins.map((w, i) => (
              <Reveal
                as="li"
                key={w.id}
                delay={i * 0.08}
                className={cn(
                  'border-t border-border py-8 md:border-t-0 md:py-2 md:pr-8',
                  i > 0 && 'md:border-l md:border-border md:pl-10',
                )}
              >
                <Icon name={achievementIcon[w.type]} className="h-5 w-5 text-muted-foreground" />
                <p className="eyebrow mt-5">
                  {achievementTypeMeta[w.type].label} &middot; {w.dateLabel}
                </p>
                <h3 className="mt-3 font-display text-xl leading-snug tracking-tight md:text-2xl">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.organization}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default Home
