import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCustomers, useCustomerStats } from './useCustomers'

describe('useCustomers', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
  })

  it('should fetch customers successfully', async () => {
    const { result } = renderHook(() => useCustomers(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBeDefined()
    expect(result.current.data).toHaveLength(8)
    expect(result.current.data?.[0]).toMatchObject({
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      group: 'VIP',
    })
  })

  it('should have loading state initially', () => {
    const { result } = renderHook(() => useCustomers(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('should return customer data with correct structure', async () => {
    const { result } = renderHook(() => useCustomers(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const customer = result.current.data?.[0]
    expect(customer).toHaveProperty('id')
    expect(customer).toHaveProperty('name')
    expect(customer).toHaveProperty('email')
    expect(customer).toHaveProperty('avatar')
    expect(customer).toHaveProperty('group')
    expect(customer).toHaveProperty('totalOrders')
    expect(customer).toHaveProperty('totalSpent')
    expect(customer).toHaveProperty('location')
    expect(customer).toHaveProperty('country')
    expect(customer).toHaveProperty('status')
    expect(customer).toHaveProperty('joinedAt')
  })
})

describe('useCustomerStats', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
  })

  it('should fetch customer stats successfully', async () => {
    const { result } = renderHook(() => useCustomerStats(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBeDefined()
    expect(result.current.data).toMatchObject({
      totalCustomers: 4892,
      newCustomers: 512,
      repeatCustomers: 1265,
      avgOrderValue: 128.45,
      totalSpent: 628430,
    })
  })

  it('should have loading state initially', () => {
    const { result } = renderHook(() => useCustomerStats(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('should return stats with correct structure', async () => {
    const { result } = renderHook(() => useCustomerStats(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const stats = result.current.data
    expect(stats).toHaveProperty('totalCustomers')
    expect(stats).toHaveProperty('newCustomers')
    expect(stats).toHaveProperty('repeatCustomers')
    expect(stats).toHaveProperty('avgOrderValue')
    expect(stats).toHaveProperty('totalSpent')
    expect(typeof stats?.totalCustomers).toBe('number')
    expect(typeof stats?.newCustomers).toBe('number')
    expect(typeof stats?.repeatCustomers).toBe('number')
    expect(typeof stats?.avgOrderValue).toBe('number')
    expect(typeof stats?.totalSpent).toBe('number')
  })
})
