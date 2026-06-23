import { describe, it, expect } from 'vitest'
import { render, screen } from '../../tests/test-utils'
import Analytics from './Analytics'

describe('Analytics', () => {
  it('should render analytics page header', () => {
    render(<Analytics />)
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Overview of your business performance')).toBeInTheDocument()
  })

  it('should render key metrics cards', () => {
    render(<Analytics />)
    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
    expect(screen.getByText('Total Orders')).toBeInTheDocument()
    expect(screen.getByText('Total Customers')).toBeInTheDocument()
    expect(screen.getByText('Avg. Order Value')).toBeInTheDocument()
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument()
  })

  it('should render metric values', () => {
    render(<Analytics />)
    expect(screen.getByText('$45,231.89')).toBeInTheDocument()
    expect(screen.getByText('1,245')).toBeInTheDocument()
    expect(screen.getByText('892')).toBeInTheDocument()
    expect(screen.getByText('$36.32')).toBeInTheDocument()
    expect(screen.getByText('3.24%')).toBeInTheDocument()
  })

  it('should render metric changes', () => {
    render(<Analytics />)
    expect(screen.getByText('+20.1%')).toBeInTheDocument()
    expect(screen.getByText('+15.3%')).toBeInTheDocument()
    expect(screen.getByText('+12.5%')).toBeInTheDocument()
    expect(screen.getByText('+4.2%')).toBeInTheDocument()
    expect(screen.getByText('+0.8%')).toBeInTheDocument()
  })

  it('should render revenue overview chart', () => {
    render(<Analytics />)
    expect(screen.getByText('Revenue Overview')).toBeInTheDocument()
  })

  it('should render sales by channel chart', () => {
    render(<Analytics />)
    expect(screen.getByText('Sales by Channel')).toBeInTheDocument()
  })

  it('should render sales channel data', () => {
    render(<Analytics />)
    expect(screen.getByText('Online Store')).toBeInTheDocument()
    expect(screen.getByText('Mobile App')).toBeInTheDocument()
    expect(screen.getByText('Marketplace')).toBeInTheDocument()
    expect(screen.getByText('Retail Store')).toBeInTheDocument()
  })

  it('should render orders overview chart', () => {
    render(<Analytics />)
    expect(screen.getByText('Orders Overview')).toBeInTheDocument()
  })

  it('should render orders total', () => {
    render(<Analytics />)
    expect(screen.getByText('Total: 371')).toBeInTheDocument()
  })

  it('should render top selling products table', () => {
    render(<Analytics />)
    expect(screen.getByText('Top Selling Products')).toBeInTheDocument()
  })

  it('should render top products data', () => {
    render(<Analytics />)
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    expect(screen.getByText('Smart Watch')).toBeInTheDocument()
    expect(screen.getByText('Laptop Stand')).toBeInTheDocument()
  })

  it('should render top categories table', () => {
    render(<Analytics />)
    expect(screen.getByText('Top Categories')).toBeInTheDocument()
  })

  it('should render top categories data', () => {
    render(<Analytics />)
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('Clothing')).toBeInTheDocument()
    expect(screen.getByText('Accessories')).toBeInTheDocument()
  })

  it('should render customer insights section', () => {
    render(<Analytics />)
    expect(screen.getByText('Customer Insights')).toBeInTheDocument()
  })

  it('should render customer insight cards', () => {
    render(<Analytics />)
    expect(screen.getByText('New Customers')).toBeInTheDocument()
    expect(screen.getByText('Returning Customers')).toBeInTheDocument()
    expect(screen.getByText('Customer Lifetime Value')).toBeInTheDocument()
    expect(screen.getByText('Churn Rate')).toBeInTheDocument()
  })

  it('should render customer insight values', () => {
    render(<Analytics />)
    expect(screen.getByText('156')).toBeInTheDocument()
    expect(screen.getByText('736')).toBeInTheDocument()
    expect(screen.getByText('$1,245.32')).toBeInTheDocument()
    expect(screen.getByText('2.4%')).toBeInTheDocument()
  })

  it('should render footer text', () => {
    render(<Analytics />)
    expect(screen.getByText('Analytics data is updated every 30 minutes. All times are shown in your local timezone.')).toBeInTheDocument()
  })

  it('should render table headers for top products', () => {
    render(<Analytics />)
    expect(screen.getByText('Product')).toBeInTheDocument()
    expect(screen.getByText('Sales')).toBeInTheDocument()
    expect(screen.getByText('Revenue')).toBeInTheDocument()
  })

  it('should render table headers for top categories', () => {
    render(<Analytics />)
    const headers = screen.getAllByText('Category')
    expect(headers.length).toBeGreaterThan(0)
    expect(screen.getByText('Orders')).toBeInTheDocument()
  })
})
