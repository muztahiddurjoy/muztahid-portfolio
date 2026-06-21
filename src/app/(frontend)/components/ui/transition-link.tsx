'use client'

import { type AnchorHTMLAttributes, type ReactNode } from 'react'
import { useTransition } from '../../providers/transition-provider'
import { useLenis } from '../../providers/smooth-scroll'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
}

export function TransitionLink({ href, children, onClick, ...rest }: Props) {
  const { navigate } = useTransition()
  const lenis = useLenis()

  const handle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented) return

    // in-page anchor → smooth scroll via Lenis; if the target isn't on this
    // route (e.g. on a case-study page), fall back to the home page + hash.
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        lenis?.scrollTo(target as HTMLElement, { offset: -72, duration: 1.3 })
        window.history.replaceState(null, '', href)
      } else {
        navigate('/' + href)
      }
      return
    }

    // external → let the browser handle it
    if (/^https?:\/\//.test(href) || rest.target === '_blank') return

    // internal route → curtain transition
    e.preventDefault()
    navigate(href)
  }

  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  )
}
