'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUp, ArrowUpRight, AtSign } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import { siteConfig, about } from '@/lib/portfolio-data'
import { AnimatedHeading } from './ui/animated-heading'
import { CtaButton } from './ui/cta-button'
import { Marquee } from './ui/primitives'
import { Reveal } from './ui/reveal'
import { TransitionLink } from './ui/transition-link'
import { Magnetic } from './ui/magnetic'
import { GithubIcon, LinkedinIcon } from './ui/brand-icons'

const YEAR = 2026
const COORDS = '23.81°N · 90.41°E'

const stripUrl = (u: string) => u.replace(/^https?:\/\//, '').replace(/^www\./, '')

const connectLinks = [
  {
    label: 'GitHub',
    handle: stripUrl(siteConfig.github),
    href: siteConfig.github,
    Icon: GithubIcon,
    external: true,
  },
  {
    label: 'LinkedIn',
    handle: stripUrl(siteConfig.linkedin),
    href: siteConfig.linkedin,
    Icon: LinkedinIcon,
    external: true,
  },
  {
    label: 'Email',
    handle: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    Icon: AtSign,
    external: false,
  },
] as const

const builtWith = ['Next.js', 'Payload CMS', 'GSAP', 'Lenis']

export default function SiteFooter() {
  const root = useRef<HTMLElement>(null)
  const [clock, setClock] = useState<string | null>(null)

  // live Dhaka time — an "engineered" HUD detail; client-only to avoid hydration drift
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Dhaka',
    })
    const tick = () => setClock(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  // bespoke scroll-reveal: draw the top signal hairline as the footer enters
  useIsoLayoutEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const line = el.querySelector<HTMLElement>('[data-footer-line]')
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 45%', scrub: true },
          },
        )
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-line bg-ink-950">
      {/* animated top signal hairline (overlays the border) */}
      <span
        data-footer-line
        aria-hidden
        className="absolute inset-x-0 top-0 z-20 block h-px origin-left bg-gradient-to-r from-signal via-signal/30 to-transparent"
      />

      {/* ambient depth */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(120%_80%_at_50%_0%,#000,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-0 h-72 w-[42rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-signal/10 blur-[120px]"
      />

      <div className="container-x relative z-10">
        {/* top mono HUD strip — mirrors the hero motif */}
        <div className="flex items-center justify-between gap-4 border-b border-line py-5 font-mono text-[0.7rem] text-fg-dim">
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            <span className="tracking-[0.18em]">// LET&apos;S CONNECT</span>
          </span>
          <span className="hidden md:inline tracking-[0.18em]">{COORDS}</span>
          <span className="tracking-[0.18em]">SYS / READY</span>
        </div>

        {/* ============ closing CTA row ============ */}
        <div className="grid gap-y-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-7 flex items-center gap-3">
              <span className="font-mono text-xs text-signal">05</span>
              <span className="h-px w-10 bg-line-strong" />
              Get in touch
            </p>
            <AnimatedHeading
              as="h2"
              text={about.contact.heading}
              className="max-w-[15ch] text-[clamp(2.4rem,6.4vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-balance"
              stagger={0.05}
            />
          </div>

          <Reveal
            as="div"
            y={28}
            delay={0.1}
            className="flex flex-col justify-end gap-8 lg:col-span-4 lg:items-end"
          >
            <p className="max-w-md text-pretty text-base leading-relaxed text-fg-muted lg:text-right">
              {about.contact.blurb}
            </p>
            <div className="flex flex-wrap items-center gap-4 lg:justify-end">
              <CtaButton href="#about" variant="primary" icon="arrow-right">
                Start a conversation
              </CtaButton>
              <CtaButton
                href={`mailto:${siteConfig.email}`}
                target="_blank"
                variant="ghost"
                icon="arrow-up"
              >
                Email me
              </CtaButton>
            </div>
          </Reveal>
        </div>

        {/* ============ columns ============ */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 border-t border-line py-16 md:grid-cols-12">
          {/* brand */}
          <Reveal as="div" y={24} className="col-span-2 md:col-span-5">
            <TransitionLink
              href="#top"
              data-cursor
              data-cursor-label="Top"
              className="group inline-flex items-center gap-3"
            >
              <span className="relative flex h-10 w-10 items-center justify-center rounded-md border border-line-strong font-display text-base font-bold text-signal transition-colors duration-300 group-hover:border-signal">
                M
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-signal" />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-fg">
                {siteConfig.shortName}
                <span className="text-fg-dim">.rahman</span>
              </span>
            </TransitionLink>

            <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed text-fg-muted">
              {siteConfig.role} bridging autonomous robotics and scalable software — from firmware
              to the cloud, based in {siteConfig.location}.
            </p>

            <p className="mt-6 inline-flex items-center gap-2.5 font-mono text-[0.72rem] tracking-wide text-fg-dim">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              {siteConfig.availability}
            </p>
          </Reveal>

          {/* sitemap */}
          <Reveal as="nav" y={24} delay={0.05} className="col-span-1 md:col-span-2" >
            <h3 className="eyebrow mb-5">Sitemap</h3>
            <ul className="flex flex-col gap-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    data-cursor
                    className="group inline-flex items-baseline gap-2.5 py-1.5 text-sm text-fg-muted transition-colors duration-300 hover:text-fg"
                  >
                    <span className="font-mono text-[0.65rem] text-signal/70">{item.index}</span>
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* connect */}
          <Reveal as="div" y={24} delay={0.1} className="col-span-1 md:col-span-3">
            <h3 className="eyebrow mb-5">Connect</h3>
            <ul className="flex flex-col">
              {connectLinks.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noopener noreferrer' : undefined}
                    data-cursor
                    data-cursor-label="View"
                    aria-label={`${c.label} — ${c.handle}`}
                    className="group flex items-center justify-between gap-4 border-b border-line py-3 last:border-b-0"
                  >
                    <span className="flex items-center gap-3">
                      <c.Icon className="h-4 w-4 shrink-0 text-fg-dim transition-colors duration-300 group-hover:text-signal" />
                      <span className="flex flex-col leading-tight">
                        <span className="text-sm text-fg transition-colors duration-300 group-hover:text-signal">
                          {c.label}
                        </span>
                        <span className="font-mono text-[0.68rem] text-fg-dim">{c.handle}</span>
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* local / status HUD */}
          <Reveal as="div" y={24} delay={0.15} className="col-span-2 md:col-span-2">
            <h3 className="eyebrow mb-5">Local</h3>
            <dl className="flex flex-col gap-3 font-mono text-[0.72rem]">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-fg-dim">TIME</dt>
                <dd className="tabular-nums text-signal" aria-live="off">
                  {clock ?? '--:--:--'}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-fg-dim">ZONE</dt>
                <dd className="text-fg-muted">UTC+6 · BDT</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-fg-dim">GEO</dt>
                <dd className="text-fg-muted">{COORDS}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>

      {/* ============ giant ghost wordmark marquee ============ */}
      <Reveal as="div" y={36} className="wm-band relative border-y border-line py-6 md:py-8">
        <div aria-hidden>
          <Marquee duration={42} className="select-none">
            {[0, 1].map((i) => (
              <span key={i} className="flex items-center gap-8 pr-8 md:gap-12 md:pr-12">
                <WordmarkText>{siteConfig.name}</WordmarkText>
                <Dash />
                <WordmarkText>Software</WordmarkText>
                <span className="font-display text-[clamp(3.25rem,12vw,10rem)] font-bold leading-none text-signal/40">
                  ×
                </span>
                <WordmarkText>Robotics</WordmarkText>
                <Dash />
              </span>
            ))}
          </Marquee>
        </div>

        <style>{`
          .wm-outline {
            color: transparent;
            -webkit-text-stroke: 1.5px color-mix(in oklab, var(--color-fg-muted) 24%, transparent);
            transition: -webkit-text-stroke-color 0.55s var(--ease-out-expo);
          }
          .wm-band:hover .wm-outline {
            -webkit-text-stroke-color: var(--color-signal);
          }
          @media (hover: none) {
            .wm-outline {
              -webkit-text-stroke-color: color-mix(in oklab, var(--color-signal) 32%, transparent);
            }
          }
        `}</style>
      </Reveal>

      {/* ============ bottom bar ============ */}
      <div className="container-x relative z-10">
        <div className="flex flex-col items-start gap-6 border-t border-line py-8 md:flex-row md:items-center md:justify-between">
          <p className="order-2 text-sm text-fg-muted md:order-1">
            © {YEAR} {siteConfig.name}
            <span className="text-fg-dim"> — All systems nominal.</span>
          </p>

          <p className="order-3 font-mono text-[0.7rem] text-fg-dim md:order-2">
            Built with{' '}
            {builtWith.map((t, i) => (
              <span key={t}>
                <span className="text-fg-muted">{t}</span>
                {i < builtWith.length - 1 && <span className="text-signal/50"> · </span>}
              </span>
            ))}
          </p>

          <div className="order-1 md:order-3">
            <Magnetic strength={0.3}>
              <TransitionLink
                href="#top"
                data-cursor
                data-cursor-label="Top"
                className="group inline-flex items-center gap-3"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted transition-colors duration-300 group-hover:text-fg">
                  Back to top
                </span>
                <span
                  className={cn(
                    'relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-line-strong text-fg',
                    'transition-colors duration-300 group-hover:border-signal group-hover:text-signal',
                  )}
                >
                  <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-4 group-hover:opacity-0" />
                  <ArrowUp className="absolute h-4 w-4 translate-y-4 opacity-0 transition-transform duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
                </span>
              </TransitionLink>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  )
}

function WordmarkText({ children }: { children: string }) {
  return (
    <span className="wm-outline whitespace-nowrap font-display text-[clamp(3.25rem,12vw,10rem)] font-bold uppercase leading-none tracking-[-0.02em]">
      {children}
    </span>
  )
}

function Dash() {
  return (
    <span className="font-display text-[clamp(3.25rem,12vw,10rem)] font-bold leading-none text-signal/30">
      —
    </span>
  )
}
