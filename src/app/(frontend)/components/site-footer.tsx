'use client'

import { ArrowUpRight, ArrowUp } from 'lucide-react'
import type { SiteConfig } from '@/lib/portfolio-data'
import { TransitionLink } from './ui/transition-link'
import { CtaButton } from './ui/cta-button'
import { Reveal } from './ui/reveal'
import { GithubIcon, LinkedinIcon } from './ui/brand-icons'
import { useLenis } from '../providers/smooth-scroll'

export function SiteFooter({ site }: { site: SiteConfig }) {
  const lenis = useLenis()
  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-24 border-t border-border bg-elevated">
      <div className="container-page py-20">
        <Reveal>
          <p className="eyebrow mb-6">Let’s build</p>
          <h2 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.02] tracking-tight">
            Have something <span className="display-italic">audacious</span> in mind?
          </h2>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <CtaButton href="/contact" variant="solid" icon="arrow-right">
              Start a conversation
            </CtaButton>
            <CtaButton href={`mailto:${site.email}`} variant="text" icon="arrow-up">
              {site.email}
            </CtaButton>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 border-t border-border pt-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div>
            <div className="flex items-baseline">
              <span className="font-signature text-[2.4rem] leading-none">{site.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">{site.tagline}</p>
            <p className="mt-4 text-sm text-muted-foreground">{site.location}</p>
          </div>

          {/* sitemap */}
          <nav className="flex flex-col gap-2.5">
            <p className="eyebrow mb-1">Explore</p>
            {site.nav.map((item) => (
              <TransitionLink
                key={item.href}
                href={item.href}
                data-cursor
                className="link-underline w-fit text-sm text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </TransitionLink>
            ))}
          </nav>

          {/* connect */}
          <div className="flex flex-col gap-2.5">
            <p className="eyebrow mb-1">Connect</p>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <GithubIcon className="h-4 w-4" /> <span className="link-underline">GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <LinkedinIcon className="h-4 w-4" /> <span className="link-underline">LinkedIn</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a href={`mailto:${site.email}`} className="link-underline w-fit text-sm text-muted-foreground hover:text-foreground">
              Email
            </a>
          </div>
        </div>
      </div>

      {/* giant signature */}
      <div className="pointer-events-none select-none overflow-hidden border-t border-border">
        <p className="whitespace-nowrap text-center font-signature text-[clamp(5rem,22vw,20rem)] leading-[1.15] text-foreground/10">
          {site.name}
        </p>
      </div>

      <div className="container-page flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row">
        <p>© 2026 {site.name}. Built to last.</p>
        <p className="order-3 sm:order-2">Next.js · GSAP · Lenis · 12 palettes</p>
        <button onClick={toTop} className="order-2 flex items-center gap-1.5 transition-colors hover:text-foreground sm:order-3" aria-label="Back to top">
          Back to top <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  )
}
