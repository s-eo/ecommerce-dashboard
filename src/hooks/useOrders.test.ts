import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useOrders } from './useOrders'

describe('useOrders', () => {
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

  it('should fetch orders successfully', async () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toBeDefined()
    expect(result.current.data).toHaveLength(8)
    expect(result.current.data?.[0]).toMatchObject({
      id: '1',
      orderNumber: '#ORD-001',
      total: 139.97,
      paymentMethod: 'Credit Card',
      status: 'Processing',
    })
  })

  it('should have loading state initially', () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    })

    expect(result.current.isLoading).toBe(true)
  })

  it('should return order data with correct structure', async () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const order = result.current.data?.[0]
    expect(order).toHaveProperty('id')
    expect(order).toHaveProperty('orderNumber')
    expect(order).toHaveProperty('customer')
    expect(order).toHaveProperty('items')
    expect(order).toHaveProperty('total')
    expect(order).toHaveProperty('paymentMethod')
    expect(order).toHaveProperty('status')
    expect(order).toHaveProperty('date')
  })

  it('should return orders with customer information', async () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const order = result.current.data?.[0]
    expect(order?.customer).toBeDefined()
    expect(order?.customer).toMatchObject({
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      group: 'VIP',
    })
  })

  it('should return orders with items', async () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const order = result.current.data?.[0]
    expect(order?.items).toBeDefined()
    expect(order?.items).toHaveLength(2)
    expect(order?.items[0]).toMatchObject({
      id: '1',
      name: 'Wireless Headphones',
      quantity: 1,
      price: 99.99,
    })
  })

  it('should include various order statuses', async () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const statuses = result.current.data?.map(order => order.status)
    expect(statuses).toContain('Processing')
    expect(statuses).toContain('Delivered')
    expect(statuses).toContain('Pending')
    expect(statuses).toContain('Cancelled')
    expect(statuses).toContain('Refunded')
  })
})
