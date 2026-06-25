import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../tests/test-utils'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AnAuthRoute from './AnAuthRoute'
import {UserProvider} from "../User/UserProvider.tsx";
import {ThemeProvider} from "../Theme/ThemeProvider.tsx";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter initialEntries={['/login']}>
    <ThemeProvider>
      <UserProvider>
        <Routes>
          {children}
        </Routes>
      </UserProvider>
    </ThemeProvider>
  </MemoryRouter>
)

describe('AnAuthRoute', () => {
  it('should render TopBar with logo', () => {
    render(<Route path="/login" element={
            <AnAuthRoute />
          } />, { wrapper }
    )
    // TopBar should be rendered
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should render Outlet for child routes', () => {
    render(
          <Route path="/login" element={
            <AnAuthRoute />
          }>
            <Route index element={<div>Child Content</div>} />
          </Route>, { wrapper }
    )
    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })
})
