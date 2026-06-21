'use client'

import { type ReactNode } from 'react'
import { ArrowUpRight, ArrowRight, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TransitionLink } from './transition-link'
import { Magnetic } from './magnetic'

type Variant = 'primary' | 'ghost'
type IconKind = 'arrow-up' | 'arrow-right' | 'download' | 'none'

const icons = {
  'arrow-up': ArrowUpRight,
  'arrow-right': ArrowRight,
  download: Download,
  none: null,
}

type Props = {
  href: string
  children: ReactNode
  variant?: Variant
  icon?: IconKind
  magnetic?: boolean
  className?: string
  target?: string
}

export function CtaButton({
  href,
  children,
  variant = 'primary',
  icon = 'arrow-up',
  magnetic = true,
  className,
  target,
}: Props) {
  const Icon = icons[icon]

  const base =
    'group/cta relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300'

  const variants: Record<Variant, string> = {
    primary: 'text-ink-950',
    ghost: 'text-fg border border-line-strong hover:text-ink-950',
  }

  const inner = (
    <TransitionLink
      href={href}
      target={target}
      data-cursor
      className={cn(base, variants[variant], className)}
    >
      {/* fill */}
      <span
        className={cn(
          'absolute inset-0 -z-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          variant === 'primary'
            ? 'bg-signal group-hover/cta:scale-[1.02]'
            : 'translate-y-full bg-signal group-hover/cta:translate-y-0',
        )}
      />
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {Icon && (
          <Icon className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        )}
      </span>
    </TransitionLink>
  )

  return magnetic ? <Magnetic strength={0.4}>{inner}</Magnetic> : inner
}
