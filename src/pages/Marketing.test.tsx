import { describe, it, expect } from 'vitest'
import { render, screen } from '../../tests/test-utils'
import Marketing from './Marketing'

describe('Marketing', () => {
  it('should render the page', () => {
    render(<Marketing />)
    expect(screen.getByText('Marketing')).toBeInTheDocument()
  })

  it('should render coming soon message', () => {
    render(<Marketing />)
    expect(screen.getByText('Marketing page coming soon...')).toBeInTheDocument()
  })
})
