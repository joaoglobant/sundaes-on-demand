import { render, screen } from '../../test-utils/testing-library'
import Options from './Options'

describe('<Options/>', () => {
  it('should render Options Component with correct values', () => {
    render(
      <Options
        title='Scoops'
        eachValue='$2.00'
        totalValue='$6.00'
        data={[
          {
            imagePath: 'http://localhost:3000/chocolate.png',
            label: 'Chocolate',
          },
          {
            imagePath: 'http://localhost:3000/vanilla.png',
            label: 'Vanilla',
          },
        ]}
      />
    )

    //find images
    const scoopImages = screen.getAllByTestId(/Scoops/i)
    expect(scoopImages).toHaveLength(2)

    //confirm alt test of images
    const altText = scoopImages.map(el => el.alt)
    expect(altText).toEqual(['Scoops', 'Scoops'])
  })
})
