import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../tests/test-utils'
import Logo from './Logo'

describe('Logo', () => {
  it('should render the logo', () => {
    render(<Logo />)
    expect(screen.getByText('Ecom Store')).toBeInTheDocument()
  })

  it('should render the E icon', () => {
    render(<Logo />)
    expect(screen.getByText('E')).toBeInTheDocument()
  })
})
