import React from 'react'
import { render, screen } from '@testing-library/react'

import { Button } from './Button'

describe('Test component', () => {
  it('should render the component', () => {
    render(<Button />)
    const component = screen.getByTestId('my-button')
    expect(component).toBeInTheDocument()
  })
})
