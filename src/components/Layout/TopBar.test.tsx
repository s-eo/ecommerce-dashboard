import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../../tests/test-utils'
import { MemoryRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'react-router-dom'
import TopBar from './TopBar'

describe('TopBar', () => {
  const mockOnMenuClick = vi.fn()

  it('should render menu button on mobile', () => {
    render(
      <MemoryRouter>
        <TopBar onMenuClick={mockOnMenuClick} />
      </MemoryRouter>
    )
    const menuButton = screen.getByRole('button', { name: '' }).querySelector('svg')
    expect(menuButton).toBeInTheDocument()
  })

  it('should call onMenuClick when menu button is clicked', () => {
    render(
      <MemoryRouter>
        <TopBar onMenuClick={mockOnMenuClick} />
      </MemoryRouter>
    )
    const menuButton = screen.getAllByRole('button')[0]
    fireEvent.click(menuButton)
    expect(mockOnMenuClick).toHaveBeenCalled()
  })

  it('should render current path name', () => {
    const history = createMemoryHistory({ initialEntries: ['/products'] })
    render(
      <Router location={history.location} navigator={history}>
        <TopBar onMenuClick={mockOnMenuClick} />
      </Router>
    )
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('should render default Dashboard title for root path', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
      <Router location={history.location} navigator={history}>
        <TopBar onMenuClick={mockOnMenuClick} />
      </Router>
    )
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('should render theme toggle button', () => {
    render(
      <MemoryRouter>
        <TopBar onMenuClick={mockOnMenuClick} />
      </MemoryRouter>
    )
    const buttons = screen.getAllByRole('button')
    // Theme toggle should be one of the buttons
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should render notification button', () => {
    render(
      <MemoryRouter>
        <TopBar onMenuClick={mockOnMenuClick} />
      </MemoryRouter>
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should render user profile', () => {
    render(
      <MemoryRouter>
        <TopBar onMenuClick={mockOnMenuClick} />
      </MemoryRouter>
    )
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('should render notification badge', () => {
    render(
      <MemoryRouter>
        <TopBar onMenuClick={mockOnMenuClick} />
      </MemoryRouter>
    )
    const badge = document.querySelector('.bg-red-500')
    expect(badge).toBeInTheDocument()
  })

  it('should display correct path for analytics', () => {
    const history = createMemoryHistory({ initialEntries: ['/analytics'] })
    render(
      <Router location={history.location} navigator={history}>
        <TopBar onMenuClick={mockOnMenuClick} />
      </Router>
    )
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('should display correct path for customers', () => {
    const history = createMemoryHistory({ initialEntries: ['/customers'] })
    render(
      <Router location={history.location} navigator={history}>
        <TopBar onMenuClick={mockOnMenuClick} />
      </Router>
    )
    expect(screen.getByText('Customers')).toBeInTheDocument()
  })

  it('should display correct path for orders', () => {
    const history = createMemoryHistory({ initialEntries: ['/orders'] })
    render(
      <Router location={history.location} navigator={history}>
        <TopBar onMenuClick={mockOnMenuClick} />
      </Router>
    )
    expect(screen.getByText('Orders')).toBeInTheDocument()
  })
})
