import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '../../../tests/test-utils'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import {ThemeProvider} from "../Theme/ThemeProvider.tsx";
import {UserProvider} from "../User/UserProvider.tsx";

describe('ProtectedRoute', () => {
  const mockSetIsSidebarOpen = vi.fn()

  beforeEach(() => {
    localStorage.clear()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={['/dashboard']}>
        <ThemeProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </ThemeProvider>
      </MemoryRouter>
  )

  it('should redirect to login when no token exists', () => {
    render(
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/dashboard" element={
            <ProtectedRoute 
              isSidebarOpen={false} 
              setIsSidebarOpen={mockSetIsSidebarOpen} 
            />
          }>
            <Route index element={<div>Dashboard Content</div>} />
          </Route>
        </Routes>,
        { wrapper }
    )
    expect(screen.getByText('Login Page')).toBeInTheDocument()
    expect(screen.queryByText('Dashboard Content')).not.toBeInTheDocument()
  })

  it('should render protected content when token exists', () => {
    localStorage.setItem('token', 'test-token')
    render(
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/dashboard" element={
            <ProtectedRoute 
              isSidebarOpen={false} 
              setIsSidebarOpen={mockSetIsSidebarOpen} 
            />
          }>
            <Route index element={<div>Dashboard Content</div>} />
          </Route>
        </Routes>,
        { wrapper }
    )
    expect(screen.getByText('Dashboard Content')).toBeInTheDocument()
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument()
  })

  it('should render TopBar when authenticated', () => {
    localStorage.setItem('token', 'test-token')
    render(
        <Routes>
          <Route path="/dashboard" element={
            <ProtectedRoute 
              isSidebarOpen={false} 
              setIsSidebarOpen={mockSetIsSidebarOpen} 
            />
          }>
            <Route index element={<div>Content</div>} />
          </Route>
        </Routes>,
        { wrapper }
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should render Sidebar when authenticated', () => {
    localStorage.setItem('token', 'test-token')
    render(
        <Routes>
          <Route path="/dashboard" element={
            <ProtectedRoute 
              isSidebarOpen={true} 
              setIsSidebarOpen={mockSetIsSidebarOpen} 
            />
          }>
            <Route index element={<div>Content</div>} />
          </Route>
        </Routes>,
        { wrapper }
    )
    // Sidebar should be present when isOpen is true
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})
