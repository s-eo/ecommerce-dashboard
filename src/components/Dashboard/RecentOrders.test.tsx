import { describe, it, expect } from 'vitest'
import { render, screen } from '../tests/test-utils'
import RecentOrders from './RecentOrders'

describe('RecentOrders', () => {
  const mockOrders = [
    {
      id: '1',
      customer: {
        name: 'Alice Johnson',
        avatar: 'AJ',
      },
      orderNumber: '#ORD-001',
      date: 'May 16, 2024 10:30 AM',
      status: 'Processing' as const,
      amount: '$139.97',
    },
    {
      id: '2',
      customer: {
        name: 'Bob Smith',
        avatar: 'BS',
      },
      orderNumber: '#ORD-002',
      date: 'May 15, 2024 2:15 PM',
      status: 'Delivered' as const,
      amount: '$199.99',
    },
    {
      id: '3',
      customer: {
        name: 'Carol White',
        avatar: 'CW',
      },
      orderNumber: '#ORD-003',
      date: 'May 14, 2024 9:45 AM',
      status: 'Pending' as const,
      amount: '$79.98',
    },
    {
      id: '4',
      customer: {
        name: 'David Brown',
        avatar: 'DB',
      },
      orderNumber: '#ORD-004',
      date: 'May 13, 2024 4:20 PM',
      status: 'Cancelled' as const,
      amount: '$149.99',
    },
  ]

  it('should render recent orders title', () => {
    render(<RecentOrders orders={mockOrders} />)
    expect(screen.getByText('Recent Orders')).toBeInTheDocument()
  })

  it('should render view all button', () => {
    render(<RecentOrders orders={mockOrders} />)
    const viewAllButtons = screen.getAllByText('View all')
    expect(viewAllButtons).toHaveLength(2)
  })

  it('should render customer names', () => {
    render(<RecentOrders orders={mockOrders} />)
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
    expect(screen.getByText('Bob Smith')).toBeInTheDocument()
    expect(screen.getByText('Carol White')).toBeInTheDocument()
  })

  it('should render order numbers', () => {
    render(<RecentOrders orders={mockOrders} />)
    expect(screen.getByText('#ORD-001')).toBeInTheDocument()
    expect(screen.getByText('#ORD-002')).toBeInTheDocument()
    expect(screen.getByText('#ORD-003')).toBeInTheDocument()
  })

  it('should render order amounts', () => {
    render(<RecentOrders orders={mockOrders} />)
    expect(screen.getByText('$139.97')).toBeInTheDocument()
    expect(screen.getByText('$199.99')).toBeInTheDocument()
    expect(screen.getByText('$79.98')).toBeInTheDocument()
  })

  it('should render status badges', () => {
    render(<RecentOrders orders={mockOrders} />)
    expect(screen.getByText('Processing')).toBeInTheDocument()
    expect(screen.getByText('Delivered')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('Cancelled')).toBeInTheDocument()
  })

  it('should render customer avatars', () => {
    render(<RecentOrders orders={mockOrders} />)
    expect(screen.getByText('AJ')).toBeInTheDocument()
    expect(screen.getByText('BS')).toBeInTheDocument()
    expect(screen.getByText('CW')).toBeInTheDocument()
  })

  it('should limit to 3 orders', () => {
    render(<RecentOrders orders={mockOrders} />)
    // Only first 3 orders should be displayed in the table
    expect(screen.getByText('#ORD-001')).toBeInTheDocument()
    expect(screen.getByText('#ORD-002')).toBeInTheDocument()
    expect(screen.getByText('#ORD-003')).toBeInTheDocument()
    // 4th order should not be in the table
    expect(screen.queryByText('#ORD-004')).not.toBeInTheDocument()
  })

  it('should render table headers', () => {
    render(<RecentOrders orders={mockOrders} />)
    expect(screen.getByText('Customer')).toBeInTheDocument()
    expect(screen.getByText('No.')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Amount')).toBeInTheDocument()
  })

  it('should render empty state when no orders', () => {
    render(<RecentOrders orders={[]} />)
    expect(screen.getByText('Recent Orders')).toBeInTheDocument()
  })
})
