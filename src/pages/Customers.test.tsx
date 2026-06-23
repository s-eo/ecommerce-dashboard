import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../tests/test-utils'
import Customers from './Customers'

describe('Customers', () => {
  it('should render customers page header', () => {
    render(<Customers />)
    expect(screen.getByText('Manage and view customer information')).toBeInTheDocument()
  })

  it('should render summary cards', () => {
    render(<Customers />)
    expect(screen.getByText('Total Customers')).toBeInTheDocument()
    expect(screen.getByText('New Customers')).toBeInTheDocument()
    expect(screen.getByText('Repeat Customers')).toBeInTheDocument()
    expect(screen.getByText('Avg. Order Value')).toBeInTheDocument()
    expect(screen.getByText('Total Spent')).toBeInTheDocument()
  })

  it('should render search input', () => {
    render(<Customers />)
    const searchInput = screen.getByPlaceholderText('Search customers...')
    expect(searchInput).toBeInTheDocument()
  })

  it('should render filter dropdowns', () => {
    render(<Customers />)
    expect(screen.getByText('All Groups')).toBeInTheDocument()
    expect(screen.getByText('All Status')).toBeInTheDocument()
    expect(screen.getByText('All Locations')).toBeInTheDocument()
  })

  it('should render reset button', () => {
    render(<Customers />)
    expect(screen.getByText('Reset')).toBeInTheDocument()
  })

  it('should render filters button', () => {
    render(<Customers />)
    expect(screen.getByText('Filters')).toBeInTheDocument()
  })

  it('should render table headers', async () => {
    render(<Customers />)
    await waitFor(() => {
      expect(screen.getByText('Customer')).toBeInTheDocument()
      expect(screen.getByText('Group')).toBeInTheDocument()
      expect(screen.getByText('Total Orders')).toBeInTheDocument()
      expect(screen.getByText('Total Spent')).toBeInTheDocument()
      expect(screen.getByText('Location')).toBeInTheDocument()
      expect(screen.getByText('Status')).toBeInTheDocument()
      expect(screen.getByText('Joined At')).toBeInTheDocument()
    })
  })

  it('should render customer data in table', async () => {
    render(<Customers />)
    await waitFor(() => {
      expect(screen.getByText('Sarah Wilson')).toBeInTheDocument()
      expect(screen.getByText('John Smith')).toBeInTheDocument()
    })
  })

  it('should filter customers by search term', async () => {
    render(<Customers />)
    const searchInput = screen.getByPlaceholderText('Search customers...')
    
    await waitFor(() => {
      expect(screen.getByText('Sarah Wilson')).toBeInTheDocument()
    })

    fireEvent.change(searchInput, { target: { value: 'Sarah' } })
    
    await waitFor(() => {
      expect(screen.getByText('Sarah Wilson')).toBeInTheDocument()
    })
  })

  it('should reset filters when reset button is clicked', async () => {
    render(<Customers />)
    const searchInput = screen.getByPlaceholderText('Search customers...')
    const resetButton = screen.getByText('Reset')

    await waitFor(() => {
      expect(screen.getByText('Sarah Wilson')).toBeInTheDocument()
    })

    fireEvent.change(searchInput, { target: { value: 'Sarah' } })
    fireEvent.click(resetButton)

    await waitFor(() => {
      expect(searchInput).toHaveValue('')
    })
  })

  it('should render pagination controls', async () => {
    render(<Customers />)
    await waitFor(() => {
      expect(screen.getByText('Previous')).toBeInTheDocument()
      expect(screen.getByText('Next')).toBeInTheDocument()
    })
  })

  it('should render loading state initially', () => {
    render(<Customers />)
    expect(screen.getByText('Loading customers...')).toBeInTheDocument()
  })

  it('should render customer status badges', async () => {
    render(<Customers />)
    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument()
      expect(screen.getByText('Inactive')).toBeInTheDocument()
    })
  })

  it('should render customer group badges', async () => {
    render(<Customers />)
    await waitFor(() => {
      expect(screen.getByText('VIP')).toBeInTheDocument()
      expect(screen.getByText('Regular')).toBeInTheDocument()
      expect(screen.getByText('New')).toBeInTheDocument()
    })
  })
})
