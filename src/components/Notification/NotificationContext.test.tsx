import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useNotifications } from './NotificationContext'
import { NotificationProvider } from './NotificationProvider'

describe('NotificationContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <NotificationProvider>{children}</NotificationProvider>
  )

  it('should provide notification context', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper })
    
    expect(result.current).toBeDefined()
    expect(result.current.notifications).toEqual([])
    expect(typeof result.current.addNotification).toBe('function')
    expect(typeof result.current.removeNotification).toBe('function')
    expect(typeof result.current.clearNotifications).toBe('function')
  })

  it('should add a notification', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper })
    
    act(() => {
      result.current.addNotification({
        message: 'Test notification',
        type: 'info',
      })
    })

    expect(result.current.notifications).toHaveLength(1)
    expect(result.current.notifications[0].message).toBe('Test notification')
    expect(result.current.notifications[0].type).toBe('info')
    expect(result.current.notifications[0]).toHaveProperty('id')
    expect(result.current.notifications[0]).toHaveProperty('timestamp')
  })

  it('should add multiple notifications', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper })
    
    act(() => {
      result.current.addNotification({ message: 'First', type: 'info' })
      result.current.addNotification({ message: 'Second', type: 'success' })
      result.current.addNotification({ message: 'Third', type: 'warning' })
    })

    expect(result.current.notifications).toHaveLength(3)
    expect(result.current.notifications[0].message).toBe('First')
    expect(result.current.notifications[1].message).toBe('Second')
    expect(result.current.notifications[2].message).toBe('Third')
  })

  it('should clear all notifications', () => {
    const { result } = renderHook(() => useNotifications(), { wrapper })
    
    act(() => {
      result.current.addNotification({ message: 'First', type: 'info' })
      result.current.addNotification({ message: 'Second', type: 'success' })
      result.current.addNotification({ message: 'Third', type: 'warning' })
    })

    expect(result.current.notifications).toHaveLength(3)

    act(() => {
      result.current.clearNotifications()
    })

    expect(result.current.notifications).toHaveLength(0)
  })

  it('should throw error when useNotifications is used outside NotificationProvider', () => {
    expect(() => {
      renderHook(() => useNotifications())
    }).toThrow('useNotifications must be used within a NotificationProvider')
  })
})
