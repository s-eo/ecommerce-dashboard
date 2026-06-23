import { type ReactNode } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../../tests/test-utils'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import Sidebar from './Sidebar'

describe('Sidebar', () => {
  const mockOnClose = vi.fn()

  it('should render sidebar logo', () => {
    render(<Sidebar isOpen={true} onClose={mockOnClose} />, {wrapper: BrowserRouter})
    expect(screen.getByText('Ecom Store')).toBeInTheDocument()
    expect(screen.getByText('E')).toBeInTheDocument()
  })

  it('should render navigation items', () => {
    render(<Sidebar isOpen={true} onClose={mockOnClose} />, {wrapper: BrowserRouter})

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Orders')).toBeInTheDocument()
    expect(screen.getByText('Customers')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('should render upgrade section', () => {
    render(<Sidebar isOpen={true} onClose={mockOnClose} />, {wrapper: BrowserRouter})

    expect(screen.getByText('Upgrade to Pro')).toBeInTheDocument()
    expect(screen.getByText('Get access to all features and analytics')).toBeInTheDocument()
    expect(screen.getByText('Upgrade Now')).toBeInTheDocument()
  })

  it('should render logout button', () => {
    render(<Sidebar isOpen={true} onClose={mockOnClose} />, {wrapper: BrowserRouter})

    expect(screen.getByText('Log out')).toBeInTheDocument()
  })

  it('should highlight active route', () => {
    const Wrapper = (props: { children: ReactNode }): ReactNode => (
        <MemoryRouter initialEntries={['/products']}>
          {props.children}
        </MemoryRouter>
    );
    render(<Sidebar isOpen={true} onClose={mockOnClose} />, { wrapper: Wrapper });
    const productsLink = screen.getByText('Products')
    expect(productsLink).toHaveClass('bg-blue-50')
  })

  it('should not render overlay when sidebar is closed', () => {
    render(<Sidebar isOpen={false} onClose={mockOnClose} />, {wrapper: BrowserRouter})

    const overlay = document.querySelector('.fixed.inset-0.bg-black\\/50')
    expect(overlay).not.toBeInTheDocument()
  })

  it('should render overlay when sidebar is open', () => {
    render(<Sidebar isOpen={true} onClose={mockOnClose} />, {wrapper: BrowserRouter})

    const overlay = document.querySelector('.fixed.inset-0.bg-black\\/50')
    expect(overlay).toBeInTheDocument()
  })

  it('should have correct CSS classes when open', () => {
    const { container } = render(<Sidebar isOpen={true} onClose={mockOnClose} />, {wrapper: BrowserRouter})

    const aside = container.querySelector('aside')
    expect(aside).toHaveClass('translate-x-0')
  })

  it('should have correct CSS classes when closed', () => {
    const { container } = render(<Sidebar isOpen={false} onClose={mockOnClose} />, {wrapper: BrowserRouter})

    const aside = container.querySelector('aside')
    expect(aside).toHaveClass('-translate-x-full')
  })
})
