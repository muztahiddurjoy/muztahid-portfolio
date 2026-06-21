'use client'

import { useEffect } from 'react'
import { useLenis } from '../../providers/smooth-scroll'

// When the home page is reached via a cross-route hash link (e.g. /#projects),
// smooth-scroll to that section once layout + the curtain reveal have settled.
export function HashScroll() {
  const lenis = useLenis()

  useEffect(() => {
    const hash = window.location.hash
    if (!hash || hash.length < 2) return
    const id = setTimeout(() => {
      const target = document.querySelector(hash)
      if (target) {
        if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.4 })
        else (target as HTMLElement).scrollIntoView({ behavior: 'smooth' })
      }
    }, 380)
    return () => clearTimeout(id)
  }, [lenis])

  return null
}
