import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ThemeProvider } from './ThemeProvider'
import { useTheme } from './ThemeContext'

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should provide theme context', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    expect(result.current).toBeDefined()
    expect(result.current.theme).toBeDefined()
    expect(result.current.setTheme).toBeDefined()
    expect(result.current.actualTheme).toBeDefined()
  })

  it('should default to system theme when no saved theme', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    expect(result.current.theme).toBe('system')
  })

  it('should use saved theme from localStorage', () => {
    localStorage.setItem('theme', 'dark')
    
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    expect(result.current.theme).toBe('dark')
  })

  it('should update theme when setTheme is called', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    act(() => {
      result.current.setTheme('dark')
    })

    expect(result.current.theme).toBe('dark')
  })

  it('should save theme to localStorage when changed', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    act(() => {
      result.current.setTheme('light')
    })

    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('should set actualTheme to light when theme is light', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    act(() => {
      result.current.setTheme('light')
    })

    expect(result.current.actualTheme).toBe('light')
  })

  it('should set actualTheme to dark when theme is dark', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    act(() => {
      result.current.setTheme('dark')
    })

    expect(result.current.actualTheme).toBe('dark')
  })

  it('should set data-theme attribute on document when theme is light', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    act(() => {
      result.current.setTheme('light')
    })

    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('should set data-theme attribute on document when theme is dark', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    act(() => {
      result.current.setTheme('dark')
    })

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('should remove data-theme attribute when theme is system', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    act(() => {
      result.current.setTheme('dark')
    })

    act(() => {
      result.current.setTheme('system')
    })

    expect(document.documentElement.getAttribute('data-theme')).toBeNull()
  })
})
