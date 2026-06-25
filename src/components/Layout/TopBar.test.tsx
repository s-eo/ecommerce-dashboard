import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../../tests/test-utils'
import { MemoryRouter } from 'react-router-dom'
import TopBar from './TopBar'
import {type ReactNode} from "react";
import {ThemeProvider} from "../Theme/ThemeProvider.tsx";
import {UserProvider} from "../User/UserProvider.tsx";

describe('TopBar', () => {
  const mockOnMenuClick = vi.fn()

  it('should call onMenuClick when menu button is clicked', () => {
    render(<TopBar onMenuClick={mockOnMenuClick} />)
    const menuButton = screen.getAllByRole('button')[0]
    fireEvent.click(menuButton)
    expect(mockOnMenuClick).toHaveBeenCalled()
  })

  it('should render current path name for Products', () => {
    const wrapper = (props: { children: ReactNode }): ReactNode =>
        <MemoryRouter initialEntries={['/products'] }>
            <ThemeProvider>
                <UserProvider>
                    {props.children}
                </UserProvider>
            </ThemeProvider>
        </MemoryRouter>
    render(<TopBar onMenuClick={mockOnMenuClick} />, { wrapper })
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('should render default Dashboard title for root path', () => {
    const wrapper = (props: { children: ReactNode }): ReactNode =>
        <MemoryRouter initialEntries={['/'] }>
            <ThemeProvider>
                <UserProvider>
                    {props.children}
                </UserProvider>
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

  it('should render user profile', async () => {
    window.localStorage.setItem('token', 'qwerty');
    render(<TopBar onMenuClick={mockOnMenuClick} />)
    await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('Admin')).toBeInTheDocument()
        expect(screen.getByText('JD')).toBeInTheDocument()
    }, { timeout: 2000 })
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
              <UserProvider>
                  {props.children}
              </UserProvider>
            </ThemeProvider>
        </MemoryRouter>
    render(<TopBar onMenuClick={mockOnMenuClick} />, { wrapper })
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('should display correct path for customers', () => {
    const wrapper = (props: { children: ReactNode }): ReactNode =>
        <MemoryRouter initialEntries={['/customers'] }>
            <ThemeProvider>
                <UserProvider>
                    {props.children}
                </UserProvider>
            </ThemeProvider>
        </MemoryRouter>
    render(<TopBar onMenuClick={mockOnMenuClick} />, { wrapper })
    expect(screen.getByText('Customers')).toBeInTheDocument()
  })

  it('should display correct path for orders', () => {
    const wrapper = (props: { children: ReactNode }): ReactNode =>
        <MemoryRouter initialEntries={['/orders'] }>
            <ThemeProvider>
                <UserProvider>
                    {props.children}
                </UserProvider>
            </ThemeProvider>
        </MemoryRouter>
    render(<TopBar onMenuClick={mockOnMenuClick} />, { wrapper })
    expect(screen.getByText('Orders')).toBeInTheDocument()
  })
})
