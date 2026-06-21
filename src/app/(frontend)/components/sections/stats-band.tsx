'use client'

import { stats } from '@/lib/portfolio-data'
import { CountUp } from '../ui/primitives'
import { Reveal } from '../ui/reveal'

// A thin "instrumentation readout" band of headline metrics between the hero
// and the projects matrix.
export function StatsBand() {
  return (
    <section aria-label="Key metrics" className="relative border-b border-line py-14 md:py-20">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="group relative">
            <span className="absolute -left-3 top-1 font-mono text-[0.6rem] text-fg-dim">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="font-display text-5xl font-semibold tracking-tight text-fg md:text-6xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 h-px w-8 bg-signal/60 transition-all duration-500 group-hover:w-16" />
            <p className="mt-3 text-sm text-fg-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
