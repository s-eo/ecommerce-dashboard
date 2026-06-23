import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../tests/test-utils'
import RevenueChart from './RevenueChart'

describe('RevenueChart', () => {
  const mockData = [
    { date: 'Jan 1', value: 12000 },
    { date: 'Jan 2', value: 15000 },
    { date: 'Jan 3', value: 18000 },
    { date: 'Jan 4', value: 14000 },
    { date: 'Jan 5', value: 20000 },
    { date: 'Jan 6', value: 25000 },
    { date: 'Jan 7', value: 23000 },
  ]

  it('should render revenue chart title', () => {
    render(<RevenueChart data={mockData} />)
    expect(screen.getByText('Revenue Overview')).toBeInTheDocument()
  })

  it('should render revenue amount', () => {
    render(<RevenueChart data={mockData} />)
    expect(screen.getByText('$128,430')).toBeInTheDocument()
  })

  it('should render percentage change', () => {
    render(<RevenueChart data={mockData} />)
    expect(screen.getByText('12.4% vs last month')).toBeInTheDocument()
  })

  it('should render time period selector', () => {
    render(<RevenueChart data={mockData} />)
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
  })

  it('should have correct select options', () => {
    render(<RevenueChart data={mockData} />)
    expect(screen.getByText('This Month')).toBeInTheDocument()
    expect(screen.getByText('Last Month')).toBeInTheDocument()
    expect(screen.getByText('Last 3 Months')).toBeInTheDocument()
    expect(screen.getByText('Last Year')).toBeInTheDocument()
  })

  it('should render chart container', () => {
    const { container } = render(<RevenueChart data={mockData} />)
    const chartContainer = container.querySelector('.h-80')
    expect(chartContainer).toBeInTheDocument()
  })

  it('should render with empty data', () => {
    render(<RevenueChart data={[]} />)
    expect(screen.getByText('Revenue Overview')).toBeInTheDocument()
  })

  it('should render with single data point', () => {
    const singleData = [{ date: 'Jan 1', value: 12000 }]
    render(<RevenueChart data={singleData} />)
    expect(screen.getByText('Revenue Overview')).toBeInTheDocument()
  })
})
