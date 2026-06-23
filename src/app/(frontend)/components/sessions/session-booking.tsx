'use client'

import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Session, SessionPageData } from '@/lib/portfolio-data'
import { Reveal } from '../ui/reveal'
import { Eyebrow, AccentText } from '../ui/primitives'
import { Magnetic } from '../ui/magnetic'

/** The availability-aware CTA label. */
function ctaLabel(session: Session, b: SessionPageData['booking']): string {
  if (session.availability === 'closed') return b.closedLabel
  if (session.availability === 'waitlist') return b.waitlistLabel
  return b.openLabel
}

/**
 * Booking section for a session. A no-JS-safe block: an availability-aware
 * mailto (or an external scheduler link when configured) plus any extra
 * session links. Step 7 layers an on-page request form on top of this.
 */
export function SessionBooking({
  session,
  labels,
  siteEmail,
}: {
  session: Session
  labels: SessionPageData
  siteEmail: string
}) {
  const b = labels.booking
  const email = session.booking.email || siteEmail
  const mailto = `mailto:${email}?subject=${encodeURIComponent(`Session: ${session.title}`)}`
  // An external scheduler is only offered while booking is actually open.
  const useExternal = session.booking.type === 'link' && !!session.booking.url && session.availability !== 'closed'

  return (
    <section id="book" aria-label={b.eyebrow} className="scroll-mt-28 border-t border-border bg-elevated">
      <div className="container-page py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
          {/* left — invitation */}
          <div>
            <Reveal>
              <Eyebrow>{b.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02] tracking-tight">
                <AccentText text={b.heading} accent={b.headingAccent} />
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">{b.body}</p>
            </Reveal>
          </div>

          {/* right — CTAs */}
          <Reveal delay={0.12}>
            <div className="rounded-[var(--radius-xl)] border border-border bg-background p-7 sm:p-9 md:p-10">
              <p className="font-script text-[clamp(1.6rem,3vw,2.2rem)] leading-none text-muted-foreground">
                {session.booking.note}
              </p>

              <div className="mt-8 flex flex-col gap-4">
                <Magnetic strength={0.25} className="w-full">
                  <a
                    href={useExternal ? session.booking.url : mailto}
                    {...(useExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    data-cursor
                    className="group/cta flex w-full items-center justify-between gap-3 rounded-full bg-foreground px-7 py-4 text-sm font-medium tracking-tight text-background transition-opacity duration-300 hover:opacity-90"
                  >
                    <span>{useExternal ? b.externalLabel : ctaLabel(session, b)}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                  </a>
                </Magnetic>

                {/* when an external scheduler is the primary path, email stays as a fallback */}
                {useExternal && (
                  <a
                    href={mailto}
                    data-cursor
                    className="group/alt inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="link-underline">{ctaLabel(session, b)}</span>
                  </a>
                )}
              </div>

              {/* extra session links */}
              {session.links.length > 0 && (
                <div className="mt-8 border-t border-border pt-6">
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {session.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor
                        className={cn(
                          'group/link inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground',
                        )}
                      >
                        <span className="link-underline">{link.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
