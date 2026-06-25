import { describe, it, expect } from 'vitest'
import { render, screen } from '../../tests/test-utils'
import Settings from './Settings'

describe('Settings', () => {
  it('should render the page', () => {
    render(<Settings />)
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('should render coming soon message', () => {
    render(<Settings />)
    expect(screen.getByText('Settings page coming soon...')).toBeInTheDocument()
  })
})
