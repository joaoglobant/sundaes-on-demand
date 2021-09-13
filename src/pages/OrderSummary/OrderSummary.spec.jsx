import { render, screen, waitFor } from '@testing-library/react'
import { server } from '../../mocks/server'
import { rest } from 'msw'
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

  it('handles error for scoops and toppings routes', async () => {
    server.resetHandlers(
      rest.get(`http://localhost:3030/scoops`, (req, res, ctx) => {
        return res(ctx.status(500))
      }),
      rest.get(`http://localhost:3030/toppings`, (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    render(<OrderSummary />)

    await waitFor(async () => {
      const alerts = await screen.findAllByText(
        'An unexpected error ocurred. Please try again later.'
      )
      expect(alerts).toHaveLength(2)
    })
  })
})
