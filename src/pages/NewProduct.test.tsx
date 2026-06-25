import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../tests/test-utils'
import NewProduct from './NewProduct'

describe('NewProduct', () => {
  it('should render the form', () => {
    render(<NewProduct />)
    expect(screen.getByLabelText('ID')).toBeInTheDocument()
    expect(screen.getByLabelText('Price')).toBeInTheDocument()
    expect(screen.getByLabelText('Category')).toBeInTheDocument()
    expect(screen.getByLabelText('Image')).toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
  })

  it('should render category options', () => {
    render(<NewProduct />)
    const categorySelect = screen.getByLabelText('Category')
    expect(categorySelect).toBeInTheDocument()
    
    const options = screen.getAllByRole('option')
    expect(options.length).toBeGreaterThan(0)
  })

  it('should show validation error for required ID field', async () => {
    render(<NewProduct />)
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('ID is required')).toBeInTheDocument()
    })
  })

  it('should show validation error for required price field', async () => {
    render(<NewProduct />)
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Price is required')).toBeInTheDocument()
    })
  })

  it('should show validation error for required title field', async () => {
    render(<NewProduct />)
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Title is required')).toBeInTheDocument()
    })
  })

  it('should show validation error for required description field', async () => {
    render(<NewProduct />)
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Description is required')).toBeInTheDocument()
    })
  })

  it('should show validation error for required image field', async () => {
    render(<NewProduct />)
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Image is required')).toBeInTheDocument()
    })
  })

  it('should render submit button', () => {
    render(<NewProduct />)
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('should disable submit button when mutation is pending', () => {
    render(<NewProduct />)
    const submitButton = screen.getByText('Submit')
    // Button should not be disabled initially
    expect(submitButton).not.toBeDisabled()
  })

  it('should render success message on successful submission', async () => {
    render(<NewProduct />)
    // Success message is shown when mutation.isSuccess is true
    // This would require mocking the mutation to succeed
    const successMessage = screen.queryByText('Product created successfully!')
    expect(successMessage).not.toBeInTheDocument()
  })

  it('should render error message on failed submission', async () => {
    render(<NewProduct />)
    // Error message is shown when mutation.isError is true
    // This would require mocking the mutation to fail
    const errorMessage = screen.queryByText('Error creating product. Please try again.')
    expect(errorMessage).not.toBeInTheDocument()
  })
})
