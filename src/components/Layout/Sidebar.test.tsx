import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../tests/test-utils'
import { MemoryRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'react-router-dom'
import Sidebar from './Sidebar'

describe('Sidebar', () => {
  const mockOnClose = vi.fn()

  it('should render sidebar logo', () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    )
    expect(screen.getByText('Ecom Store')).toBeInTheDocument()
    expect(screen.getByText('E')).toBeInTheDocument()
  })

  it('should render navigation items', () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    )
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Orders')).toBeInTheDocument()
    expect(screen.getByText('Customers')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('should render upgrade section', () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    )
    expect(screen.getByText('Upgrade to Pro')).toBeInTheDocument()
    expect(screen.getByText('Get access to all features and analytics')).toBeInTheDocument()
    expect(screen.getByText('Upgrade Now')).toBeInTheDocument()
  })

  it('should render logout button', () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    )
    expect(screen.getByText('Log out')).toBeInTheDocument()
  })

  it('should highlight active route', () => {
    const history = createMemoryHistory({ initialEntries: ['/products'] })
    render(
      <Router location={history.location} navigator={history}>
        <Sidebar isOpen={true} onClose={mockOnClose} />
      </Router>
    )
    const productsLink = screen.getByText('Products')
    expect(productsLink).toHaveClass('bg-blue-50')
  })

  it('should call onClose when overlay is clicked on mobile', () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    )
    const overlay = screen.getByRole('presentation').firstChild as HTMLElement
    if (overlay) {
      fireEvent.click(overlay)
      expect(mockOnClose).toHaveBeenCalled()
    }
  })

  it('should not render overlay when sidebar is closed', () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={false} onClose={mockOnClose} />
      </MemoryRouter>
    )
    const overlay = document.querySelector('.fixed.inset-0.bg-black\\/50')
    expect(overlay).not.toBeInTheDocument()
  })

  it('should render overlay when sidebar is open', () => {
    render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    )
    const overlay = document.querySelector('.fixed.inset-0.bg-black\\/50')
    expect(overlay).toBeInTheDocument()
  })

  it('should have correct CSS classes when open', () => {
    const { container } = render(
      <MemoryRouter>
        <Sidebar isOpen={true} onClose={mockOnClose} />
      </MemoryRouter>
    )
    const aside = container.querySelector('aside')
    expect(aside).toHaveClass('translate-x-0')
  })

  it('should have correct CSS classes when closed', () => {
    const { container } = render(
      <MemoryRouter>
        <Sidebar isOpen={false} onClose={mockOnClose} />
      </MemoryRouter>
    )
    const aside = container.querySelector('aside')
    expect(aside).toHaveClass('-translate-x-full')
  })
})
