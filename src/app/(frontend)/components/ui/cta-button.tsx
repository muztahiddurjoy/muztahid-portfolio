'use client'

import { type ReactNode } from 'react'
import { ArrowUpRight, ArrowRight, MoveRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TransitionLink } from './transition-link'
import { Magnetic } from './magnetic'

type Variant = 'solid' | 'outline' | 'text'
type IconKind = 'arrow-up' | 'arrow-right' | 'move-right' | 'none'

const icons = {
  'arrow-up': ArrowUpRight,
  'arrow-right': ArrowRight,
  'move-right': MoveRight,
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
  variant = 'solid',
  icon = 'arrow-up',
  magnetic = true,
  className,
  target,
}: Props) {
  const Icon = icons[icon]

  if (variant === 'text') {
    return (
      <TransitionLink
        href={href}
        target={target}
        data-cursor
        className={cn('group/cta inline-flex items-center gap-1.5 text-sm font-medium', className)}
      >
        <span className="link-underline">{children}</span>
        {Icon && (
          <Icon className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
        )}
      </TransitionLink>
    )
  }

  const base =
    'group/cta inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-all duration-400'
  const styles: Record<Exclude<Variant, 'text'>, string> = {
    solid: 'bg-foreground text-background hover:opacity-90',
    outline: 'btn-inverse',
  }

  const inner = (
    <TransitionLink href={href} target={target} data-cursor className={cn(base, styles[variant], className)}>
      <span>{children}</span>
      {Icon && (
        <Icon className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
      )}
    </TransitionLink>
  )

  return magnetic ? <Magnetic strength={0.35}>{inner}</Magnetic> : inner
}
