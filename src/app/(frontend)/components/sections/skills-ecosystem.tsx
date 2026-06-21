'use client'

import { useMemo, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import {
  skills,
  skillClusterMeta,
  projects,
  categoryMeta,
  type SkillCluster,
} from '@/lib/portfolio-data'
import { AnimatedHeading } from '../ui/animated-heading'
import { Reveal } from '../ui/reveal'
import { SectionLabel, CountUp } from '../ui/primitives'
import { Icon, type IconName } from '../ui/lucide-icon'
import { TransitionLink } from '../ui/transition-link'

/* ------------------------------------------------------------------ *
 * Cluster → accent mapping (per spec)
 *   hardware-perception → hardware amber
 *   software-backend    → signal cyan
 *   devops-deployment   → cloud violet
 * ------------------------------------------------------------------ */
const clusterAccent: Record<SkillCluster, string> = {
  'hardware-perception': '#ffb454',
  'software-backend': '#46e3ff',
  'devops-deployment': '#8f7bff',
}

const clusterOrder: SkillCluster[] = [
  'hardware-perception',
  'software-backend',
  'devops-deployment',
]

/* hex → "r, g, b" so we can build rgba() for dynamic accents */
function hexToRgb(hex: string) {
  const n = parseInt(hex.replace('#', ''), 16)
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}
function rgba(hex: string, a: number) {
  return `rgba(${hexToRgb(hex)}, ${a})`
}

function levelLabel(n: number) {
  if (n >= 90) return 'Expert'
  if (n >= 82) return 'Advanced'
  if (n >= 74) return 'Proficient'
  return 'Working'
}

/* level ring geometry */
const RING_R = 30
const RING_C = 2 * Math.PI * RING_R

export default function SkillsEcosystem() {
  const scope = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // hover drives the preview; selected pins it for touch / keyboard
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const activeName = hovered ?? selected

  const activeSkill = useMemo(
    () => (activeName ? skills.find((s) => s.name === activeName) ?? null : null),
    [activeName],
  )

  // skills that share a project with the active one — the "system" wiring
  const connectedNames = useMemo(() => {
    if (!activeSkill) return null
    const set = new Set<string>()
    for (const s of skills) {
      if (s.name === activeSkill.name) continue
      if (s.projects.some((p) => activeSkill.projects.includes(p))) set.add(s.name)
    }
    return set
  }, [activeSkill])

  const grouped = useMemo(
    () =>
      clusterOrder.map((cluster) => ({
        cluster,
        meta: skillClusterMeta[cluster],
        accent: clusterAccent[cluster],
        items: skills.filter((s) => s.cluster === cluster),
      })),
    [],
  )

  const projectBySlug = useMemo(
    () => new Map(projects.map((p) => [p.slug, p])),
    [],
  )

  const activeAccent = activeSkill ? clusterAccent[activeSkill.cluster] : '#46e3ff'
  const relatedProjects = activeSkill
    ? activeSkill.projects.map((slug) => projectBySlug.get(slug)).filter(Boolean)
    : []

  /* ---- scroll-in: cluster cards slide, chips stagger, level bars fill ---- */
  useIsoLayoutEffect(() => {
    const el = scope.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('[data-cluster]', {
        y: 44,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.13,
        scrollTrigger: { trigger: el, start: 'top 72%', once: true },
      })
      gsap.from('[data-chip]', {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.03,
        scrollTrigger: { trigger: el, start: 'top 64%', once: true },
      })
      gsap.fromTo(
        '[data-bar]',
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.02,
          scrollTrigger: { trigger: el, start: 'top 62%', once: true },
        },
      )
    }, scope)
    return () => ctx.revert()
  }, [])

  /* ---- make the connection feel alive: re-animate the readout per node ---- */
  useIsoLayoutEffect(() => {
    const el = panelRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!activeSkill) return
    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('[data-proj]')
      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07 },
        )
      }
      const ring = el.querySelector('[data-ring]')
      if (ring) {
        gsap.fromTo(
          ring,
          { strokeDashoffset: RING_C },
          { strokeDashoffset: RING_C * (1 - activeSkill.level / 100), duration: 0.9, ease: 'expo.out' },
        )
      }
    }, panelRef)
    return () => ctx.revert()
  }, [activeName, activeSkill])

  const clearSelection = () => {
    setSelected(null)
    setHovered(null)
  }

  return (
    <section
      ref={scope}
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* blueprint backdrop */}
      <div
        aria-hidden
        className="bg-dotgrid pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(120%_80%_at_50%_0%,#000_10%,transparent_70%)]"
      />

      <div className="container-x relative z-10">
        {/* ---- header ---- */}
        <SectionLabel index="02">Skills Ecosystem</SectionLabel>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2
            id="skills-heading"
            className="max-w-[15ch] text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.02em]"
          >
            <AnimatedHeading as="span" text="Not a list —" stagger={0.05} />
            <AnimatedHeading
              as="span"
              text="a system."
              delay={0.08}
              stagger={0.05}
              wordClassName="text-signal-gradient"
            />
          </h2>
          <Reveal
            as="p"
            delay={0.1}
            className="max-w-md text-pretty text-sm leading-relaxed text-fg-muted md:text-base"
          >
            Every tool here earns its place in something that shipped. Hover or tap a
            node to trace the deployments it powers — and watch the tools it works
            alongside light up across the stack.
          </Reveal>
        </div>

        {/* ---- core interaction ---- */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-12">
          {/* LEFT — three clusters */}
          <div className="flex flex-col gap-5">
            {grouped.map(({ cluster, meta, accent, items }) => (
              <section
                key={cluster}
                data-cluster
                aria-labelledby={`cluster-${cluster}`}
                className="surface rounded-[var(--radius-card)] p-6 md:p-7"
              >
                {/* cluster head */}
                <header data-cluster-head className="flex items-start gap-4">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border"
                    style={{
                      color: accent,
                      borderColor: rgba(accent, 0.32),
                      backgroundColor: rgba(accent, 0.08),
                    }}
                  >
                    <Icon name={meta.icon as IconName} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3
                      id={`cluster-${cluster}`}
                      className="font-display text-lg font-semibold tracking-tight text-fg"
                    >
                      {meta.label}
                    </h3>
                    <p className="mt-0.5 text-sm text-fg-muted">{meta.blurb}</p>
                  </div>
                  <span
                    className="shrink-0 font-mono text-[0.65rem] tabular-nums"
                    style={{ color: accent }}
                  >
                    {String(items.length).padStart(2, '0')}
                  </span>
                </header>

                {/* skill nodes */}
                <ul role="list" className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {items.map((skill) => {
                    const isActive = activeName === skill.name
                    const isConnected =
                      !isActive && (connectedNames?.has(skill.name) ?? false)
                    const isDimmed =
                      activeName != null && !isActive && !isConnected
                    const isPinned = selected === skill.name

                    return (
                      <li key={skill.name}>
                        <button
                          type="button"
                          data-chip
                          data-cursor
                          data-cursor-label="Trace"
                          aria-pressed={isPinned}
                          aria-label={`${skill.name} — ${skill.level} percent proficiency. ${
                            skill.projects.length
                              ? `${skill.projects.length} related project${
                                  skill.projects.length > 1 ? 's' : ''
                                }`
                              : 'foundational, no shipped project linked'
                          }`}
                          onMouseEnter={() => setHovered(skill.name)}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered(skill.name)}
                          onBlur={() => setHovered(null)}
                          onClick={() =>
                            setSelected((prev) =>
                              prev === skill.name ? null : skill.name,
                            )
                          }
                          className={cn(
                            'group/chip relative flex w-full flex-col gap-2.5 rounded-xl border border-line bg-ink-900/40 px-3.5 py-3 text-left transition-all duration-300',
                            'hover:border-line-strong',
                            isDimmed && 'opacity-45',
                          )}
                          style={{
                            borderColor: isActive
                              ? accent
                              : isConnected
                                ? rgba(activeAccent, 0.45)
                                : undefined,
                            backgroundColor: isActive
                              ? rgba(accent, 0.08)
                              : isConnected
                                ? rgba(activeAccent, 0.05)
                                : undefined,
                            boxShadow: isActive
                              ? `0 0 0 1px ${rgba(accent, 0.5)}, 0 12px 44px -18px ${rgba(
                                  accent,
                                  0.7,
                                )}`
                              : undefined,
                          }}
                        >
                          <span className="flex items-center justify-between gap-2">
                            <span
                              className="truncate font-mono text-[0.82rem] text-fg transition-colors duration-300"
                              style={isActive ? { color: accent } : undefined}
                            >
                              {skill.name}
                            </span>
                            <span className="flex items-center gap-1.5">
                              {isPinned && (
                                <span
                                  aria-hidden
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{ backgroundColor: accent }}
                                />
                              )}
                              <span
                                className="font-mono text-[0.62rem] tabular-nums text-fg-dim transition-colors duration-300"
                                style={isActive ? { color: accent } : undefined}
                              >
                                {skill.level}
                              </span>
                            </span>
                          </span>

                          {/* level bar */}
                          <span className="relative block h-1 w-full overflow-hidden rounded-full bg-line">
                            <span
                              data-bar
                              className="absolute inset-y-0 left-0 block rounded-full"
                              style={{
                                width: `${skill.level}%`,
                                backgroundColor: accent,
                                boxShadow: isActive
                                  ? `0 0 12px ${rgba(accent, 0.85)}`
                                  : 'none',
                                opacity: isDimmed ? 0.6 : 1,
                              }}
                            />
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>

          {/* RIGHT — live readout panel (sticky on desktop) */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div
              ref={panelRef}
              className="surface relative flex min-h-[26rem] flex-col rounded-[var(--radius-card)] p-6 md:p-7"
              style={
                activeSkill
                  ? { borderColor: rgba(activeAccent, 0.3) }
                  : undefined
              }
            >
              {/* corner ticks for the HUD feel */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t"
                style={{ borderColor: activeSkill ? rgba(activeAccent, 0.6) : 'var(--color-line-strong)' }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t"
                style={{ borderColor: activeSkill ? rgba(activeAccent, 0.6) : 'var(--color-line-strong)' }}
              />

              {activeSkill ? (
                /* -------- active node readout -------- */
                <div
                  className="flex flex-1 flex-col"
                  aria-live="polite"
                  key={activeSkill.name}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-[0.7rem] uppercase tracking-[0.22em]"
                      style={{ color: activeAccent }}
                    >
                      // active_node
                    </span>
                    {selected && (
                      <button
                        type="button"
                        data-cursor
                        onClick={clearSelection}
                        className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-fg-dim transition-colors duration-300 hover:border-line-strong hover:text-fg"
                      >
                        esc / clear
                      </button>
                    )}
                  </div>

                  {/* name + ring */}
                  <div className="mt-5 flex items-center gap-5">
                    <div className="relative h-20 w-20 shrink-0">
                      <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
                        <circle
                          cx="36"
                          cy="36"
                          r={RING_R}
                          fill="none"
                          stroke="var(--color-line-strong)"
                          strokeWidth="3.5"
                        />
                        <circle
                          data-ring
                          cx="36"
                          cy="36"
                          r={RING_R}
                          fill="none"
                          stroke={activeAccent}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeDasharray={RING_C}
                          strokeDashoffset={RING_C * (1 - activeSkill.level / 100)}
                          style={{ transition: 'stroke-dashoffset 0.7s var(--ease-out-expo)' }}
                        />
                      </svg>
                      <span className="absolute inset-0 grid place-items-center font-mono text-sm font-medium tabular-nums text-fg">
                        {activeSkill.level}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h3
                        className="font-display text-3xl font-semibold leading-none tracking-tight"
                        style={{ color: activeAccent }}
                      >
                        {activeSkill.name}
                      </h3>
                      <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-muted">
                        {skillClusterMeta[activeSkill.cluster].label}
                      </p>
                      <p className="mt-1 text-sm text-fg-dim">
                        {levelLabel(activeSkill.level)} proficiency
                      </p>
                    </div>
                  </div>

                  {/* related deployments */}
                  <div className="mt-7 border-t border-line pt-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-fg-dim">
                        // related_deployments
                      </span>
                      <span
                        className="font-mono text-[0.65rem] tabular-nums"
                        style={{ color: activeAccent }}
                      >
                        {String(relatedProjects.length).padStart(2, '0')}
                      </span>
                    </div>

                    {relatedProjects.length > 0 ? (
                      <ul role="list" className="mt-4 flex flex-col gap-2">
                        {relatedProjects.map((p, i) => {
                          if (!p) return null
                          const cat = categoryMeta[p.category]
                          return (
                            <li key={p.slug} data-proj>
                              <TransitionLink
                                href="#projects"
                                data-cursor
                                data-cursor-label="View"
                                className="group/proj flex items-center gap-3 rounded-lg border border-line bg-ink-900/40 px-3 py-2.5 transition-colors duration-300 hover:border-line-strong hover:bg-ink-850"
                              >
                                <span className="font-mono text-[0.6rem] tabular-nums text-fg-dim">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-sm text-fg transition-colors duration-300 group-hover/proj:text-signal">
                                    {p.title}
                                  </span>
                                  <span className="block truncate font-mono text-[0.62rem] text-fg-dim">
                                    {p.successMetric}
                                  </span>
                                </span>
                                <span
                                  className="shrink-0 rounded-full border px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-wide"
                                  style={{
                                    color: cat.hex,
                                    borderColor: rgba(cat.hex, 0.3),
                                    backgroundColor: rgba(cat.hex, 0.07),
                                  }}
                                >
                                  {cat.short}
                                </span>
                                <span
                                  aria-hidden
                                  className="shrink-0 text-fg-dim transition-transform duration-300 group-hover/proj:translate-x-0.5 group-hover/proj:text-signal"
                                >
                                  →
                                </span>
                              </TransitionLink>
                            </li>
                          )
                        })}
                      </ul>
                    ) : (
                      <p className="mt-4 rounded-lg border border-dashed border-line bg-ink-900/30 px-3.5 py-4 font-mono text-[0.72rem] leading-relaxed text-fg-dim">
                        // foundational — no shipped project linked.
                        <br />
                        <span className="text-fg-muted">
                          A base layer the system is built on.
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="mt-auto pt-6">
                    <p className="flex items-center justify-between border-t border-line pt-4 font-mono text-[0.62rem] text-fg-dim">
                      <span>NODE / {activeSkill.cluster.toUpperCase()}</span>
                      <span>{selected ? 'PINNED' : 'PREVIEW'}</span>
                    </p>
                  </div>
                </div>
              ) : (
                /* -------- idle / prompt state -------- */
                <div className="flex flex-1 flex-col">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-fg-dim">
                    // node_inspector :: idle
                  </span>

                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-fg">
                    Trace the wiring.
                  </h3>
                  <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-fg-muted">
                    Select any node to see the projects it powers and the tools it
                    ships beside.{' '}
                    <span className="text-fg">
                      Hover on desktop, tap on mobile.
                    </span>
                    <span aria-hidden className="caret align-middle" />
                  </p>

                  {/* overall summary */}
                  <dl className="mt-7 grid grid-cols-3 gap-3 border-y border-line py-5">
                    <div>
                      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-dim">
                        Nodes
                      </dt>
                      <dd className="mt-1 font-display text-2xl font-semibold text-signal">
                        <CountUp value={skills.length} />
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-dim">
                        Clusters
                      </dt>
                      <dd className="mt-1 font-display text-2xl font-semibold text-fg">
                        <CountUp value={clusterOrder.length} />
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-dim">
                        Deploys
                      </dt>
                      <dd className="mt-1 font-display text-2xl font-semibold text-fg">
                        <CountUp value={projects.length} />
                      </dd>
                    </div>
                  </dl>

                  {/* cluster legend */}
                  <ul role="list" className="mt-5 flex flex-col gap-3">
                    {grouped.map(({ cluster, meta, accent, items }) => (
                      <li
                        key={cluster}
                        className="flex items-center gap-3 font-mono text-xs"
                      >
                        <span
                          aria-hidden
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{
                            backgroundColor: accent,
                            boxShadow: `0 0 10px ${rgba(accent, 0.7)}`,
                          }}
                        />
                        <span className="flex-1 truncate text-fg-muted">
                          {meta.label}
                        </span>
                        <span className="tabular-nums text-fg-dim">
                          {String(items.length).padStart(2, '0')}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <p className="flex items-center justify-between border-t border-line pt-4 font-mono text-[0.62rem] text-fg-dim">
                      <span>SYS / READY</span>
                      <span>AWAITING_NODE</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* ---- bottom HUD strip ---- */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 font-mono text-[0.7rem] text-fg-dim">
          <span>NODES // {String(skills.length).padStart(2, '0')}</span>
          <span className="hidden sm:inline">
            CLUSTERS // {String(clusterOrder.length).padStart(2, '0')}
          </span>
          <span className="hidden md:inline">
            DEPLOYMENTS // {String(projects.length).padStart(2, '0')}
          </span>
          <span>SYS / MAPPED</span>
        </div>
      </div>
    </section>
  )
}
