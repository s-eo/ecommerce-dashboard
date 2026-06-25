import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useUser } from './UserContext.tsx'
import { UserProvider } from './UserProvider.tsx'
import type { User } from '../../types.ts'

describe('UserContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <UserProvider>{children}</UserProvider>
  )

  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should provide user context', () => {
    const { result } = renderHook(() => useUser(), { wrapper })
    
    expect(result.current).toBeDefined()
    expect(result.current.user).toBeNull()
    expect(typeof result.current.setUser).toBe('function')
    expect(typeof result.current.logout).toBe('function')
  })

  it('should set user data', () => {
    const { result } = renderHook(() => useUser(), { wrapper })
    
    const mockUser: User = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
    }

    act(() => {
      result.current.setUser(mockUser)
    })

    expect(result.current.user).toEqual(mockUser)
  })

  it('should clear user data on logout', () => {
    const { result } = renderHook(() => useUser(), { wrapper })
    
    const mockUser: User = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
    }

    act(() => {
      result.current.setUser(mockUser)
    })

    expect(result.current.user).toEqual(mockUser)

    act(() => {
      result.current.logout()
    })

    expect(result.current.user).toBeNull()
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('should remove user data when setUser is called with null', () => {
    const { result } = renderHook(() => useUser(), { wrapper })
    
    const mockUser: User = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
    }

    act(() => {
      result.current.setUser(mockUser)
    })

    expect(result.current.user).toEqual(mockUser)

    act(() => {
      result.current.setUser(null)
    })

    expect(result.current.user).toBeNull()
  })

  it('should throw error when useUser is used outside UserProvider', () => {
    expect(() => {
      renderHook(() => useUser())
    }).toThrow('useUser must be used within a UserProvider')
  })
})
