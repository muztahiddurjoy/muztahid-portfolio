'use client'

import { useRef, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import { categoryMeta, type Project, type Category } from '@/lib/portfolio-data'
import { AnimatedHeading } from '../ui/animated-heading'
import { Reveal } from '../ui/reveal'
import { SectionLabel, CountUp, TechChip } from '../ui/primitives'
import { Magnetic } from '../ui/magnetic'
import { CtaButton } from '../ui/cta-button'
import { Icon, type IconName } from '../ui/lucide-icon'
import { TransitionLink } from '../ui/transition-link'
import { GithubIcon } from '../ui/brand-icons'

/* ============================================================
   CaseStudy — project deep-dive (FR-2.6)
   Renders inside /projects/[slug]/page.tsx. The integrator
   supplies the global nav + footer and wires the route.
   ============================================================ */

const pad = (n: number) => String(n).padStart(2, '0')

const galleryIcon: Record<Category, IconName> = {
  robotics: 'Bot',
  cloud: 'Cloud',
  hardware: 'CircuitBoard',
}

const categoryChipIcon: Record<Category, IconName> = {
  robotics: 'Navigation',
  cloud: 'Database',
  hardware: 'Cpu',
}

/* ---------------- syntax tint (tasteful, heuristic) ----------------
   Fixed palette regardless of category accent:
   keyword → violet · type/CONST → bright · number/decorator → cyan
   string → amber · comment → dim. Default identifiers stay muted. */
const KEYWORDS = new Set([
  // c / c++
  'class', 'struct', 'public', 'private', 'protected', 'void', 'return', 'const',
  'constexpr', 'auto', 'for', 'while', 'do', 'if', 'else', 'switch', 'case', 'break',
  'continue', 'new', 'delete', 'this', 'using', 'namespace', 'template', 'typename',
  'static', 'bool', 'int', 'float', 'double', 'char', 'unsigned', 'nullptr',
  // ts / js
  'export', 'import', 'from', 'async', 'await', 'function', 'let', 'var', 'interface',
  'type', 'extends', 'implements', 'enum', 'as', 'yield',
  // python
  'def', 'None', 'True', 'False', 'elif', 'lambda', 'pass', 'raise', 'with', 'try',
  'except', 'finally', 'global', 'not', 'and', 'or', 'is', 'in',
  // prisma
  'model', 'generator', 'datasource',
])

function tokenizeLine(line: string, lang: string): ReactNode {
  const trimmed = line.trimStart()
  const commentTok = lang === 'python' || lang === 'ini' ? '#' : '//'

  // whole-line comment
  if (trimmed.startsWith(commentTok)) {
    return <span className="text-fg-dim italic">{line}</span>
  }
  // ini section header
  if (lang === 'ini' && /^\s*\[.+\]\s*$/.test(line)) {
    return <span className="text-signal">{line}</span>
  }

  const re =
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(@@?\w+)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)|(\s+)|([^\s])/g
  const out: ReactNode[] = []
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(line))) {
    const [full, str, dec, num, word, ws] = m
    if (str) out.push(<span key={k++} className="text-hardware">{full}</span>)
    else if (dec) out.push(<span key={k++} className="text-signal">{full}</span>)
    else if (num) out.push(<span key={k++} className="text-signal">{full}</span>)
    else if (word) {
      if (KEYWORDS.has(word)) out.push(<span key={k++} className="text-cloud">{word}</span>)
      else if (/^[A-Z]/.test(word) || /^[A-Z0-9_]+$/.test(word))
        out.push(<span key={k++} className="text-fg">{word}</span>)
      else out.push(<span key={k++} className="text-fg-muted">{word}</span>)
    } else if (ws) out.push(<span key={k++}>{ws}</span>)
    else out.push(<span key={k++} className="text-fg-dim">{full}</span>)
  }
  return out.length ? out : ' '
}

/* ---------------- animated metric value ---------------- */
function MetricValue({ value, className }: { value: string; className?: string }) {
  // animate only an integer with a purely symbolic prefix (no decimals,
  // no alphabetic prefix) — otherwise render the literal string.
  const m = value.match(/^([^\dA-Za-z]*)(\d+)(\.\d+)?(.*)$/)
  if (m && !m[3]) {
    const prefix = m[1]
    const intPart = Number(m[2])
    const suffix = m[4]
    return (
      <span className={className}>
        <span aria-hidden="true">
          {prefix}
          <CountUp value={intPart} suffix={suffix} duration={1.6} />
        </span>
        <span className="sr-only">{value}</span>
      </span>
    )
  }
  return <span className={className}>{value}</span>
}

/* ---------------- external repo button ---------------- */
function RepoButton({
  link,
  variant = 'ghost',
}: {
  link: { label: string; url: string }
  variant?: 'primary' | 'ghost'
}) {
  const isGithub = /github/i.test(link.url)
  const primary = variant === 'primary'
  return (
    <Magnetic strength={0.22}>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor
        data-cursor-label="Open repo"
        className={cn(
          'group/repo inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-300',
          primary
            ? 'bg-signal text-ink-950 hover:bg-signal-bright'
            : 'surface text-fg hover:border-line-strong',
        )}
      >
        {isGithub ? (
          <GithubIcon className={cn('h-4 w-4', primary ? 'text-ink-950' : 'text-signal')} />
        ) : (
          <Icon
            name="Code2"
            className={cn('h-4 w-4', primary ? 'text-ink-950' : 'text-signal')}
          />
        )}
        <span className="font-mono text-xs sm:text-sm">{link.label}</span>
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/repo:-translate-y-0.5 group-hover/repo:translate-x-0.5" />
      </a>
    </Magnetic>
  )
}

/* ---------------- fixed-section scaffold ---------------- */
function CaseSection({
  index,
  kicker,
  title,
  blurb,
  id,
  children,
}: {
  index: string
  kicker: string
  title: string
  blurb: string
  id?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="border-t border-line">
      <div className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-28">
            <SectionLabel index={index}>{kicker}</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,3.5vw,2.75rem)] font-semibold tracking-tight text-fg">
              {title}
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-dim">{blurb}</p>
          </Reveal>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  )
}

/* ---------------- prev / next card ---------------- */
function PrevNextCard({ project, dir }: { project: Project | null; dir: 'prev' | 'next' }) {
  const isNext = dir === 'next'
  if (!project) {
    return (
      <div
        className={cn(
          'surface flex flex-col gap-3 rounded-[var(--radius-card)] p-6 opacity-50',
          isNext && 'sm:items-end sm:text-right',
        )}
      >
        <span className="eyebrow">{isNext ? 'Next' : 'Previous'}</span>
        <p className="font-mono text-sm text-fg-dim">
          {isNext ? 'End of index' : 'Start of index'}
        </p>
      </div>
    )
  }
  const meta = categoryMeta[project.category]
  return (
    <TransitionLink
      href={`/projects/${project.slug}`}
      data-cursor
      data-cursor-label="View"
      className={cn(
        'group surface relative flex flex-col gap-3 overflow-hidden rounded-[var(--radius-card)] p-6 transition-colors duration-300 hover:border-line-strong',
        isNext && 'sm:items-end sm:text-right',
      )}
    >
      <span
        className={cn(
          'flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-fg-dim',
          isNext && 'sm:flex-row-reverse',
        )}
      >
        {isNext ? (
          <ArrowRight className="h-3.5 w-3.5 text-signal transition-transform duration-300 group-hover:translate-x-1" />
        ) : (
          <ArrowLeft className="h-3.5 w-3.5 text-signal transition-transform duration-300 group-hover:-translate-x-1" />
        )}
        {isNext ? 'Next project' : 'Previous project'}
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-fg transition-colors duration-300 group-hover:text-signal">
        {project.title}
      </span>
      <span className="font-mono text-xs" style={{ color: meta.hex }}>
        {meta.short}
      </span>
      <ArrowUpRight
        aria-hidden
        className={cn(
          'pointer-events-none absolute -bottom-6 h-28 w-28 text-fg/[0.03] transition-colors duration-300 group-hover:text-signal/[0.06]',
          isNext ? 'left-4' : '-right-6',
        )}
      />
    </TransitionLink>
  )
}

/* ============================================================
   MAIN
   ============================================================ */
export default function CaseStudy({
  project,
  prev,
  next,
}: {
  project: Project
  prev: Project | null
  next: Project | null
}) {
  const scope = useRef<HTMLElement>(null)
  const meta = categoryMeta[project.category]
  const hex = meta.hex

  useIsoLayoutEffect(() => {
    const el = scope.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      // code lines stagger in
      const codeLines = gsap.utils.toArray<HTMLElement>('[data-code-line]')
      if (codeLines.length) {
        gsap.set(codeLines, { opacity: 0, y: 10 })
        gsap.to(codeLines, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          stagger: 0.05,
          scrollTrigger: { trigger: codeLines[0], start: 'top 85%', once: true },
        })
      }
      // architecture connectors draw down
      const archLines = gsap.utils.toArray<HTMLElement>('[data-arch-line]')
      archLines.forEach((line) => {
        gsap.set(line, { scaleY: 0, transformOrigin: 'top center' })
        gsap.to(line, {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: line, start: 'top 92%', once: true },
        })
      })
    }, scope)

    return () => ctx.revert()
  }, [])

  return (
    <article ref={scope} className="relative isolate overflow-clip pb-8">
      {/* ambient category glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh]"
        style={{ background: `radial-gradient(60% 50% at 50% 0%, ${hex}14, transparent 70%)` }}
      />

      {/* ---------- BACK BAR ---------- */}
      <div className="container-x pt-28">
        <div className="flex items-center justify-between gap-4 border-b border-line pb-5 font-mono text-[0.7rem]">
          <TransitionLink
            href="/#projects"
            data-cursor
            data-cursor-label="Back"
            className="group inline-flex items-center gap-2 text-fg-muted transition-colors duration-300 hover:text-fg"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-signal transition-transform duration-300 group-hover:-translate-x-1" />
            All projects
          </TransitionLink>
          <span className="text-fg-dim">
            projects <span className="px-1 text-fg-dim/50">/</span>
            <span style={{ color: hex }}>{meta.short}</span>
          </span>
        </div>
      </div>

      {/* ---------- HERO ---------- */}
      <header className="container-x relative pt-12 md:pt-16">
        <div
          aria-hidden
          className="bg-grid absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent_78%)]"
        />

        {/* category chip */}
        <Reveal as="div" y={18}>
          <span
            className="inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5"
            style={{ borderColor: `${hex}59`, backgroundColor: `${hex}12` }}
          >
            <Icon
              name={categoryChipIcon[project.category]}
              className="h-3.5 w-3.5"
              style={{ color: hex }}
            />
            <span
              className="font-mono text-[0.7rem] uppercase tracking-[0.18em]"
              style={{ color: hex }}
            >
              {meta.label}
            </span>
          </span>
        </Reveal>

        {/* title */}
        <AnimatedHeading
          as="h1"
          immediate
          text={project.title}
          stagger={0.05}
          delay={0.05}
          className="mt-6 max-w-[18ch] text-[clamp(2.3rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-fg"
        />

        <Reveal as="p" delay={0.1} className="mt-5 font-mono text-sm text-fg-muted">
          {`// ${project.subtitle}`}
        </Reveal>

        <Reveal
          as="p"
          delay={0.16}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted"
        >
          {project.summary}
        </Reveal>

        {/* meta row */}
        <Reveal delay={0.2}>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3">
            {[
              { label: 'Year', value: project.year },
              { label: 'Role', value: project.role },
              { label: 'Duration', value: project.duration },
            ].map((row) => (
              <div key={row.label} className="bg-ink-950 p-5">
                <dt className="eyebrow">{row.label}</dt>
                <dd className="mt-2 font-mono text-sm text-fg">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* success metric highlighted */}
        <Reveal delay={0.24}>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[var(--radius-card)] border border-signal/30 bg-signal/[0.06] px-5 py-4">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-signal/70">
              Success metric
            </span>
            <span className="hidden h-4 w-px bg-signal/30 sm:block" />
            <span className="font-mono text-sm font-medium text-signal">
              {project.successMetric}
            </span>
          </div>
        </Reveal>

        {/* stack */}
        <Reveal delay={0.28}>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-fg-dim">
              Stack
            </span>
            {project.tech.map((t) => (
              <TechChip key={t}>{t}</TechChip>
            ))}
          </div>
        </Reveal>

        {/* repo links — prominent */}
        <Reveal delay={0.32}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.repoLinks.map((link, i) => (
              <RepoButton key={link.url + i} link={link} variant={i === 0 ? 'primary' : 'ghost'} />
            ))}
          </div>
        </Reveal>
      </header>

      {/* ---------- HUD strip ---------- */}
      <div className="container-x mt-14">
        <div className="flex items-center justify-between gap-4 border-y border-line py-4 font-mono text-[0.7rem] text-fg-dim">
          <span>CASE&nbsp;STUDY · {meta.short}</span>
          <span className="hidden truncate sm:inline">{project.slug}</span>
          <span>SYS / DOCUMENTED</span>
        </div>
      </div>

      {/* ---------- KEY METRICS ---------- */}
      <section className="container-x py-12 md:py-16" aria-label="Key metrics">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {project.keyMetrics.map((kmetric, i) => (
            <Reveal key={kmetric.label} delay={i * 0.07}>
              <div className="group surface relative flex h-full flex-col gap-4 overflow-hidden rounded-[var(--radius-card)] p-5 transition-colors duration-300 hover:border-line-strong md:p-6">
                <span className="font-mono text-[0.6rem] tracking-[0.25em] text-fg-dim">
                  {pad(i + 1)}
                </span>
                <MetricValue
                  value={kmetric.value}
                  className="font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl"
                />
                <span className="font-mono text-xs uppercase tracking-wide text-fg-muted">
                  {kmetric.label}
                </span>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- 01 THE PROBLEM ---------- */}
      <CaseSection
        index="01"
        kicker="Context"
        title="The Problem"
        blurb="The constraints and failure modes the system had to survive."
      >
        <Reveal>
          <p className="text-pretty text-xl leading-relaxed text-fg-muted md:text-2xl md:leading-relaxed">
            {project.problem}
          </p>
        </Reveal>
      </CaseSection>

      {/* ---------- 02 THE ARCHITECTURE ---------- */}
      <CaseSection
        index="02"
        kicker="System Design"
        title="The Architecture"
        blurb="How perception, planning, and control were decomposed across the hardware ⇄ software bridge."
      >
        <Reveal>
          <div className="mb-8 flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-fg-dim">
            <span className="h-px w-8 bg-line-strong" />
            Hardware&nbsp;⇄&nbsp;Software bridge
          </div>
          <ol className="relative">
            {project.architecture.map((step, i) => {
              const last = i === project.architecture.length - 1
              return (
                <li key={i} className="relative flex gap-5 pb-9 last:pb-0 sm:gap-6">
                  {!last && (
                    <span
                      data-arch-line
                      aria-hidden
                      className="absolute bottom-1 left-[1.125rem] top-11 w-px bg-line-strong"
                    />
                  )}
                  <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong bg-ink-900 font-mono text-xs text-signal">
                    {pad(i + 1)}
                  </span>
                  <p className="pt-1.5 text-base leading-relaxed text-fg-muted">{step}</p>
                </li>
              )
            })}
          </ol>
        </Reveal>
      </CaseSection>

      {/* ---------- 03 THE CODE / REPO ---------- */}
      <CaseSection
        index="03"
        kicker="Implementation"
        title="The Code / Repo"
        blurb="A representative slice of the implementation, plus the source itself."
      >
        <Reveal>
          <figure className="surface overflow-hidden rounded-[var(--radius-card)]">
            {/* window chrome */}
            <figcaption className="flex items-center justify-between gap-4 border-b border-line bg-ink-900/60 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span aria-hidden className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-hardware/70" />
                  <span className="h-3 w-3 rounded-full bg-signal/70" />
                  <span className="h-3 w-3 rounded-full bg-cloud/70" />
                </span>
                <span className="truncate font-mono text-xs text-signal">
                  {project.code.filename}
                </span>
              </div>
              <span className="shrink-0 rounded-full border border-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-fg-dim">
                {project.code.language}
              </span>
            </figcaption>

            {/* body */}
            <div className="relative overflow-x-auto bg-ink-950/60">
              <code className="block min-w-max py-4 font-mono text-[0.78rem] leading-[1.75]">
                {project.code.lines.map((line, i) => (
                  <div
                    key={i}
                    data-code-line
                    className="flex transition-colors duration-150 hover:bg-ink-800/30"
                  >
                    <span
                      aria-hidden
                      className="sticky left-0 z-10 mr-4 inline-block w-12 shrink-0 select-none border-r border-line bg-ink-900 px-3 text-right text-fg-dim"
                    >
                      {pad(i + 1)}
                    </span>
                    <span className="whitespace-pre pr-8 text-fg-muted">
                      {tokenizeLine(line, project.code.language)}
                    </span>
                  </div>
                ))}
              </code>
            </div>
          </figure>
        </Reveal>

        {/* repo links again */}
        <Reveal delay={0.08}>
          <div className="mt-8">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-fg-dim">
              Explore the source
            </span>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {project.repoLinks.map((link, i) => (
                <RepoButton
                  key={link.url + i}
                  link={link}
                  variant={i === 0 ? 'primary' : 'ghost'}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </CaseSection>

      {/* ---------- 04 THE RESULT ---------- */}
      <CaseSection
        index="04"
        kicker="Outcome"
        title="The Result"
        blurb="Measured outcomes and the capabilities that shipped."
      >
        <Reveal>
          <p className="text-pretty text-lg leading-relaxed text-fg-muted md:text-xl md:leading-relaxed">
            {project.result}
          </p>
        </Reveal>

        {/* success metric callout */}
        <Reveal delay={0.06}>
          <div className="relative mt-8 overflow-hidden rounded-[var(--radius-card)] border border-signal/30 bg-gradient-to-br from-signal/[0.08] to-transparent p-6 md:p-8">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-signal/70">
              Success metric
            </span>
            <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-signal md:text-3xl">
              {project.successMetric}
            </p>
            <Icon
              name="Trophy"
              aria-hidden
              className="pointer-events-none absolute -bottom-5 -right-4 h-28 w-28 text-signal/[0.06]"
            />
          </div>
        </Reveal>

        {/* shipped features */}
        <Reveal delay={0.1}>
          <div className="mt-10">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-fg-dim">
              Shipped capabilities
            </span>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {project.features.map((feature, i) => (
                <li
                  key={i}
                  className="group/feat flex items-start gap-3 rounded-xl border border-line bg-ink-900/40 p-4 transition-colors duration-300 hover:border-line-strong"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-signal/30 bg-signal/10 text-signal transition-colors duration-300 group-hover/feat:bg-signal/20">
                    <Icon name="Zap" className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-fg-muted">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </CaseSection>

      {/* ---------- GALLERY ---------- */}
      <section className="border-t border-line" aria-label="Gallery">
        <div className="container-x py-16 md:py-24">
          <Reveal>
            <SectionLabel index="05">Gallery</SectionLabel>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold tracking-tight text-fg">
              Visual documentation
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-dim">
              Reference frames from the build — schematics, field tests, and bench captures.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((frame, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <figure className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-900 transition-colors duration-300 hover:border-line-strong">
                  <div className="bg-dotgrid absolute inset-0 opacity-60" />
                  <div
                    aria-hidden
                    className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
                    style={{
                      background: `radial-gradient(120% 90% at 50% 0%, ${hex}1f, transparent 68%)`,
                    }}
                  />
                  {/* corner brackets */}
                  <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-line-strong" />
                  <span className="absolute bottom-[5.5rem] right-3 h-4 w-4 border-b border-r border-line-strong" />

                  {/* centerpiece */}
                  <div className="absolute inset-x-0 top-0 bottom-[4.5rem] flex items-center justify-center">
                    <Icon
                      name={galleryIcon[project.category]}
                      aria-hidden
                      className="h-12 w-12 transition-transform duration-500 group-hover:scale-110"
                      style={{ color: `${hex}66` }}
                    />
                  </div>

                  {/* status tag */}
                  <span className="absolute right-3 top-3 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-fg-dim/70">
                    render · pending
                  </span>

                  {/* label bar */}
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 border-t border-line bg-ink-950/75 p-4 backdrop-blur-sm">
                    <div className="min-w-0">
                      <span
                        className="font-mono text-[0.6rem] uppercase tracking-[0.2em]"
                        style={{ color: hex }}
                      >
                        Fig.&nbsp;{pad(i + 1)}
                      </span>
                      <p className="mt-1 truncate font-display text-sm font-semibold text-fg">
                        {frame.label}
                      </p>
                    </div>
                    <p className="max-w-[52%] text-right font-mono text-[0.62rem] leading-tight text-fg-dim">
                      {frame.caption}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PREV / NEXT ---------- */}
      <nav aria-label="Project navigation" className="border-t border-line">
        <div className="container-x py-14">
          <div className="grid gap-4 sm:grid-cols-2">
            <PrevNextCard project={prev} dir="prev" />
            <PrevNextCard project={next} dir="next" />
          </div>
          <div className="mt-10 flex justify-center">
            <CtaButton href="/#projects" variant="ghost" icon="arrow-right">
              Back to all projects
            </CtaButton>
          </div>
        </div>
      </nav>
    </article>
  )
}
