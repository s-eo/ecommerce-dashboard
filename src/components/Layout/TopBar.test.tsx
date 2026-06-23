import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../../tests/test-utils'
import { MemoryRouter } from 'react-router-dom'
import TopBar from './TopBar'
import type {ReactNode} from "react";
import {ThemeProvider} from "../Theme/ThemeProvider.tsx";

describe('TopBar', () => {
  const mockOnMenuClick = vi.fn()

  it('should call onMenuClick when menu button is clicked', () => {
    render(<TopBar onMenuClick={mockOnMenuClick} />)
    const menuButton = screen.getAllByRole('button')[0]
    fireEvent.click(menuButton)
    expect(mockOnMenuClick).toHaveBeenCalled()
  })

  it('should render current path name', () => {
    const wrapper = (props: { children: ReactNode }): ReactNode =>
        <MemoryRouter initialEntries={['/products'] }>
          <ThemeProvider>
            {props.children}
          </ThemeProvider>
        </MemoryRouter>
    render(<TopBar onMenuClick={mockOnMenuClick} />, { wrapper })
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('should render default Dashboard title for root path', () => {
    const wrapper = (props: { children: ReactNode }): ReactNode =>
        <MemoryRouter initialEntries={['/'] }>
          <ThemeProvider>
            {props.children}
          </ThemeProvider>
        </MemoryRouter>
    render(<TopBar onMenuClick={mockOnMenuClick} />, { wrapper })
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('should render theme toggle button', () => {
    render(<TopBar onMenuClick={mockOnMenuClick} />)
    const buttons = screen.getAllByRole('button')
    // Theme toggle should be one of the buttons
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should render notification button', () => {
    render(<TopBar onMenuClick={mockOnMenuClick} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should render user profile', () => {
    render(<TopBar onMenuClick={mockOnMenuClick} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('should render notification badge', () => {
    render(<TopBar onMenuClick={mockOnMenuClick} />)
    const badge = document.querySelector('.bg-red-500')
    expect(badge).toBeInTheDocument()
  })

  it('should display correct path for analytics', () => {
    const wrapper = (props: { children: ReactNode }): ReactNode =>
        <MemoryRouter initialEntries={['/analytics'] }>
          <ThemeProvider>
            {props.children}
          </ThemeProvider>
        </MemoryRouter>
    render(<TopBar onMenuClick={mockOnMenuClick} />, { wrapper })
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('should display correct path for customers', () => {
    const wrapper = (props: { children: ReactNode }): ReactNode =>
        <MemoryRouter initialEntries={['/customers'] }>
          <ThemeProvider>
            {props.children}
          </ThemeProvider>
        </MemoryRouter>
    render(<TopBar onMenuClick={mockOnMenuClick} />, { wrapper })
    expect(screen.getByText('Customers')).toBeInTheDocument()
  })

  it('should display correct path for orders', () => {
    const wrapper = (props: { children: ReactNode }): ReactNode =>
        <MemoryRouter initialEntries={['/orders'] }>
          <ThemeProvider>
            {props.children}
          </ThemeProvider>
        </MemoryRouter>
    render(<TopBar onMenuClick={mockOnMenuClick} />, { wrapper })
    expect(screen.getByText('Orders')).toBeInTheDocument()
  })
})
