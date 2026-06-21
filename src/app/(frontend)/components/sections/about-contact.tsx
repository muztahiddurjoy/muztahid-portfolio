'use client'

import { useRef, useState, type ReactNode } from 'react'
import {
  Mail,
  Send,
  Check,
  Copy,
  ArrowUpRight,
  Loader2,
  MapPin,
  AlertCircle,
} from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useIsoLayoutEffect } from '@/lib/use-iso-layout-effect'
import { cn } from '@/lib/utils'
import { about, siteConfig } from '@/lib/portfolio-data'
import { Reveal } from '../ui/reveal'
import { AnimatedHeading } from '../ui/animated-heading'
import { Magnetic } from '../ui/magnetic'
import { SectionLabel, TechChip } from '../ui/primitives'
import { Icon } from '../ui/lucide-icon'
import { GithubIcon, LinkedinIcon } from '../ui/brand-icons'

/* ------------------------------------------------------------------ */
/* helpers                                                            */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// phrases in the mission quote that receive the cyan→violet gradient
const MISSION_HIGHLIGHTS = ['W123', 'over-engineered', 'outlast its creator']

// 23.81°N 90.41°E — Dhaka; mirrors the hero HUD coordinate motif
const COORDS = '23.81°N · 90.41°E'

type FieldKey = 'name' | 'email' | 'message'
type Values = Record<FieldKey, string> & { company: string }
type Errors = Partial<Record<FieldKey, string>>
type Status = 'idle' | 'sending' | 'sent'

function fieldError(key: FieldKey, raw: string): string | undefined {
  const value = raw.trim()
  if (key === 'name') return value ? undefined : 'Please enter your name.'
  if (key === 'email') {
    if (!value) return 'Please enter your email.'
    return EMAIL_RE.test(value) ? undefined : 'That email doesn’t look right.'
  }
  // message
  if (!value) return 'Please include a short message.'
  return value.length < 10 ? 'A little more context helps — 10+ characters.' : undefined
}

// wrap selected phrases of a string in the signal gradient, leave the rest plain
function highlightPhrases(text: string, phrases: string[]): ReactNode[] {
  if (!phrases.length) return [text]
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const re = new RegExp(`(${escaped.join('|')})`, 'g')
  return text.split(re).map((part, i) =>
    phrases.includes(part) ? (
      <span key={i} className="text-signal-gradient">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

/* ------------------------------------------------------------------ */
/* main section                                                       */
/* ------------------------------------------------------------------ */

export default function AboutContact() {
  const root = useRef<HTMLElement>(null)

  // form state
  const [values, setValues] = useState<Values>({
    name: '',
    email: '',
    message: '',
    company: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const refs: Record<FieldKey, React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>> = {
    name: nameRef,
    email: emailRef,
    message: messageRef,
  }

  /* ---- ambient / decorative motion (scoped, reduced-motion guarded) ---- */
  useIsoLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) return
      // sweeping scan band inside the portrait
      gsap.fromTo(
        '[data-scanline]',
        { yPercent: -130 },
        { yPercent: 260, duration: 4.4, ease: 'sine.inOut', repeat: -1, repeatDelay: 0.5 },
      )
      // corner ticks register in as the portrait enters
      gsap.from('[data-corner]', {
        opacity: 0,
        scale: 0.3,
        duration: 0.7,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-portrait]', start: 'top 82%', once: true },
      })
      // featherweight parallax on the portrait inner plate
      gsap.to('[data-portrait-inner]', {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-portrait]',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  /* ---- form handlers ---- */
  const update = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value
    setValues((prev) => ({ ...prev, [key]: v }))
    if (key !== 'company' && errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: fieldError(key, v) }))
    }
  }

  const handleBlur = (key: FieldKey) => () => {
    setErrors((prev) => ({ ...prev, [key]: fieldError(key, values[key]) }))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // honeypot: a bot filled the hidden field — silently acknowledge, no-op
    if (values.company) {
      setStatus('sent')
      return
    }
    const next: Errors = {
      name: fieldError('name', values.name),
      email: fieldError('email', values.email),
      message: fieldError('message', values.message),
    }
    const cleaned: Errors = Object.fromEntries(
      Object.entries(next).filter(([, v]) => Boolean(v)),
    )
    setErrors(cleaned)
    if (Object.keys(cleaned).length) {
      const order: FieldKey[] = ['name', 'email', 'message']
      const first = order.find((k) => cleaned[k])
      if (first) refs[first].current?.focus()
      return
    }
    // dummy front-end — no network. Simulate a transmit.
    setStatus('sending')
    window.setTimeout(() => setStatus('sent'), 900)
  }

  const reset = () => {
    setValues({ name: '', email: '', message: '', company: '' })
    setErrors({})
    setStatus('idle')
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — mailto still works */
    }
  }

  const sending = status === 'sending'

  return (
    <section
      ref={root}
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* ambient backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(120%_80%_at_50%_0%,#000_10%,transparent_72%)]" />
        <div className="absolute -left-32 top-24 h-[28rem] w-[28rem] rounded-full bg-signal/10 blur-[140px] [animation:drift_22s_ease-in-out_infinite]" />
        <div className="absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-cloud/10 blur-[150px] [animation:drift_26s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="container-x">
        {/* ---- section header ---- */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionLabel index="04">About &amp; Mission</SectionLabel>
          <p className="max-w-sm font-mono text-[0.7rem] leading-relaxed text-fg-dim md:text-right">
            // the engineer behind the systems — and the open inbox at the end of it.
          </p>
        </div>

        {/* ================= TOP: portrait + mission ================= */}
        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — redacted lab portrait */}
          <div className="lg:col-span-5">
            <LabPortrait />
          </div>

          {/* RIGHT — mission pull-quote + narrative */}
          <div className="flex flex-col lg:col-span-7">
            <Reveal>
              <figure className="relative">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-1 -top-8 select-none font-display text-7xl leading-none text-signal/15 md:-top-10 md:text-8xl"
                >
                  &ldquo;
                </span>
                <h2
                  id="about-heading"
                  className="relative text-balance font-display text-[clamp(1.6rem,3.1vw,2.6rem)] font-medium leading-[1.18] tracking-[-0.015em] text-fg"
                >
                  {highlightPhrases(about.mission, MISSION_HIGHLIGHTS)}
                </h2>
                <figcaption className="mt-5 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-fg-dim">
                  <span className="h-px w-8 bg-line-strong" />
                  Operating philosophy
                </figcaption>
              </figure>
            </Reveal>

            <div className="mt-10 flex flex-col gap-6">
              {about.narrative.map((para, i) => (
                <Reveal key={i} delay={0.06 * i}>
                  <p className="max-w-[60ch] text-pretty leading-relaxed text-fg-muted">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ================= education strip ================= */}
        <Reveal className="mt-8" y={20}>
          <div className="surface rounded-[var(--radius-card)] p-6 md:p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              {/* degree block */}
              <div className="flex items-start gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line-strong bg-ink-850 text-signal">
                  <Icon name="GraduationCap" className="h-5 w-5" />
                </span>
                <div>
                  <p className="eyebrow mb-2">// education</p>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-fg md:text-2xl">
                    {about.education.degree}
                  </h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fg-muted">
                    <span>{about.education.university}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-signal">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                      </span>
                      {about.education.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* coursework */}
              <div className="lg:max-w-[58%]">
                <p className="eyebrow mb-3 lg:text-right">// relevant coursework</p>
                <ul className="flex flex-wrap gap-2 lg:justify-end">
                  {about.education.coursework.map((course) => (
                    <li key={course}>
                      <TechChip>{course}</TechChip>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ================= CONTACT ================= */}
        <div id="contact" className="mt-24 md:mt-32">
          <div className="max-w-3xl">
            <Reveal y={16}>
              <p className="eyebrow mb-5">// open channel</p>
            </Reveal>
            <AnimatedHeading
              as="h2"
              text={about.contact.heading}
              className="text-balance font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-gradient"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-pretty leading-relaxed text-fg-muted md:text-lg">
                {about.contact.blurb}
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
            {/* ---- direct channels ---- */}
            <Reveal y={24}>
              <aside className="surface flex h-full flex-col gap-7 rounded-[var(--radius-card)] p-6 md:p-8">
                {/* availability */}
                <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-line-strong bg-ink-850 px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                  </span>
                  <span className="font-mono text-[0.7rem] tracking-wide text-fg-muted">
                    {siteConfig.availability}
                  </span>
                </div>

                {/* email — primary direct line */}
                <div>
                  <p className="eyebrow mb-3">// direct line</p>
                  <div className="flex items-stretch gap-2">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      data-cursor
                      data-cursor-label="Email"
                      className="group/mail flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-line bg-ink-850 px-4 py-3.5 transition-colors duration-300 hover:border-signal/60"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-signal" />
                      <span className="truncate font-mono text-sm text-fg transition-colors group-hover/mail:text-signal">
                        {siteConfig.email}
                      </span>
                      <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-fg-dim transition-all duration-300 group-hover/mail:-translate-y-0.5 group-hover/mail:translate-x-0.5 group-hover/mail:text-signal" />
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      data-cursor
                      data-cursor-label={copied ? 'Copied' : 'Copy'}
                      aria-label={copied ? 'Email address copied' : 'Copy email address'}
                      className="grid w-12 shrink-0 place-items-center rounded-xl border border-line bg-ink-850 text-fg-muted transition-colors duration-300 hover:border-signal/60 hover:text-signal"
                    >
                      {copied ? <Check className="h-4 w-4 text-signal" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <span aria-live="polite" className="sr-only">
                    {copied ? 'Email address copied to clipboard' : ''}
                  </span>
                </div>

                {/* social */}
                <div>
                  <p className="eyebrow mb-3">// elsewhere</p>
                  <div className="flex flex-wrap gap-3">
                    <SocialButton
                      href={siteConfig.github}
                      label="GitHub"
                      handle="@muztahiddurjoy"
                    >
                      <GithubIcon className="h-5 w-5" />
                    </SocialButton>
                    <SocialButton
                      href={siteConfig.linkedin}
                      label="LinkedIn"
                      handle="in/muztahiddurjoy"
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </SocialButton>
                  </div>
                </div>

                {/* location footer */}
                <div className="mt-auto flex items-center justify-between border-t border-line pt-5 font-mono text-[0.7rem] text-fg-dim">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-signal/70" />
                    {siteConfig.location}
                  </span>
                  <span className="hidden sm:inline">{COORDS}</span>
                </div>
              </aside>
            </Reveal>

            {/* ---- contact form ---- */}
            <Reveal y={24} delay={0.08}>
              <div className="surface rounded-[var(--radius-card)] p-6 md:p-8">
                {status === 'sent' ? (
                  <SuccessPanel onReset={reset} />
                ) : (
                  <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <p className="eyebrow">// transmit a message</p>
                      <span className="font-mono text-[0.65rem] text-fg-dim">ENC · TLS</span>
                    </div>

                    {/* honeypot — visually hidden, off the a11y + tab path */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden opacity-0"
                    >
                      <label htmlFor="company">Company (leave this field empty)</label>
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

                    {/* name */}
                    <FormField
                      id="name"
                      label="Your name"
                      error={errors.name}
                    >
                      <input
                        ref={nameRef}
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Ada Lovelace"
                        disabled={sending}
                        value={values.name}
                        onChange={update('name')}
                        onBlur={handleBlur('name')}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={inputClass(Boolean(errors.name))}
                      />
                    </FormField>

                    {/* email */}
                    <FormField
                      id="email"
                      label="Email address"
                      error={errors.email}
                    >
                      <input
                        ref={emailRef}
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@domain.com"
                        disabled={sending}
                        value={values.email}
                        onChange={update('email')}
                        onBlur={handleBlur('email')}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={inputClass(Boolean(errors.email))}
                      />
                    </FormField>

                    {/* message */}
                    <FormField
                      id="message"
                      label="Message"
                      error={errors.message}
                    >
                      <textarea
                        ref={messageRef}
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell me about the system, the role, or the research…"
                        disabled={sending}
                        value={values.message}
                        onChange={update('message')}
                        onBlur={handleBlur('message')}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={cn(inputClass(Boolean(errors.message)), 'resize-y min-h-32')}
                      />
                    </FormField>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                      <p className="max-w-[22ch] font-mono text-[0.65rem] leading-relaxed text-fg-dim">
                        No newsletters. No spam. Just a reply.
                      </p>
                      <Magnetic strength={0.3} className="inline-block">
                        <button
                          type="submit"
                          disabled={sending}
                          data-cursor
                          data-cursor-label="Send"
                          className="group/send relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-signal px-7 py-3.5 text-sm font-medium text-ink-950 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <span className="absolute inset-0 -z-0 translate-y-full bg-signal-bright transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/send:translate-y-0" />
                          <span className="relative z-10 flex items-center gap-2.5">
                            {sending ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Transmitting
                              </>
                            ) : (
                              <>
                                Send message
                                <Send className="h-4 w-4 transition-transform duration-300 group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5" />
                              </>
                            )}
                          </span>
                        </button>
                      </Magnetic>
                    </div>

                    {/* status for assistive tech */}
                    <span aria-live="polite" className="sr-only">
                      {sending ? 'Sending your message' : ''}
                    </span>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---- bottom HUD strip (bookends the page, mirrors hero) ---- */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 font-mono text-[0.7rem] text-fg-dim">
          <span>MR // {siteConfig.role.toUpperCase()}</span>
          <span className="hidden md:inline">{COORDS}</span>
          <span className="text-signal/70">SYS / READY</span>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* input styling                                                      */
/* ------------------------------------------------------------------ */

function inputClass(hasError: boolean) {
  return cn(
    'w-full rounded-lg border bg-ink-850 px-4 py-3 font-sans text-sm text-fg outline-none transition-colors duration-300 placeholder:text-fg-dim',
    'focus:bg-ink-800 disabled:opacity-60',
    hasError
      ? 'border-hardware/70 focus:border-hardware'
      : 'border-line hover:border-line-strong focus:border-signal',
  )
}

/* ------------------------------------------------------------------ */
/* form field wrapper                                                 */
/* ------------------------------------------------------------------ */

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="eyebrow">
          {label}
        </label>
        {error && (
          <span
            id={`${id}-error`}
            role="alert"
            className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] normal-case tracking-normal text-hardware"
          >
            <AlertCircle className="h-3 w-3" />
            {error}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* success panel                                                      */
/* ------------------------------------------------------------------ */

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex min-h-[22rem] flex-col items-center justify-center py-6 text-center">
      <span className="relative grid h-16 w-16 place-items-center">
        <span className="absolute inset-0 rounded-full bg-signal/15 [animation:drift_8s_ease-in-out_infinite]" />
        <span className="relative grid h-16 w-16 place-items-center rounded-full border border-signal/50 bg-ink-850 text-signal glow-signal">
          <Check className="h-7 w-7" strokeWidth={2.4} />
        </span>
      </span>
      <h3 className="mt-7 font-display text-2xl font-semibold tracking-tight text-fg">
        Transmission received
      </h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
        Thanks for reaching out — your message is queued and on its way.
      </p>
      <p className="mt-5 font-mono text-[0.72rem] text-signal">
        // message transmitted — I will reply within 48h
      </p>
      <button
        type="button"
        onClick={onReset}
        data-cursor
        data-cursor-label="Reset"
        className="group/reset mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-fg-muted transition-colors duration-300 hover:border-signal/60 hover:text-fg"
      >
        Send another message
        <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover/reset:translate-x-0.5 group-hover/reset:-translate-y-0.5" />
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* social icon button                                                 */
/* ------------------------------------------------------------------ */

function SocialButton({
  href,
  label,
  handle,
  children,
}: {
  href: string
  label: string
  handle: string
  children: ReactNode
}) {
  return (
    <Magnetic strength={0.25} className="inline-block">
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        data-cursor
        data-cursor-label={label}
        aria-label={`${label} — ${handle}`}
        className="group/soc flex items-center gap-3 rounded-xl border border-line bg-ink-850 px-4 py-3 transition-colors duration-300 hover:border-signal/60"
      >
        <span className="text-fg-muted transition-colors duration-300 group-hover/soc:text-signal">
          {children}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm text-fg">{label}</span>
          <span className="font-mono text-[0.65rem] text-fg-dim">{handle}</span>
        </span>
      </a>
    </Magnetic>
  )
}

/* ------------------------------------------------------------------ */
/* redacted lab portrait (premium placeholder, no real image)         */
/* ------------------------------------------------------------------ */

function LabPortrait() {
  return (
    <figure
      data-portrait
      className="group/portrait relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] border border-line-strong bg-ink-850"
    >
      {/* duotone cyan→violet wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        data-portrait-inner
        style={{
          backgroundImage:
            'radial-gradient(120% 90% at 18% 8%, rgba(70,227,255,0.20), transparent 55%), radial-gradient(120% 95% at 88% 96%, rgba(143,123,255,0.24), transparent 55%)',
        }}
      />
      {/* dotgrid texture */}
      <div
        aria-hidden
        className="absolute inset-0 bg-dotgrid opacity-50 [mask-image:linear-gradient(180deg,#000_0%,transparent_92%)]"
      />
      {/* CRT scanlines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.4] mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(5,7,16,0.6) 3px, transparent 4px)',
        }}
      />
      {/* sweeping scan band */}
      <div
        aria-hidden
        data-scanline
        className="absolute inset-x-0 top-0 h-[42%]"
        style={{
          backgroundImage:
            'linear-gradient(180deg, transparent, rgba(70,227,255,0.14) 50%, transparent)',
        }}
      />

      {/* redacted subject silhouette */}
      <svg
        aria-hidden
        viewBox="0 0 200 250"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-x-0 bottom-0 mx-auto h-[78%] w-auto text-signal/30"
      >
        <defs>
          <linearGradient id="subject-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(70,227,255,0.42)" />
            <stop offset="100%" stopColor="rgba(143,123,255,0.12)" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="78" r="44" fill="url(#subject-fill)" />
        <path
          d="M22 250 C22 178 56 146 100 146 C144 146 178 178 178 250 Z"
          fill="url(#subject-fill)"
        />
        {/* redaction bar across the eyes */}
        <rect x="62" y="66" width="76" height="15" rx="2" fill="#050710" opacity="0.92" />
        <rect x="62" y="66" width="76" height="15" rx="2" fill="none" stroke="rgba(70,227,255,0.5)" strokeWidth="0.8" />
      </svg>

      {/* corner ticks */}
      <span data-corner className="absolute left-3 top-3 h-4 w-4 border-l border-t border-signal/60" />
      <span data-corner className="absolute right-3 top-3 h-4 w-4 border-r border-t border-signal/60" />
      <span data-corner className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-signal/60" />
      <span data-corner className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-signal/60" />

      {/* top HUD bar */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-fg-dim">
        <span>// subject</span>
        <span className="inline-flex items-center gap-1.5 text-signal">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
          rec
        </span>
      </div>

      {/* bottom caption plate */}
      <figcaption className="absolute inset-x-0 bottom-0">
        <div className="bg-gradient-to-t from-ink-950 via-ink-950/85 to-transparent px-5 pb-5 pt-12">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-signal">
            // {about.photo.caption.toLowerCase()}
          </p>
          <p className="mt-1.5 font-display text-lg font-semibold tracking-tight text-fg">
            {about.photo.label}
          </p>
          <p className="font-mono text-[0.62rem] text-fg-dim">{siteConfig.role}</p>
        </div>
      </figcaption>

      {/* hairline focus frame on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] ring-1 ring-inset ring-signal/0 transition-[box-shadow,--tw-ring-color] duration-500 group-hover/portrait:ring-signal/25" />
    </figure>
  )
}
