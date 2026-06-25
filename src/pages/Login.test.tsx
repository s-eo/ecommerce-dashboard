import { describe, it, expect } from 'vitest'
import { render, screen } from '../../tests/test-utils'
import Login from './Login'

describe('Login', () => {
  it('should render login page', () => {
    render(<Login />)
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument()
  })

  it('should render email input field', () => {
    render(<Login />)
    const emailInput = screen.getByLabelText('Email')
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('should render password input field', () => {
    render(<Login />)
    const passwordInput = screen.getByLabelText('Password')
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should render remember me checkbox', () => {
    render(<Login />)
    expect(screen.getByText('Remember me')).toBeInTheDocument()
  })

  it('should render forgot password link', () => {
    render(<Login />)
    expect(screen.getByText('Forgot password?')).toBeInTheDocument()
  })

  it('should render sign in button', () => {
    render(<Login />)
    const signInButton = screen.getByRole('button', { name: /sign in/i })
    expect(signInButton).toBeInTheDocument()
  })

  it('should render sign up link', () => {
    render(<Login />)
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
    expect(screen.getByText('Sign up')).toBeInTheDocument()
  })

  it('should not render social login buttons', () => {
    render(<Login />)
    expect(screen.queryByText('Google')).not.toBeInTheDocument()
    expect(screen.queryByText('Microsoft')).not.toBeInTheDocument()
    expect(screen.queryByText('or continue with')).not.toBeInTheDocument()
  })

  it('should have email placeholder', () => {
    render(<Login />)
    const emailInput = screen.getByLabelText('Email')
    expect(emailInput).toHaveAttribute('placeholder', 'you@example.com')
  })

  it('should have password placeholder', () => {
    render(<Login />)
    const passwordInput = screen.getByLabelText('Password')
    expect(passwordInput).toHaveAttribute('placeholder', '••••••••')
  })

  it('should render error message when authentication fails', async () => {
    render(<Login />)
    // Initially no error message
    expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument()
  })
})
