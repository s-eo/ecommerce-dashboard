import { useEffect, useState, type ReactNode } from 'react'
import type {Theme} from "./ThemeContext.ts"
import {ThemeContext} from "./ThemeContext.ts";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme
    return saved || 'system'
  })
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    
    const root = document.documentElement
    root.removeAttribute('data-theme')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      //eslint-disable-next-line
      setActualTheme(systemTheme)
    } else {
      setActualTheme(theme)
      root.setAttribute('data-theme', theme)
    }
  }, [theme, setActualTheme])

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => {
        setActualTheme(mediaQuery.matches ? 'dark' : 'light')
      }
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme, setActualTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
