import { describe, it, expect } from 'vitest'
import { render, screen } from '../../tests/test-utils'
import Signup from './Signup'

describe('Signup', () => {
  it('should render signup page', () => {
    render(<Signup />)
    expect(screen.getByText('Create your account')).toBeInTheDocument()
  })

  it('should render name input field', () => {
    render(<Signup />)
    const nameInput = screen.getByLabelText('Full Name')
    expect(nameInput).toBeInTheDocument()
    expect(nameInput).toHaveAttribute('type', 'text')
  })

  it('should render email input field', () => {
    render(<Signup />)
    const emailInput = screen.getByLabelText('Email')
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('should render password input field', () => {
    render(<Signup />)
    const passwordInput = screen.getByLabelText('Password')
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should render confirm password input field', () => {
    render(<Signup />)
    const confirmPasswordInput = screen.getByLabelText('Confirm Password')
    expect(confirmPasswordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')
  })

  it('should render terms checkbox', () => {
    render(<Signup />)
    expect(screen.getByLabelText(/terms of service/i)).toBeInTheDocument()
  })

  it('should render sign up button', () => {
    render(<Signup />)
    const signUpButton = screen.getByRole('button', { name: /sign up/i })
    expect(signUpButton).toBeInTheDocument()
  })

  it('should render sign in link', () => {
    render(<Signup />)
    expect(screen.getByText('Already have an account?')).toBeInTheDocument()
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })

  it('should have name placeholder', () => {
    render(<Signup />)
    const nameInput = screen.getByLabelText('Full Name')
    expect(nameInput).toHaveAttribute('placeholder', 'John Doe')
  })

  it('should have email placeholder', () => {
    render(<Signup />)
    const emailInput = screen.getByLabelText('Email')
    expect(emailInput).toHaveAttribute('placeholder', 'you@example.com')
  })

  it('should have password placeholder', () => {
    render(<Signup />)
    const passwordInput = screen.getByLabelText('Password')
    expect(passwordInput).toHaveAttribute('placeholder', '••••••••')
  })

  it('should have confirm password placeholder', () => {
    render(<Signup />)
    const confirmPasswordInput = screen.getByLabelText('Confirm Password')
    expect(confirmPasswordInput).toHaveAttribute('placeholder', '••••••••')
  })

  it('should render terms of service link', () => {
    render(<Signup />)
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
  })

  it('should render privacy policy link', () => {
    render(<Signup />)
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
  })

  it('should not render social login buttons', () => {
    render(<Signup />)
    expect(screen.queryByText('Google')).not.toBeInTheDocument()
    expect(screen.queryByText('Microsoft')).not.toBeInTheDocument()
    expect(screen.queryByText('or continue with')).not.toBeInTheDocument()
  })

  it('should not render success modal initially', () => {
    render(<Signup />)
    expect(screen.queryByText('Account Created Successfully')).not.toBeInTheDocument()
  })

  it('should not render error modal initially', () => {
    render(<Signup />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
