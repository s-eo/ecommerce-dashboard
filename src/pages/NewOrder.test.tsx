import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '../../tests/test-utils'
import NewOrder from './NewOrder'

describe('NewOrder', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should render the form', () => {
    render(<NewOrder />)
    expect(screen.getByText('Fill in the details below to create a new order')).toBeInTheDocument()
    expect(screen.getByText('Customer Information')).toBeInTheDocument()
    expect(screen.getByText('Order Details')).toBeInTheDocument()
  })

  it('should render customer information fields', () => {
    render(<NewOrder />)
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone')).toBeInTheDocument()
  })

  it('should render order details fields', () => {
    render(<NewOrder />)
    expect(screen.getByLabelText('Order Number')).toBeInTheDocument()
    expect(screen.getByLabelText('Order Date')).toBeInTheDocument()
    expect(screen.getByLabelText('Status')).toBeInTheDocument()
    expect(screen.getByLabelText('Payment Method')).toBeInTheDocument()
  })

  it('should render shipping information fields', () => {
    render(<NewOrder />)
    expect(screen.getByLabelText('Street Address')).toBeInTheDocument()
    expect(screen.getByLabelText('City')).toBeInTheDocument()
    expect(screen.getByLabelText('Region')).toBeInTheDocument()
    expect(screen.getByLabelText('ZIP Code')).toBeInTheDocument()
    expect(screen.getByLabelText('Country')).toBeInTheDocument()
  })

  it('should render product selection dropdown', () => {
    render(<NewOrder />)
    expect(screen.getByLabelText('Select Product')).toBeInTheDocument()
  })

  it('should render order summary', () => {
    render(<NewOrder />)
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
    expect(screen.getByText('Subtotal')).toBeInTheDocument()
    expect(screen.getByText('Tax (8%)')).toBeInTheDocument()
    expect(screen.getByText('Shipping')).toBeInTheDocument()
  })

  it('should disable submit button when no items are added', () => {
    render(<NewOrder />)
    const submitButton = screen.getByText('Create Order')
    expect(submitButton).toBeDisabled()
  })
})
