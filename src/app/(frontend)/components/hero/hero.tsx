'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { hero, siteConfig } from '@/lib/portfolio-data'
import { AnimatedHeading } from '../ui/animated-heading'
import { CtaButton } from '../ui/cta-button'
import { Marquee } from '../ui/primitives'
import { HeroPointCloud } from './hero-pointcloud'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const intro = useRef<HTMLDivElement>(null)

  useIsoLayoutEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      // fade in supporting elements after the headline words
      gsap.from('[data-hero-fade]', {
        opacity: 0,
        y: 22,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.12,
        delay: 0.5,
      })
      // parallax the intro block out as you scroll past the hero
      gsap.to(intro.current, {
        yPercent: -18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28"
    >
      {/* point-cloud background */}
      <HeroPointCloud className="pointer-events-none absolute right-0 top-0 h-full w-full opacity-70 [mask-image:radial-gradient(120%_100%_at_70%_40%,#000_25%,transparent_72%)] md:w-[68%]" />

      <div ref={intro} className="container-x relative z-10 w-full">
        {/* availability badge */}
        <div
          data-hero-fade
          className="surface mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <span className="font-mono text-[0.72rem] tracking-wide text-fg-muted">
            {hero.badge}
          </span>
        </div>

        {/* headline */}
        <h1 className="max-w-[16ch] text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
          <AnimatedHeading as="span" text={hero.headline[0]} immediate stagger={0.06} />
          <AnimatedHeading
            as="span"
            text={hero.headline[1]}
            immediate
            delay={0.12}
            stagger={0.06}
            wordClassName="text-signal-gradient"
          />
          <AnimatedHeading as="span" text={hero.headline[2]} immediate delay={0.24} stagger={0.05} />
        </h1>

        {/* subhead + CTAs */}
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p
            data-hero-fade
            className="max-w-xl text-pretty text-base leading-relaxed text-fg-muted md:text-lg"
          >
            {hero.subhead}
          </p>
          <div data-hero-fade className="flex flex-wrap items-center gap-4">
            <CtaButton href={hero.primaryCta.href} variant="primary" icon="arrow-right">
              {hero.primaryCta.label}
            </CtaButton>
            <CtaButton href={hero.secondaryCta.href} variant="ghost" icon="download">
              {hero.secondaryCta.label}
            </CtaButton>
          </div>
        </div>
      </div>

      {/* bottom HUD strip */}
      <div className="container-x relative z-10 mt-16 w-full">
        <div
          data-hero-fade
          className="flex items-center justify-between border-t border-line pt-5 font-mono text-[0.7rem] text-fg-dim"
        >
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">SCROLL</span>
            <span className="relative block h-8 w-px overflow-hidden bg-line-strong sm:hidden">
              <span className="absolute inset-x-0 top-0 h-3 animate-[marquee-x_1.5s_linear_infinite] bg-signal" />
            </span>
            <ScrollCue />
          </div>
          <span className="hidden md:inline">
            {siteConfig.location} · 23.81°N 90.41°E
          </span>
          <span>SYS / ONLINE</span>
        </div>
      </div>

      {/* tech marquee band */}
      <div data-hero-fade className="relative z-10 mt-10 border-y border-line py-4">
        <Marquee duration={32}>
          {hero.marquee.map((t, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-mono text-sm text-fg-muted">{t}</span>
              <span className="text-signal/50">/</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

function ScrollCue() {
  return (
    <span className="flex items-center gap-2 text-fg-dim">
      <span className="hidden h-8 w-px overflow-hidden bg-line-strong sm:block">
        <span className="block h-3 w-full bg-signal [animation:scrollcue_1.8s_ease-in-out_infinite]" />
      </span>
      <span className="hidden sm:inline">to explore</span>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(266%)}}`}</style>
    </span>
  )
}
