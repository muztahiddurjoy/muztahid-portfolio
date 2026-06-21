'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import type { SiteConfig } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { gsap } from '@/lib/gsap'
import { TransitionLink } from './ui/transition-link'
import { ThemeSwitcher } from './ui/theme-switcher'
import { GithubIcon, LinkedinIcon } from './ui/brand-icons'

export function SiteNav({ site }: { site: SiteConfig }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const overlay = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > lastY.current && y > 480 && !open)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  // close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const el = overlay.current
    if (!el) return
    if (open) {
      gsap.set(el, { display: 'flex' })
      gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power4.inOut' })
      gsap.fromTo('[data-mitem]', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.07, delay: 0.18 })
    } else {
      gsap.to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.5, ease: 'power4.inOut', onComplete: () => gsap.set(el, { display: 'none' }) })
    }
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[90] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          hidden ? '-translate-y-full' : 'translate-y-0',
        )}
      >
        <div className={cn('transition-colors duration-500', scrolled ? 'border-b border-border bg-background/80 backdrop-blur-xl' : 'border-b border-transparent')}>
          <nav className="container-page flex h-18 items-center justify-between py-4">
            <TransitionLink href="/" data-cursor aria-label={site.name} className="group flex items-baseline">
              <span className="font-signature text-[2rem] leading-none text-foreground transition-opacity group-hover:opacity-70">
                {site.name}
              </span>
            </TransitionLink>

            <div className="hidden items-center gap-7 lg:flex">
              {site.nav.map((item) => (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  data-cursor
                  className={cn(
                    'link-underline text-sm tracking-tight transition-colors duration-300',
                    isActive(item.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {item.label}
                </TransitionLink>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ThemeSwitcher className="hidden sm:block" />
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-border-strong lg:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* mobile / overlay menu */}
      <div
        ref={overlay}
        className="fixed inset-0 z-[80] hidden flex-col justify-center bg-background px-8 lg:!hidden"
        style={{ display: 'none' }}
      >
        <div className="bg-dotgrid absolute inset-0 opacity-40" />
        <nav className="relative flex flex-col">
          {site.nav.map((item, i) => (
            <TransitionLink
              key={item.href}
              href={item.href}
              data-mitem
              className="flex items-baseline gap-4 border-b border-border py-4"
            >
              <span className="font-script text-lg text-muted-foreground">0{i + 1}</span>
              <span className="font-display text-4xl tracking-tight">{item.label}</span>
            </TransitionLink>
          ))}
        </nav>
        <div data-mitem className="relative mt-10 flex items-center gap-4">
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full border border-border">
            <GithubIcon className="h-5 w-5" />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border border-border">
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <ThemeSwitcher align="left" />
        </div>
      </div>
    </>
  )
}
