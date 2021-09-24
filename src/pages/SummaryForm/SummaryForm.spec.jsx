import { render, screen, waitFor } from '../../test-utils/testing-library'
import userEvent from '@testing-library/user-event'
import SummaryForm from './SummaryForm'

describe('<SummaryForm/>', () => {
  it('should render initial conditions', () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox', {
      name: /I agree to Terms and Conditions/i,
    })
    expect(checkbox).not.toBeChecked()

    const button = screen.getByRole('button', { name: /Confirm Order/i })
    expect(button).toBeDisabled()
  })

  it('should render button enabled on first click', () => {
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox', {
      name: /I agree to Terms and Conditions/i,
    })
    expect(checkbox).not.toBeChecked()
    userEvent.click(checkbox)

    const button = screen.getByRole('button', { name: /Confirm Order/i })
    expect(button).toBeEnabled()
  })

  it('tooltip should responds to hover', async () => {
    render(<SummaryForm />)

    expect(
      screen.queryByText(/No ice cream will actually be delivered/i)
    ).not.toBeInTheDocument()

    const tooltip = screen.getByText('Terms and Conditions')
    userEvent.hover(tooltip)

    await waitFor(() => {
      expect(
        screen.queryByText(/No ice cream will actually be delivered/i)
      ).toBeInTheDocument()
    })

    userEvent.unhover(tooltip)
    expect(
      screen.queryByText(/No ice cream will actually be delivered/i)
    ).not.toBeInTheDocument()
  })
})
