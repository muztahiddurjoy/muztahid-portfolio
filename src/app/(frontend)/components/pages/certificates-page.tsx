'use client'

import { useMemo, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import { certificates } from '@/lib/portfolio-data'
import { Reveal } from '../ui/reveal'
import { Eyebrow, Tag, Signature, CountUp } from '../ui/primitives'
import { CtaButton } from '../ui/cta-button'
import { Icon } from '../ui/lucide-icon'

/* Coarse disciplines mirror the hero line: cloud, AI, robotics, and the web. */
const DISCIPLINES = ['All', 'Cloud', 'AI', 'Robotics', 'Web'] as const
type Discipline = (typeof DISCIPLINES)[number]

const certDiscipline: Record<string, Exclude<Discipline, 'All'>> = {
  'aws-ccp': 'Cloud',
  'gcp-leader': 'Cloud',
  'nvidia-dl': 'AI',
  'ros2-dev': 'Robotics',
  'meta-frontend': 'Web',
  'mongodb-node': 'Web',
  'postman-api': 'Web',
  'fcc-responsive': 'Web',
  'udemy-fullstack': 'Web',
}

export default function CertificatesPage() {
  const gridRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState<Discipline>('All')

  const filtered = useMemo(
    () =>
      active === 'All'
        ? certificates
        : certificates.filter((c) => certDiscipline[c.id] === active),
    [active],
  )

  // Soft staggered reveal for the card wrappers. Re-runs on filter change so the
  // grid re-settles with a calm cascade; reduced-motion shows the final state.
  useIsoLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = grid.querySelectorAll<HTMLElement>('[data-card]')
    if (!cards.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(cards, { opacity: 1, y: 0 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 26 })
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
      })
    }, gridRef)
    return () => ctx.revert()
  }, [active])

  return (
    <main className="relative pt-28 md:pt-32">
      {/* ---------------- Hero ---------------- */}
      <section className="container-page pb-16 md:pb-24">
        <div className="max-w-4xl">
          <Reveal>
            <Eyebrow>Certificates</Eyebrow>
          </Reveal>

          <Reveal
            as="h1"
            delay={0.05}
            className="mt-6 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] tracking-tight"
          >
            Always <span className="display-italic">sharpening</span> the craft.
          </Reveal>

          <Reveal
            as="p"
            delay={0.12}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            A founder is only as sharp as their last lesson. These are the credentials I have
            collected keeping pace across{' '}
            <span className="text-foreground">cloud, AI, robotics, and the web</span> — proof that
            the curiosity that started everything never quietly switched off.
          </Reveal>

          <Reveal delay={0.18} className="mt-6">
            <Signature className="text-2xl text-muted-foreground">still a student</Signature>
          </Reveal>

          <Reveal
            delay={0.24}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-baseline gap-2">
              <CountUp
                value={certificates.length}
                className="font-display text-2xl leading-none text-foreground"
              />
              credentials
            </span>
            <span className="hidden h-4 w-px bg-border-strong sm:inline-block" aria-hidden="true" />
            <span>
              across <span className="text-foreground">four</span> disciplines
            </span>
            <span className="hidden h-4 w-px bg-border-strong sm:inline-block" aria-hidden="true" />
            <span>continuously updated</span>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Grid ---------------- */}
      <section className="border-y border-border bg-elevated py-20 md:py-28">
        <div className="container-page">
          {/* Quiet discipline filter */}
          <Reveal className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Browse</Eyebrow>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                Filter the shelf by where each lesson lives.
              </p>
            </div>
            <div
              role="group"
              aria-label="Filter certificates by discipline"
              className="flex flex-wrap gap-2.5"
            >
              {DISCIPLINES.map((d) => {
                const isActive = active === d
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setActive(d)}
                    aria-pressed={isActive}
                    data-cursor
                    className={cn(
                      'rounded-full border px-4 py-1.5 text-[0.78rem] tracking-tight outline-none transition-colors duration-300',
                      'focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-elevated',
                      isActive
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground',
                    )}
                  >
                    {d}
                  </button>
                )
              })}
            </div>
          </Reveal>

          <p className="sr-only" aria-live="polite">
            Showing {filtered.length} of {certificates.length} certificates
            {active !== 'All' ? ` in ${active}` : ''}.
          </p>

          <ul
            ref={gridRef}
            className="grid list-none grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
          >
            {filtered.map((cert) => (
              <li key={cert.id} data-card className="h-full">
                <article className="group flex h-full flex-col rounded-[var(--radius-xl)] border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_24px_60px_-34px_rgba(0,0,0,0.4)]">
                  {/* issuer + verified mark */}
                  <header className="flex items-start justify-between gap-4">
                    <p className="eyebrow pt-1">{cert.issuer}</p>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-500 group-hover:border-border-strong group-hover:text-foreground">
                      <Icon name="Award" className="h-3 w-3" aria-hidden="true" />
                      Verified
                    </span>
                  </header>

                  <h2 className="mt-5 font-display text-2xl leading-snug tracking-tight">
                    {cert.title}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span>{cert.dateLabel}</span>
                    <span className="h-1 w-1 rounded-full bg-border-strong" aria-hidden="true" />
                    <span className="text-xs">ID {cert.credentialId}</span>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 pt-7">
                    {cert.skills.map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">
              Nothing on this shelf yet — more on the way.
            </p>
          )}
        </div>
      </section>

      {/* ---------------- Closing ---------------- */}
      <section className="container-page py-24 text-center md:py-32">
        <Reveal>
          <Eyebrow className="justify-center">Keep going</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(1.9rem,4.5vw,3.4rem)] leading-[1.08] tracking-tight">
            The learning never <span className="display-italic">stops</span> — and neither do the
            ideas it unlocks.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Every credential is a tool I picked up to build something better. If you have a problem
            worth that depth, let us put it to work.
          </p>
          <div className="mt-10 flex justify-center">
            <CtaButton href="/contact" variant="solid" icon="arrow-right">
              Let us build something
            </CtaButton>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
