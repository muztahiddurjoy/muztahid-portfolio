'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { themes, themeClasses, type Theme } from '@/lib/themes'

type Ctx = {
  theme: Theme
  setTheme: (id: string) => void
  shuffle: () => void
}

const ThemeContext = createContext<Ctx | null>(null)

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

function applyClass(id: string) {
  const el = document.documentElement
  themeClasses.forEach((c) => el.classList.remove(c))
  el.classList.add(`theme-${id}`)
  el.setAttribute('data-theme', id)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The head script already applied a random theme; read it back on mount.
  const [themeId, setThemeId] = useState<string>(themes[0].id)

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    if (current && themes.some((t) => t.id === current)) setThemeId(current)
  }, [])

  const setTheme = useCallback((id: string) => {
    applyClass(id)
    setThemeId(id)
  }, [])

  const shuffle = useCallback(() => {
    setThemeId((prev) => {
      let next = prev
      while (next === prev) next = themes[Math.floor(Math.random() * themes.length)].id
      applyClass(next)
      return next
    })
  }, [])

  const theme = themes.find((t) => t.id === themeId) ?? themes[0]

  return (
    <ThemeContext.Provider value={{ theme, setTheme, shuffle }}>{children}</ThemeContext.Provider>
  )
}
