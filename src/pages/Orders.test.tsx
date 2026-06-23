import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../tests/test-utils'
import Orders from './Orders'

describe('Orders', () => {
  it('should render orders page header', () => {
    render(<Orders />)
    expect(screen.getByText('Manage and view store orders')).toBeInTheDocument()
  })

  it('should render summary cards', () => {
    render(<Orders />)
    expect(screen.getByText('Total Orders')).toBeInTheDocument()
    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
    expect(screen.getByText('Delivered Orders')).toBeInTheDocument()
    expect(screen.getByText('Pending Orders')).toBeInTheDocument()
    expect(screen.getByText('Cancelled Orders')).toBeInTheDocument()
  })

  it('should render search input', () => {
    render(<Orders />)
    const searchInput = screen.getByPlaceholderText('Search orders...')
    expect(searchInput).toBeInTheDocument()
  })

  it('should render filter dropdowns', () => {
    render(<Orders />)
    expect(screen.getByText('All Status')).toBeInTheDocument()
    expect(screen.getByText('All Payment')).toBeInTheDocument()
  })

  it('should render date range display', () => {
    render(<Orders />)
    expect(screen.getByText('May 1, 2024 - May 31, 2024')).toBeInTheDocument()
  })

  it('should render reset button', () => {
    render(<Orders />)
    expect(screen.getByText('Reset')).toBeInTheDocument()
  })

  it('should render filters button', () => {
    render(<Orders />)
    expect(screen.getByText('Filters')).toBeInTheDocument()
  })

  it('should render export button', () => {
    render(<Orders />)
    expect(screen.getByText('Export')).toBeInTheDocument()
  })

  it('should render create order button', () => {
    render(<Orders />)
    expect(screen.getByText('Create Order')).toBeInTheDocument()
  })

  it('should render table headers', async () => {
    render(<Orders />)
    await waitFor(() => {
      expect(screen.getByText('Order ID')).toBeInTheDocument()
      expect(screen.getByText('Customer')).toBeInTheDocument()
      expect(screen.getByText('Items')).toBeInTheDocument()
      expect(screen.getByText('Total')).toBeInTheDocument()
      expect(screen.getByText('Payment')).toBeInTheDocument()
      expect(screen.getByText('Status')).toBeInTheDocument()
      expect(screen.getByText('Date')).toBeInTheDocument()
    })
  })

  it('should render order data in table', async () => {
    render(<Orders />)
    await waitFor(() => {
      expect(screen.getByText('#ORD-001')).toBeInTheDocument()
      expect(screen.getByText('#ORD-002')).toBeInTheDocument()
    })
  })

  it('should render customer names in orders', async () => {
    render(<Orders />)
    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
      expect(screen.getByText('Bob Smith')).toBeInTheDocument()
    })
  })

  it('should render order status badges', async () => {
    render(<Orders />)
    await waitFor(() => {
      expect(screen.getByText('Processing')).toBeInTheDocument()
      expect(screen.getByText('Delivered')).toBeInTheDocument()
      expect(screen.getByText('Pending')).toBeInTheDocument()
      expect(screen.getByText('Cancelled')).toBeInTheDocument()
      expect(screen.getByText('Refunded')).toBeInTheDocument()
    })
  })

  it('should filter orders by search term', async () => {
    render(<Orders />)
    const searchInput = screen.getByPlaceholderText('Search orders...')
    
    await waitFor(() => {
      expect(screen.getByText('#ORD-001')).toBeInTheDocument()
    })

    fireEvent.change(searchInput, { target: { value: 'ORD-001' } })
    
    await waitFor(() => {
      expect(screen.getByText('#ORD-001')).toBeInTheDocument()
    })
  })

  it('should reset filters when reset button is clicked', async () => {
    render(<Orders />)
    const searchInput = screen.getByPlaceholderText('Search orders...')
    const resetButton = screen.getByText('Reset')

    await waitFor(() => {
      expect(screen.getByText('#ORD-001')).toBeInTheDocument()
    })

    fireEvent.change(searchInput, { target: { value: 'ORD-001' } })
    fireEvent.click(resetButton)

    await waitFor(() => {
      expect(searchInput).toHaveValue('')
    })
  })

  it('should render pagination controls', async () => {
    render(<Orders />)
    await waitFor(() => {
      expect(screen.getByText('Previous')).toBeInTheDocument()
      expect(screen.getByText('Next')).toBeInTheDocument()
    })
  })

  it('should render loading state initially', () => {
    render(<Orders />)
    expect(screen.getByText('Loading orders...')).toBeInTheDocument()
  })

  it('should render checkboxes for row selection', async () => {
    render(<Orders />)
    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBeGreaterThan(0)
    })
  })
})
