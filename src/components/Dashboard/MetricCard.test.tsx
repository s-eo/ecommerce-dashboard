import { describe, it, expect } from 'vitest'
import { render, screen } from '../tests/test-utils'
import MetricCard from './MetricCard'
import type { Metric } from '../../types'

describe('MetricCard', () => {
  const mockMetric: Metric = {
    title: 'Total Revenue',
    value: '$128,430',
    change: '+12.4%',
    color: 'green',
    data: [
      { name: 'Mon', value: 12000 },
      { name: 'Tue', value: 15000 },
      { name: 'Wed', value: 18000 },
      { name: 'Thu', value: 14000 },
      { name: 'Fri', value: 20000 },
      { name: 'Sat', value: 25000 },
      { name: 'Sun', value: 23000 },
    ],
  }

  it('should render metric card with correct title', () => {
    render(<MetricCard {...mockMetric} />)
    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
  })

  it('should render metric card with correct value', () => {
    render(<MetricCard {...mockMetric} />)
    expect(screen.getByText('$128,430')).toBeInTheDocument()
  })

  it('should render metric card with correct change percentage', () => {
    render(<MetricCard {...mockMetric} />)
    expect(screen.getByText('+12.4%')).toBeInTheDocument()
  })

  it('should render with green color', () => {
    const { container } = render(<MetricCard {...mockMetric} />)
    const card = container.querySelector('.bg-white')
    expect(card).toBeInTheDocument()
  })

  it('should render with blue color', () => {
    const blueMetric = { ...mockMetric, color: 'blue' as const }
    const { container } = render(<MetricCard {...blueMetric} />)
    const card = container.querySelector('.bg-white')
    expect(card).toBeInTheDocument()
  })

  it('should render with purple color', () => {
    const purpleMetric = { ...mockMetric, color: 'purple' as const }
    const { container } = render(<MetricCard {...purpleMetric} />)
    const card = container.querySelector('.bg-white')
    expect(card).toBeInTheDocument()
  })

  it('should render with orange color', () => {
    const orangeMetric = { ...mockMetric, color: 'orange' as const }
    const { container } = render(<MetricCard {...orangeMetric} />)
    const card = container.querySelector('.bg-white')
    expect(card).toBeInTheDocument()
  })

  it('should render chart container', () => {
    const { container } = render(<MetricCard {...mockMetric} />)
    const chartContainer = container.querySelector('.h-16')
    expect(chartContainer).toBeInTheDocument()
  })

  it('should render arrow up icon', () => {
    const { container } = render(<MetricCard {...mockMetric} />)
    const arrowIcon = container.querySelector('svg')
    expect(arrowIcon).toBeInTheDocument()
  })
})
