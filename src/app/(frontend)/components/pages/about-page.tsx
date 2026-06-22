'use client'

import { Fragment, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import type { Story } from '@/lib/portfolio-data'

import { Reveal } from '../ui/reveal'
import { AnimatedHeading } from '../ui/animated-heading'
import { CtaButton } from '../ui/cta-button'
import { ImageFrame } from '../ui/image-frame'
import { Eyebrow, Signature } from '../ui/primitives'

export function AboutPage({ story }: { story: Story }) {
  // Split the closing line so the second sentence can carry the italic emphasis.
  const nextSplit = story.next.indexOf('If you')
  const nextLead = nextSplit > -1 ? story.next.slice(0, nextSplit).trim() : story.next
  const nextEmphasis = nextSplit > -1 ? story.next.slice(nextSplit).trim() : ''

  const scope = useRef<HTMLElement>(null)

  useIsoLayoutEffect(() => {
    const root = scope.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // soft parallax on the portrait — slow, confident drift
      const portrait = root.querySelector<HTMLElement>('[data-hero-parallax]')
      const hero = root.querySelector<HTMLElement>('[data-hero]')
      if (portrait && hero && !reduce) {
        gsap.fromTo(
          portrait,
          { yPercent: 6 },
          {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
          },
        )
      }

      // journey rows ease in softly from the side as the spine scrolls past
      const rows = gsap.utils.toArray<HTMLElement>('[data-journey-row]')
      rows.forEach((row) => {
        if (reduce) {
          gsap.set(row, { opacity: 1, x: 0 })
          return
        }
        gsap.set(row, { opacity: 0, x: -28 })
        gsap.to(row, {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
        })
      })
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={scope} className="pt-28 md:pt-32">
      {/* ============================================================
          01 · HERO — the builder, the thesis, the signature
          ============================================================ */}
      <section data-hero className="container-page pb-20 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* story column */}
          <div className="relative z-10">
            <Reveal y={16}>
              <Eyebrow index="01">{story.eyebrow}</Eyebrow>
            </Reveal>

            <h1 className="mt-7 font-display text-[clamp(2.3rem,5vw,4.5rem)] leading-[1.04] tracking-tight">
              <AnimatedHeading
                as="span"
                immediate
                className="block"
                text={['I build companies —', 'and the technology that makes them']}
              />
              <AnimatedHeading
                as="span"
                immediate
                delay={0.5}
                className="block"
                wordClassName="display-italic"
                text="inevitable."
              />
            </h1>

            <Reveal as="p" delay={0.3} className="mt-9 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {story.intro}
            </Reveal>
          </div>

          {/* portrait column */}
          <div className="relative">
            <Reveal y={40} delay={0.2}>
              <div data-hero-parallax className="will-change-transform">
                <ImageFrame
                  label={story.portrait.label}
                  caption={story.portrait.caption}
                  ratio="aspect-[4/5]"
                />
              </div>
            </Reveal>
            <Reveal delay={0.45} y={14} className="mt-5 flex items-center justify-end gap-3">
              <span aria-hidden className="h-px w-10 bg-border-strong" />
              <Signature className="-rotate-2 text-3xl text-foreground/85 md:text-4xl">
                Muztahid Rahman
              </Signature>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          02 · NARRATIVE — the long-form story
          ============================================================ */}
      <section className="py-20 md:py-28" aria-label="The narrative">
        <div className="container-prose space-y-9 md:space-y-11">
          {story.narrative.map((para, i) => (
            <Fragment key={i}>
              <Reveal as="p"
                className={cn(
                  'text-[1.2rem] leading-[1.75] text-foreground md:text-[1.36rem]',
                  i === 0 &&
                    'first-letter:float-left first-letter:mr-3 first-letter:mt-1.5 first-letter:font-display first-letter:text-[3.6rem] first-letter:font-normal first-letter:leading-[0.7]',
                )}
              >
                {para}
              </Reveal>

              {i === 0 && (
                <Reveal y={14} className="!mt-7 flex justify-end">
                  <Signature className="-rotate-1 text-right text-2xl text-muted-foreground md:text-3xl">
                    take it apart &mdash; build it better.
                  </Signature>
                </Reveal>
              )}
            </Fragment>
          ))}
        </div>
      </section>

      {/* ============================================================
          03 · PHILOSOPHY — the pull-quote moment
          ============================================================ */}
      <section
        className="border-y border-border bg-elevated py-24 md:py-32"
        aria-labelledby="philosophy-heading"
      >
        <div className="container-page">
          <h2 id="philosophy-heading" className="sr-only">
            Philosophy
          </h2>
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow index="02">Philosophy</Eyebrow>
            </Reveal>

            <Reveal delay={0.08} className="relative mt-10">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-2 -top-12 select-none font-display leading-none text-foreground/[0.07] md:-top-20"
                style={{ fontSize: 'clamp(7rem, 16vw, 14rem)' }}
              >
                &ldquo;
              </span>
              <blockquote className="relative border-l-2 border-border-strong pl-6 md:pl-10">
                <p className="font-display text-[clamp(1.7rem,3.5vw,2.95rem)] leading-[1.18] tracking-tight">
                  <span className="display-italic">{story.philosophy.quote}</span>
                </p>
              </blockquote>
            </Reveal>

            <Reveal as="p" delay={0.16} className="mt-9 max-w-2xl pl-6 text-lg leading-relaxed text-muted-foreground md:pl-10">
              {story.philosophy.body}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          04 · VALUES — the operating principles
          ============================================================ */}
      <section className="container-page py-24 md:py-32" aria-labelledby="values-heading">
        <h2 id="values-heading" className="sr-only">
          Principles
        </h2>
        <Reveal>
          <Eyebrow index="03">What I build by</Eyebrow>
        </Reveal>
        <Reveal as="p" delay={0.08} className="mt-7 max-w-xl text-lg text-muted-foreground">
          Four convictions that shape every build, every team, and every line of code.
        </Reveal>

        <div className="mt-14 grid md:mt-16 md:grid-cols-2">
          {story.values.map((v, i) => (
            <Reveal
              key={v.title}
              delay={(i % 2) * 0.08}
              className={cn(
                'border-t border-border py-9 md:py-11',
                i % 2 === 1 ? 'md:border-l md:border-border md:pl-12' : 'md:pr-12',
              )}
            >
              <div className="flex items-baseline gap-4">
                <Signature className="text-2xl text-muted-foreground md:text-3xl">0{i + 1}</Signature>
                <h3 className="font-display text-2xl tracking-tight md:text-[1.7rem]">{v.title}</h3>
              </div>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================
          05 · JOURNEY — the path so far
          ============================================================ */}
      <section className="border-y border-border bg-card/40" aria-labelledby="journey-heading">
        <div className="container-page py-24 md:py-32">
          <h2 id="journey-heading" className="sr-only">
            The journey
          </h2>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <Reveal>
              <Eyebrow index="04">The path so far</Eyebrow>
            </Reveal>
            <Reveal as="p" delay={0.1} className="max-w-xs text-muted-foreground">
              From taking things apart to building companies &mdash; the milestones that compounded.
            </Reveal>
          </div>

          <div className="relative mt-14 md:mt-20">
            {/* soft vertical spine */}
            <span
              aria-hidden
              className="absolute bottom-2 left-[7px] top-2 w-px bg-border"
            />
            <ol className="space-y-12 md:space-y-14">
              {story.journey.map((item, i) => (
                <li
                  key={i}
                  data-journey-row
                  className="relative pl-10 md:grid md:grid-cols-[9rem_1fr] md:items-baseline md:gap-10 md:pl-14"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border border-border-strong bg-background"
                  />
                  <span className="font-script text-2xl leading-none text-muted-foreground md:text-3xl">
                    {item.year}
                  </span>
                  <div className="mt-2 md:mt-0">
                    <h3 className="font-display text-2xl tracking-tight md:text-[1.7rem]">{item.title}</h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============================================================
          06 · NEXT — the closing statement
          ============================================================ */}
      <section className="container-page py-24 md:py-32" aria-labelledby="next-heading">
        <Reveal>
          <Eyebrow index="05">What&rsquo;s next</Eyebrow>
        </Reveal>

        <Reveal as="h2" delay={0.08} className="mt-8 max-w-4xl font-display text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.14] tracking-tight">
          <span id="next-heading">
            {nextLead}{' '}
            {nextEmphasis && <span className="display-italic">{nextEmphasis}</span>}
          </span>
        </Reveal>

        <Reveal delay={0.16} className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4">
          <CtaButton href="/projects" variant="solid" icon="arrow-right">
            See what I’ve built
          </CtaButton>
          <CtaButton href="/contact" variant="text" icon="arrow-up">
            Get in touch
          </CtaButton>
        </Reveal>
      </section>
    </main>
  )
}

export default AboutPage
