import type { Metadata } from 'next'
import { Download } from 'lucide-react'
import { about, awards, siteConfig, skills, skillClusterMeta } from '@/lib/portfolio-data'
import { Reveal } from '../components/ui/reveal'
import { CtaButton } from '../components/ui/cta-button'
import { SectionLabel } from '../components/ui/primitives'
import { TransitionLink } from '../components/ui/transition-link'

export const metadata: Metadata = {
  title: `Academic CV — ${siteConfig.name}`,
  description: 'Academic curriculum vitae — software & robotics engineering.',
}

export default function CvPage() {
  const leadership = awards.filter((a) => a.category === 'leadership')
  const honours = awards.filter((a) => a.category !== 'leadership')

  return (
    <main className="relative pt-28">
      <div className="container-x max-w-4xl pb-28">
        {/* back */}
        <TransitionLink
          href="/#top"
          data-cursor
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs text-fg-muted transition-colors hover:text-fg"
        >
          ← Back to portfolio
        </TransitionLink>

        {/* header */}
        <Reveal>
          <SectionLabel index="CV" className="mb-6">
            Academic Curriculum Vitae
          </SectionLabel>
          <div className="flex flex-col gap-6 border-b border-line pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
                {siteConfig.name}
              </h1>
              <p className="mt-3 text-lg text-fg-muted">{siteConfig.role}</p>
              <p className="mt-1 font-mono text-sm text-fg-dim">
                {siteConfig.location} · {siteConfig.email}
              </p>
            </div>
            <CtaButton href={`mailto:${siteConfig.email}`} icon="download" variant="primary">
              Request PDF
            </CtaButton>
          </div>
        </Reveal>

        {/* mission */}
        <Reveal className="mt-12">
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
            {about.narrative[0]}
          </p>
        </Reveal>

        {/* education */}
        <CvSection index="01" title="Education">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-semibold">{about.education.degree}</h3>
              <span className="font-mono text-xs text-signal">{about.education.status}</span>
            </div>
            <p className="text-fg-muted">{about.education.university}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {about.education.coursework.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] text-fg-muted"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </CvSection>

        {/* experience / leadership */}
        <CvSection index="02" title="Experience & Leadership">
          <ul className="flex flex-col gap-7">
            {leadership.map((l) => (
              <li key={l.id} className="grid gap-1 md:grid-cols-[160px_1fr] md:gap-6">
                <span className="font-mono text-xs text-fg-dim">{l.dateLabel}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{l.title}</h3>
                  <p className="text-sm text-fg-muted">{l.organization}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-muted/80">{l.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </CvSection>

        {/* honours */}
        <CvSection index="03" title="Awards & Competitions">
          <ul className="flex flex-col gap-5">
            {honours.map((h) => (
              <li key={h.id} className="grid gap-1 md:grid-cols-[160px_1fr] md:gap-6">
                <span className="font-mono text-xs text-fg-dim">{h.dateLabel}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{h.title}</h3>
                  <p className="text-sm text-fg-muted">{h.organization}</p>
                </div>
              </li>
            ))}
          </ul>
        </CvSection>

        {/* skills */}
        <CvSection index="04" title="Technical Skills">
          <div className="grid gap-8 md:grid-cols-3">
            {(Object.keys(skillClusterMeta) as (keyof typeof skillClusterMeta)[]).map((key) => (
              <div key={key}>
                <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-signal">
                  {skillClusterMeta[key].label}
                </h3>
                <ul className="flex flex-col gap-1.5 text-sm text-fg-muted">
                  {skills
                    .filter((s) => s.cluster === key)
                    .map((s) => (
                      <li key={s.name}>{s.name}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </CvSection>
      </div>
    </main>
  )
}

function CvSection({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: React.ReactNode
}) {
  return (
    <Reveal as="section" className="mt-14 border-t border-line pt-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="font-mono text-xs text-signal">{index}</span>
        <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </Reveal>
  )
}
