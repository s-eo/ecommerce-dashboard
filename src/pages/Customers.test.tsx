import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../tests/test-utils'
import Customers from './Customers'
import {getAllByText, getByText} from "@testing-library/dom";

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
      const table = screen.getByRole('table');
      expect(getByText(table, 'Customer')).toBeInTheDocument()
      expect(getByText(table, 'Group')).toBeInTheDocument()
      expect(getByText(table, 'Total Orders')).toBeInTheDocument()
      expect(getByText(table, 'Total Spent')).toBeInTheDocument()
      expect(getByText(table, 'Location')).toBeInTheDocument()
      expect(getByText(table, 'Status')).toBeInTheDocument()
      expect(getByText(table, 'Joined At')).toBeInTheDocument()
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

  it('should render customer status badges', async () => {
    render(<Customers />)
    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(getAllByText(table, 'Active').length).toBeGreaterThan(0)
      expect(getAllByText(table, 'Inactive').length).toBeGreaterThan(0)
    })
  })

  it('should render customer group badges', async () => {
    render(<Customers />)
    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(getAllByText(table, 'VIP').length).toBeGreaterThan(0)
      expect(getAllByText(table, 'Regular').length).toBeGreaterThan(0)
      expect(getAllByText(table, 'New').length).toBeGreaterThan(0)
    })
  })
})
