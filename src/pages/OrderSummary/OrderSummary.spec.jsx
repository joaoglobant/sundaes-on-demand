import { render, screen } from '@testing-library/react'
import OrderSummary from './OrderSummary'

describe('OrderSummary', () => {
  it('should render OrderSummary component with correct number of Scoops list elements', async () => {
    render(<OrderSummary />)

    const scoopImages = await screen.findAllByTestId(/Scoops/i)
    expect(scoopImages).toHaveLength(2)

    const altText = scoopImages.map(el => el.alt)
    expect(altText).toEqual(['Scoops', 'Scoops'])
  })

  it('should render OrderSummary component with correct number of Toppings list elements', async () => {
    render(<OrderSummary />)

    const toppingsImages = await screen.findAllByTestId(/Toppings/i)
    expect(toppingsImages).toHaveLength(3)

    const altText = toppingsImages.map(el => el.alt)
    expect(altText).toEqual(['Toppings', 'Toppings', 'Toppings'])
  })
})
