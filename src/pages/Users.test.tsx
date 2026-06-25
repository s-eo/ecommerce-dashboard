import { describe, it, expect } from 'vitest'
import { render, screen } from '../../tests/test-utils'
import Users from './Users'

describe('Users', () => {
  it('should render the page', () => {
    render(<Users />)
    expect(screen.getByText('Users & Roles')).toBeInTheDocument()
  })

  it('should render coming soon message', () => {
    render(<Users />)
    expect(screen.getByText('Users & Roles page coming soon...')).toBeInTheDocument()
  })
})
