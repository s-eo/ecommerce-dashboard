import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../tests/test-utils'
import Modal from './Modal'

describe('Modal', () => {
  const mockOnClose = vi.fn()

  it('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
  })

  it('should render when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )
    const closeButton = screen.getByLabelText('Close modal')
    fireEvent.click(closeButton)
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('should render title correctly', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Custom Title">
        <p>Content</p>
      </Modal>
    )
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
  })

  it('should render children content', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test">
        <div>
          <p>First paragraph</p>
          <p>Second paragraph</p>
        </div>
      </Modal>
    )
    expect(screen.getByText('First paragraph')).toBeInTheDocument()
    expect(screen.getByText('Second paragraph')).toBeInTheDocument()
  })

  it('should have correct aria-label on close button', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test">
        <p>Content</p>
      </Modal>
    )
    const closeButton = screen.getByLabelText('Close modal')
    expect(closeButton).toBeInTheDocument()
  })
})
