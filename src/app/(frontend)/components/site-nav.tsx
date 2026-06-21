'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { gsap } from '@/lib/gsap'
import { TransitionLink } from './ui/transition-link'
import { Magnetic } from './ui/magnetic'
import { GithubIcon, LinkedinIcon } from './ui/brand-icons'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('top')
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)
  const overlay = useRef<HTMLDivElement>(null)

  // scroll-aware show/hide + background
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 32)
      setHidden(y > lastY.current && y > 420 && !menuOpen)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  // active-section tracking
  useEffect(() => {
    const ids = ['top', ...siteConfig.nav.map((n) => n.href.slice(1))]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // animate mobile menu overlay
  useEffect(() => {
    const el = overlay.current
    if (!el) return
    if (menuOpen) {
      gsap.set(el, { display: 'flex' })
      gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'expo.inOut' })
      gsap.fromTo('[data-menu-item]', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', stagger: 0.08, delay: 0.2 })
    } else {
      gsap.to(el, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.5,
        ease: 'expo.inOut',
        onComplete: () => gsap.set(el, { display: 'none' }),
      })
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[90] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          hidden ? '-translate-y-full' : 'translate-y-0',
        )}
      >
        <div
          className={cn(
            'transition-colors duration-500',
            scrolled ? 'border-b border-line bg-ink-950/70 backdrop-blur-xl' : 'border-b border-transparent',
          )}
        >
          <nav className="container-x flex h-16 items-center justify-between md:h-20">
            {/* logo mark */}
            <TransitionLink href="#top" className="group flex items-center gap-2.5" data-cursor>
              <span className="relative flex h-8 w-8 items-center justify-center rounded-md border border-line-strong font-display text-sm font-bold text-signal">
                M
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-signal" />
              </span>
              <span className="font-display text-sm font-semibold tracking-tight text-fg">
                {siteConfig.shortName}
                <span className="text-fg-dim">.rahman</span>
              </span>
            </TransitionLink>

            {/* desktop links */}
            <div className="hidden items-center gap-1 md:flex">
              {siteConfig.nav.map((item) => (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  data-cursor
                  className={cn(
                    'group relative rounded-full px-4 py-2 text-sm transition-colors duration-300',
                    active === item.href.slice(1) ? 'text-fg' : 'text-fg-muted hover:text-fg',
                  )}
                >
                  <span className="mr-1.5 font-mono text-[0.65rem] text-signal/70">
                    {item.index}
                  </span>
                  {item.label}
                  <span
                    className={cn(
                      'absolute inset-x-4 bottom-1 h-px origin-left bg-signal transition-transform duration-300',
                      active === item.href.slice(1) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </TransitionLink>
              ))}
            </div>

            {/* socials + CTA */}
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1 sm:flex">
                <IconLink href={siteConfig.github} label="GitHub">
                  <GithubIcon className="h-4 w-4" />
                </IconLink>
                <IconLink href={siteConfig.linkedin} label="LinkedIn">
                  <LinkedinIcon className="h-4 w-4" />
                </IconLink>
              </div>
              <Magnetic strength={0.3} className="hidden md:block">
                <TransitionLink
                  href="#about"
                  data-cursor
                  className="ml-1 rounded-full bg-fg px-5 py-2 text-sm font-medium text-ink-950 transition-colors duration-300 hover:bg-signal"
                >
                  Get in touch
                </TransitionLink>
              </Magnetic>

              {/* mobile toggle */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-fg md:hidden"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* mobile full-screen menu */}
      <div
        ref={overlay}
        className="fixed inset-0 z-[80] hidden flex-col justify-center bg-ink-950/95 px-8 backdrop-blur-2xl md:!hidden"
        style={{ display: 'none' }}
      >
        <div className="bg-grid absolute inset-0 opacity-40" />
        <nav className="relative flex flex-col gap-2">
          {siteConfig.nav.map((item) => (
            <TransitionLink
              key={item.href}
              href={item.href}
              data-menu-item
              onClick={() => setMenuOpen(false)}
              className="flex items-baseline gap-4 border-b border-line py-4"
            >
              <span className="font-mono text-xs text-signal">{item.index}</span>
              <span className="font-display text-4xl font-semibold tracking-tight">{item.label}</span>
            </TransitionLink>
          ))}
        </nav>
        <div data-menu-item className="relative mt-10 flex items-center gap-4">
          <IconLink href={siteConfig.github} label="GitHub">
            <GithubIcon className="h-5 w-5" />
          </IconLink>
          <IconLink href={siteConfig.linkedin} label="LinkedIn">
            <LinkedinIcon className="h-5 w-5" />
          </IconLink>
          <a href={`mailto:${siteConfig.email}`} className="font-mono text-sm text-fg-muted">
            {siteConfig.email}
          </a>
        </div>
      </div>
    </>
  )
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-cursor
      className="flex h-10 w-10 items-center justify-center rounded-full text-fg-muted transition-colors duration-300 hover:bg-ink-800 hover:text-fg"
    >
      {children}
    </a>
  )
}
