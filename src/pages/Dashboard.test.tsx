import { describe, it, expect } from 'vitest'
import { render, screen } from '../../tests/test-utils'
import Dashboard from './Dashboard'

describe('Dashboard', () => {
  it('should render dashboard page', () => {
    render(<Dashboard />)
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('Orders')).toBeInTheDocument()
    expect(screen.getByText('Customers')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('should render metric cards with correct values', () => {
    render(<Dashboard />)
    expect(screen.getByText('$128,430')).toBeInTheDocument()
    expect(screen.getByText('1,245')).toBeInTheDocument()
    expect(screen.getByText('4,892')).toBeInTheDocument()
    expect(screen.getByText('312')).toBeInTheDocument()
  })

  it('should render metric cards with change percentages', () => {
    render(<Dashboard />)
    expect(screen.getByText('12.4%')).toBeInTheDocument()
    expect(screen.getByText('8.2%')).toBeInTheDocument()
    expect(screen.getByText('5.1%')).toBeInTheDocument()
    expect(screen.getByText('+24')).toBeInTheDocument()
  })

  it('should render revenue chart section', () => {
    render(<Dashboard />)
    expect(screen.getByText('Revenue Overview')).toBeInTheDocument()
  })

  it('should render recent orders section', () => {
    render(<Dashboard />)
    expect(screen.getByText('Recent Orders')).toBeInTheDocument()
  })

  it('should render customer names in recent orders', () => {
    render(<Dashboard />)
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
    expect(screen.getByText('Bob Smith')).toBeInTheDocument()
    expect(screen.getByText('Carol White')).toBeInTheDocument()
  })

  it('should render order numbers in recent orders', () => {
    render(<Dashboard />)
    expect(screen.getByText('#001')).toBeInTheDocument()
    expect(screen.getByText('#002')).toBeInTheDocument()
    expect(screen.getByText('#003')).toBeInTheDocument()
  })

  it('should render order amounts in recent orders', () => {
    render(<Dashboard />)
    expect(screen.getByText('$234.50')).toBeInTheDocument()
    expect(screen.getByText('$189.00')).toBeInTheDocument()
    expect(screen.getByText('$456.75')).toBeInTheDocument()
  })

  it('should render status badges in recent orders', () => {
    render(<Dashboard />)
    expect(screen.getByText('Processing')).toBeInTheDocument()
    expect(screen.getByText('Delivered')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('Cancelled')).toBeInTheDocument()
  })

  it('should render view all buttons', () => {
    render(<Dashboard />)
    const viewAllButtons = screen.getAllByText('View all')
    expect(viewAllButtons.length).toBeGreaterThan(0)
  })

  it('should render time period selector', () => {
    render(<Dashboard />)
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
  })

  it('should have correct select options', () => {
    render(<Dashboard />)
    expect(screen.getByText('This Month')).toBeInTheDocument()
    expect(screen.getByText('Last Month')).toBeInTheDocument()
    expect(screen.getByText('Last 3 Months')).toBeInTheDocument()
    expect(screen.getByText('Last Year')).toBeInTheDocument()
  })
})
