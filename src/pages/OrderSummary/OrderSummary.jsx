import React from 'react'
import Options from '../../components/Options/Options'

const OrderSummary = () => {
  return (
    <div style={{ padding: '50px' }}>
      <h3>Design your Sundae</h3>
      <Options
        title='Scoops'
        eachValue='$2.00'
        totalValue='$6.00'
        data={[
          {
            image: '',
            label: 'Chocolate',
          },
        ]}
      />
      <Options
        checkbox
        title='Toppings'
        eachValue='$1.50'
        totalValue='$4.50'
        data={[
          {
            image: '',
            label: 'Gummi bears',
          },
        ]}
      />
    </div>
  )
}

export default OrderSummary
