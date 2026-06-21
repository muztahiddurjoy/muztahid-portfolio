'use client'

import { useEffect, useRef, useState } from 'react'
import { Shuffle, Check } from 'lucide-react'
import { themes } from '@/lib/themes'
import { useTheme } from '../../providers/theme-provider'
import { cn } from '@/lib/utils'

export function ThemeSwitcher({ className, align = 'right' }: { className?: string; align?: 'left' | 'right' }) {
  const { theme, setTheme, shuffle } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1 backdrop-blur">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Choose palette"
          aria-expanded={open}
          data-cursor
          className="flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs transition-colors hover:bg-muted"
        >
          <Swatch paper={theme.paper} ink={theme.ink} />
          <span className="hidden whitespace-nowrap font-medium tracking-tight sm:inline">
            {theme.name}
          </span>
        </button>
        <button
          type="button"
          onClick={shuffle}
          aria-label="Shuffle palette"
          data-cursor
          className="grid h-7 w-7 place-items-center rounded-full text-foreground transition-transform duration-300 hover:bg-muted hover:rotate-180"
        >
          <Shuffle className="h-3.5 w-3.5" />
        </button>
      </div>

      {open && (
        <div
          className={cn(
            'absolute top-[calc(100%+10px)] z-50 max-h-[70vh] w-[260px] overflow-auto rounded-2xl border border-border bg-card p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          <p className="eyebrow px-2 pb-2 pt-1">Pick a palette</p>
          <div className="grid grid-cols-1 gap-0.5">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTheme(t.id)
                  setOpen(false)
                }}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted',
                  t.id === theme.id && 'bg-muted',
                )}
              >
                <Swatch paper={t.paper} ink={t.ink} />
                <span className="flex-1 tracking-tight">{t.name}</span>
                {t.id === theme.id && <Check className="h-3.5 w-3.5 opacity-70" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Swatch({ paper, ink }: { paper: string; ink: string }) {
  return (
    <span
      className="relative inline-block h-4 w-4 shrink-0 overflow-hidden rounded-full ring-1 ring-border-strong"
      style={{ background: paper }}
    >
      <span className="absolute inset-y-0 right-0 w-1/2" style={{ background: ink }} />
    </span>
  )
}
