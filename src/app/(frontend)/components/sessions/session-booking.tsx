'use client'

import {
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import { sessionModeMeta, type Session, type SessionPageData } from '@/lib/portfolio-data'
import { Reveal } from '../ui/reveal'
import { Eyebrow, AccentText } from '../ui/primitives'
import { Magnetic } from '../ui/magnetic'
import { usePreview } from '../preview-context'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldId = 'name' | 'email' | 'goal'
type FormState = {
  name: string
  email: string
  goal: string
  preferredMode: string
  preferredDate: string
  company: string
}
type FieldErrors = Partial<Record<FieldId, string>>
type Status = 'idle' | 'sending' | 'sent'

/** The availability-aware CTA / submit label. */
function ctaLabel(session: Session, b: SessionPageData['booking']): string {
  if (session.availability === 'closed') return b.closedLabel
  if (session.availability === 'waitlist') return b.waitlistLabel
  return b.openLabel
}

/* ---------- one field (label as eyebrow + warm input) ---------- */
function Field({
  id,
  label,
  value,
  onChange,
  error,
  disabled,
  type = 'text',
  textarea = false,
  placeholder,
  autoComplete,
  required = false,
  hint,
}: {
  id: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  disabled?: boolean
  type?: string
  textarea?: boolean
  placeholder?: string
  autoComplete?: string
  required?: boolean
  hint?: string
}) {
  const errorId = `${id}-error`
  const field =
    'mt-3 block w-full rounded-[var(--radius)] border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/55 outline-none transition-colors duration-300 focus:border-foreground disabled:opacity-60'
  return (
    <div>
      <label htmlFor={id} className="eyebrow flex items-baseline gap-2">
        <span>{label}</span>
        {(required || hint) && (
          <span className="font-script text-[0.95rem] normal-case tracking-normal text-muted-foreground">
            {required ? 'required' : hint}
          </span>
        )}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={4}
          placeholder={placeholder}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(field, 'resize-none', error ? 'border-foreground' : 'border-border')}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(field, error ? 'border-foreground' : 'border-border')}
        />
      )}
      {error && (
        <p id={errorId} className="mt-2 text-xs text-muted-foreground">
          <span className="display-italic text-foreground">{error}</span>
        </p>
      )}
    </div>
  )
}

function Invitation({ b, children }: { b: SessionPageData['booking']; children?: ReactNode }) {
  return (
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
      {children}
    </div>
  )
}

/**
 * Booking section for a session. Progressive enhancement: an on-page request
 * form posts to /api/session-request and stores a booking request; an external
 * scheduler (when configured) is offered as the fast path, and a mailto remains
 * as a no-JS / API-down fallback. The submit label and copy adapt to the
 * session's availability (open → request, waitlist → join, closed → notify).
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
  const isPreview = usePreview()
  const email = session.booking.email || siteEmail
  const mailto = `mailto:${email}?subject=${encodeURIComponent(`Session: ${session.title}`)}`
  // External scheduler is only offered while booking is actually open.
  const useExternal = session.booking.type === 'link' && !!session.booking.url && session.availability !== 'closed'
  // Only hybrid sessions ask which mode you'd prefer; otherwise it's fixed.
  const askMode = session.mode === 'hybrid'

  const [values, setValues] = useState<FormState>({
    name: '',
    email: '',
    goal: '',
    preferredMode: askMode ? 'either' : session.mode,
    preferredDate: '',
    company: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const successRef = useRef<HTMLDivElement>(null)

  // soft entrance for the success confirmation (final state shown when reduced)
  useIsoLayoutEffect(() => {
    if (status !== 'sent') return
    const el = successRef.current
    if (!el) return
    if (isPreview || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('[data-rise]', { y: 24, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.1 })
    }, successRef)
    return () => ctx.revert()
  }, [status])

  const update =
    (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const v = e.target.value
      setValues((s) => ({ ...s, [key]: v }))
      if ((key === 'name' || key === 'email' || key === 'goal') && errors[key]) {
        setErrors((s) => ({ ...s, [key]: undefined }))
      }
    }

  const validate = (s: FormState): FieldErrors => {
    const next: FieldErrors = {}
    if (!s.name.trim()) next.name = b.errors.nameRequired
    if (!s.email.trim()) next.email = b.errors.emailRequired
    else if (!EMAIL_RE.test(s.email.trim())) next.email = b.errors.emailInvalid
    if (!s.goal.trim()) next.goal = b.errors.goalRequired
    return next
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    if (values.company.trim() !== '') return // honeypot

    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length > 0) {
      document.getElementById(Object.keys(next)[0])?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/session-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          goal: values.goal.trim(),
          preferredMode: values.preferredMode,
          preferredDate: values.preferredDate.trim(),
          sessionSlug: session.slug,
          sessionTitle: session.title,
          company: values.company,
        }),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      setStatus('sent')
    } catch {
      setStatus('idle')
      setErrors({ goal: b.errors.submitFailed })
    }
  }

  const reset = () => {
    setValues({
      name: '',
      email: '',
      goal: '',
      preferredMode: askMode ? 'either' : session.mode,
      preferredDate: '',
      company: '',
    })
    setErrors({})
    setStatus('idle')
  }

  const firstName = values.name.trim().split(/\s+/)[0]

  return (
    <section id="book" aria-label={b.eyebrow} className="scroll-mt-28 border-t border-border bg-elevated">
      <div className="container-page py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
          {/* left — invitation */}
          <Invitation b={b}>
            {/* extra session links live under the invitation on wide screens */}
            {session.links.length > 0 && (
              <Reveal delay={0.24}>
                <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6">
                  {session.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className="group/link inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="link-underline">{link.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  ))}
                </div>
              </Reveal>
            )}
          </Invitation>

          {/* right — the card: external CTA + request form / confirmation */}
          <Reveal delay={0.12}>
            <div className="rounded-[var(--radius-xl)] border border-border bg-background p-6 sm:p-8 md:p-10">
              {/* fast path — external scheduler */}
              {useExternal && (
                <div className="mb-8 border-b border-border pb-8">
                  <Magnetic strength={0.25} className="w-full">
                    <a
                      href={session.booking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className="group/cta flex w-full items-center justify-between gap-3 rounded-full bg-foreground px-7 py-4 text-sm font-medium tracking-tight text-background transition-opacity duration-300 hover:opacity-90"
                    >
                      <span>{b.externalLabel}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                    </a>
                  </Magnetic>
                  <p className="mt-4 text-center font-script text-lg text-muted-foreground">{b.orFormLabel}</p>
                </div>
              )}

              {status === 'sent' ? (
                <div ref={successRef} className="flex flex-col items-start">
                  <span data-rise className="font-script text-[clamp(1.9rem,4vw,2.8rem)] leading-none text-muted-foreground">
                    {b.success.script}
                  </span>
                  <h3 data-rise className="mt-4 font-display text-2xl leading-[1.1] tracking-tight md:text-[2rem]">
                    <AccentText text={b.success.heading} accent={b.success.headingAccent} />
                  </h3>
                  <p data-rise className="mt-5 max-w-sm text-muted-foreground">
                    {b.success.body.replace('{name}', firstName ? `, ${firstName}` : '')}
                  </p>
                  <button
                    data-rise
                    data-cursor
                    type="button"
                    onClick={reset}
                    className="group/cta mt-8 inline-flex items-center gap-1.5 text-sm font-medium"
                  >
                    <span className="link-underline">{b.success.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                  </button>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit} className="relative">
                  <p className="font-script text-[clamp(1.5rem,2.8vw,2rem)] leading-none text-muted-foreground">
                    {session.booking.note}
                  </p>

                  <div className="mt-7 flex flex-col gap-6">
                    <Field
                      id="name"
                      label={b.nameLabel}
                      value={values.name}
                      onChange={update('name')}
                      error={errors.name}
                      disabled={status === 'sending'}
                      autoComplete="name"
                      placeholder={b.namePlaceholder}
                      required
                    />
                    <Field
                      id="email"
                      label={b.emailLabel}
                      type="email"
                      value={values.email}
                      onChange={update('email')}
                      error={errors.email}
                      disabled={status === 'sending'}
                      autoComplete="email"
                      placeholder={b.emailPlaceholder}
                      required
                    />
                    <Field
                      id="goal"
                      label={b.goalLabel}
                      textarea
                      value={values.goal}
                      onChange={update('goal')}
                      error={errors.goal}
                      disabled={status === 'sending'}
                      placeholder={b.goalPlaceholder}
                      required
                    />

                    <div className={cn('grid gap-6', askMode ? 'sm:grid-cols-2' : 'sm:grid-cols-1')}>
                      {askMode && (
                        <div>
                          <label htmlFor="preferredMode" className="eyebrow">
                            {b.preferredModeLabel}
                          </label>
                          <select
                            id="preferredMode"
                            name="preferredMode"
                            value={values.preferredMode}
                            onChange={update('preferredMode')}
                            disabled={status === 'sending'}
                            className="mt-3 block w-full rounded-[var(--radius)] border border-border bg-card px-4 py-3 text-foreground outline-none transition-colors duration-300 focus:border-foreground disabled:opacity-60"
                          >
                            <option value="online">{sessionModeMeta.online.label}</option>
                            <option value="offline">{sessionModeMeta.offline.label}</option>
                            <option value="either">Either</option>
                          </select>
                        </div>
                      )}
                      <Field
                        id="preferredDate"
                        label={b.preferredDateLabel}
                        value={values.preferredDate}
                        onChange={update('preferredDate')}
                        disabled={status === 'sending'}
                        placeholder="e.g. weekday evenings"
                        hint={b.preferredDateHint}
                      />
                    </div>
                  </div>

                  {/* honeypot — visually hidden, ignored by humans */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
                  >
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.company}
                      onChange={update('company')}
                    />
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
                    <Magnetic strength={0.3} className="w-fit">
                      <button
                        type="submit"
                        data-cursor
                        disabled={status === 'sending'}
                        className="group/cta inline-flex items-center gap-2.5 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium tracking-tight text-background transition-all duration-400 hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                      >
                        <span>{status === 'sending' ? b.sendingLabel : ctaLabel(session, b)}</span>
                        {status === 'sending' ? (
                          <span
                            aria-hidden
                            className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background"
                          />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                        )}
                      </button>
                    </Magnetic>
                    <span className="font-script text-lg text-muted-foreground">{b.footnote}</span>
                  </div>

                  {/* no-JS / API-down fallback */}
                  <p className="mt-6 text-sm text-muted-foreground">
                    <a href={mailto} data-cursor className="link-underline">
                      {ctaLabel(session, b)} — {email}
                    </a>
                  </p>

                  <p className="sr-only" role="status" aria-live="polite">
                    {status === 'sending' ? 'Sending your request' : ''}
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
