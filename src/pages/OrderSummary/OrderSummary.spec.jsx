import { render, screen, waitFor } from '../../test-utils/testing-library'
import userEvent from '@testing-library/user-event'
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

  it('should update scoop subtotal when scoops change', async () => {
    render(<OrderSummary />)

    // make sture starts out 0,00
    const scoopsSubtotal = screen.getByText('Scoops total:', { exact: false })
    expect(scoopsSubtotal).toHaveTextContent('0.00')

    //update vanila scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByLabelText('Vanilla')
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')
    expect(scoopsSubtotal).toHaveTextContent('2.00')

    // update chocalate scoops to 2 and  check subtotal
    const chocolateVanilla = await screen.findByLabelText('Chocolate')
    userEvent.clear(chocolateVanilla)
    userEvent.type(chocolateVanilla, '2')
    expect(scoopsSubtotal).toHaveTextContent('4.00')
  })
})
