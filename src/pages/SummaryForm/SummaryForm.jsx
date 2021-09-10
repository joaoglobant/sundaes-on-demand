import React, { useState } from 'react'
import Tooltip from '../../components/Tooltip/Tooltip'

const SummaryForm = () => {
  const [isDisabled, setIsDisasbled] = useState(false)
  const handleChecked = () => setIsDisasbled(prev => !prev)
  const onSubmit = () => {}
  return (
    <form onSubmit={onSubmit}>
      <h1>Order Summary</h1>
      {[
        { product: 'Scoops', price: '$6,00', quantity: 3 },
        { product: 'Topping', price: '$4,50', quantity: 3 },
      ].map(product => (
        <div key={product.product}>
          <h4>
            {product.product}: <span>{product.price}</span>
          </h4>
          <p>quantidade: {product.quantity}</p>
        </div>
      ))}
      <input
        style={{ margin: '10px 10px 20px 0px' }}
        id='disable-checkbox'
        type='checkbox'
        onChange={handleChecked}
        aria-checked={isDisabled}
        defaultChecked={isDisabled}
      />
      <label htmlFor='disable-checkbox'>
        I agree to{' '}
        <Tooltip
          content='No ice cream will actually be delivered'
          direction='right'
        >
          <a href='#/'>Terms and Conditions</a>
        </Tooltip>
      </label>
      <button style={{ display: 'block' }} disabled={!isDisabled}>
        Confirm Order
      </button>
    </form>
  )
}

export default SummaryForm
