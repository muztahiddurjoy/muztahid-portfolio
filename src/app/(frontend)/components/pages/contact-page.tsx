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
import { contact, siteConfig } from '@/lib/portfolio-data'
import { Reveal } from '../ui/reveal'
import { AnimatedHeading } from '../ui/animated-heading'
import { Eyebrow } from '../ui/primitives'
import { Magnetic } from '../ui/magnetic'
import { GithubIcon, LinkedinIcon } from '../ui/brand-icons'

/* word to lift into italic serif inside the hero title */
const TITLE_ACCENT = 'audacious'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormState = { name: string; email: string; message: string; company: string }
type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>
type Status = 'idle' | 'sending' | 'sent'

/* ---------- field (label as eyebrow + warm input) ---------- */
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
}: {
  id: 'name' | 'email' | 'message'
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  disabled?: boolean
  type?: string
  textarea?: boolean
  placeholder?: string
  autoComplete?: string
}) {
  const errorId = `${id}-error`
  const field =
    'mt-3 block w-full rounded-[var(--radius)] border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/55 outline-none transition-colors duration-300 focus:border-foreground disabled:opacity-60'

  return (
    <div>
      <label htmlFor={id} className="eyebrow flex items-baseline gap-2">
        <span>{label}</span>
        <span className="font-script text-[0.95rem] normal-case tracking-normal text-muted-foreground">
          required
        </span>
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={5}
          placeholder={placeholder}
          aria-required="true"
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
          aria-required="true"
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

/* ---------- one contact channel row ---------- */
function ChannelRow({
  label,
  value,
  href,
  icon,
}: {
  label: string
  value: string
  href?: string
  icon?: ReactNode
}) {
  const external = !!href && /^https?:\/\//.test(href)
  return (
    <div className="flex flex-col gap-1.5 border-t border-border py-5 first:border-t-0 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <span className="eyebrow">{label}</span>
      {href ? (
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          data-cursor
          className="group inline-flex items-center gap-2.5 text-base tracking-tight text-foreground md:text-lg"
        >
          {icon}
          <span className="link-underline">{value}</span>
          {external && (
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          )}
        </a>
      ) : (
        <span className="text-base tracking-tight text-muted-foreground md:text-lg">{value}</span>
      )}
    </div>
  )
}

export default function ContactPage() {
  const [values, setValues] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    company: '',
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const successRef = useRef<HTMLDivElement>(null)

  // soft entrance for the success confirmation (final state shown when reduced)
  useIsoLayoutEffect(() => {
    if (status !== 'sent') return
    const el = successRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('[data-rise]', {
        y: 26,
        opacity: 0,
        duration: 1.05,
        ease: 'expo.out',
        stagger: 0.12,
      })
    }, successRef)
    return () => ctx.revert()
  }, [status])

  // clear the pending fake-send timer if we unmount mid-flight
  useIsoLayoutEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const update =
    (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const v = e.target.value
      setValues((s) => ({ ...s, [key]: v }))
      if (key !== 'company' && errors[key]) {
        setErrors((s) => ({ ...s, [key]: undefined }))
      }
    }

  const validate = (s: FormState): FieldErrors => {
    const next: FieldErrors = {}
    if (!s.name.trim()) next.name = 'Please add your name so I know who I’m talking to.'
    if (!s.email.trim()) next.email = 'An email keeps the conversation going.'
    else if (!EMAIL_RE.test(s.email.trim())) next.email = 'That email looks off — mind checking it?'
    if (!s.message.trim()) next.message = 'Tell me a little about what you’re building.'
    return next
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    // honeypot — a real person never fills this; bots do
    if (values.company.trim() !== '') return

    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length > 0) {
      const first = document.getElementById(Object.keys(next)[0])
      first?.focus()
      return
    }

    setStatus('sending')
    timer.current = setTimeout(() => setStatus('sent'), 900)
  }

  const reset = () => {
    setValues({ name: '', email: '', message: '', company: '' })
    setErrors({})
    setStatus('idle')
  }

  const firstName = values.name.trim().split(/\s+/)[0]

  return (
    <main className="pt-28 md:pt-32">
      {/* ============ HERO ============ */}
      <section className="container-page pb-20 pt-6 md:pb-28">
        <Reveal>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="mt-7 max-w-5xl font-display text-[clamp(2.8rem,8vw,7rem)] leading-[1.05] tracking-tight">
          <AnimatedHeading
            as="span"
            className="block"
            text={contact.title.split(TITLE_ACCENT)[0].trim()}
            immediate
          />
          <AnimatedHeading
            as="span"
            className="block"
            wordClassName="display-italic"
            text={TITLE_ACCENT}
            delay={0.16}
            immediate
          />
          <AnimatedHeading
            as="span"
            className="block"
            text={contact.title.split(TITLE_ACCENT)[1].trim()}
            delay={0.32}
            immediate
          />
        </h1>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {contact.blurb}
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
              </span>
              {siteConfig.availability}
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span>Replies within 48 hours</span>
          </div>
        </Reveal>
      </section>

      {/* ============ INVITATION + FORM ============ */}
      <section className="border-y border-border bg-elevated">
        <div className="container-page grid gap-14 py-24 md:grid-cols-2 md:gap-16 md:py-32 lg:gap-24">
          {/* LEFT — warm invitation */}
          <div>
            <Reveal>
              <Eyebrow>Say hello</Eyebrow>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 font-script text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.08] text-foreground">
                let’s build something that lasts
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Tell me what you’re trying to make real. I read every note myself, and I answer
                the ones that want to build something worth standing on years from now.
              </p>
            </Reveal>

            <div className="mt-12">
              {contact.channels.map((channel, i) => (
                <Reveal key={channel.label} delay={0.06 * i} y={18}>
                  <ChannelRow
                    label={channel.label}
                    value={channel.value}
                    href={channel.href}
                    icon={
                      channel.label === 'GitHub' ? (
                        <GithubIcon className="h-4 w-4 text-muted-foreground" />
                      ) : channel.label === 'LinkedIn' ? (
                        <LinkedinIcon className="h-4 w-4 text-muted-foreground" />
                      ) : undefined
                    }
                  />
                </Reveal>
              ))}
            </div>
          </div>

          {/* RIGHT — the form / confirmation */}
          <div>
            <Reveal delay={0.12}>
              <div className="rounded-[var(--radius-xl)] border border-border bg-background p-6 sm:p-8 md:p-10">
                {status === 'sent' ? (
                  <div ref={successRef} className="flex flex-col items-start">
                    <span
                      data-rise
                      className="font-script text-[clamp(1.9rem,4vw,2.8rem)] leading-none text-muted-foreground"
                    >
                      message sent
                    </span>
                    <h2
                      data-rise
                      className="mt-4 font-display text-2xl leading-[1.1] tracking-tight md:text-[2rem]"
                    >
                      Message received — I’ll reply{' '}
                      <span className="display-italic">within 48 hours</span>.
                    </h2>
                    <p data-rise className="mt-5 max-w-sm text-muted-foreground">
                      Thank you for reaching out{firstName ? `, ${firstName}` : ''}. Your note
                      landed safely. In the meantime, the work speaks for itself — feel free to
                      wander the ventures.
                    </p>
                    <button
                      data-rise
                      data-cursor
                      type="button"
                      onClick={reset}
                      className="group/cta mt-8 inline-flex items-center gap-1.5 text-sm font-medium"
                    >
                      <span className="link-underline">Send another</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </button>
                  </div>
                ) : (
                  <form noValidate onSubmit={handleSubmit} className="relative">
                    <p className="eyebrow mb-8">Send a note</p>

                    <div className="flex flex-col gap-6">
                      <Field
                        id="name"
                        label="Name"
                        value={values.name}
                        onChange={update('name')}
                        error={errors.name}
                        disabled={status === 'sending'}
                        autoComplete="name"
                        placeholder="Your name"
                      />
                      <Field
                        id="email"
                        label="Email"
                        type="email"
                        value={values.email}
                        onChange={update('email')}
                        error={errors.email}
                        disabled={status === 'sending'}
                        autoComplete="email"
                        placeholder="you@studio.com"
                      />
                      <Field
                        id="message"
                        label="Message"
                        textarea
                        value={values.message}
                        onChange={update('message')}
                        error={errors.message}
                        disabled={status === 'sending'}
                        placeholder="What are you trying to make real?"
                      />
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

                    <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
                      <Magnetic strength={0.3} className="w-fit">
                        <button
                          type="submit"
                          data-cursor
                          disabled={status === 'sending'}
                          className="group/cta inline-flex items-center gap-2.5 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium tracking-tight text-background transition-all duration-400 hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                        >
                          <span>{status === 'sending' ? 'Sending' : 'Send message'}</span>
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

                      <span className="font-script text-lg text-muted-foreground">
                        no bots, just builders
                      </span>
                    </div>

                    <p className="sr-only" role="status" aria-live="polite">
                      {status === 'sending' ? 'Sending your message' : ''}
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
