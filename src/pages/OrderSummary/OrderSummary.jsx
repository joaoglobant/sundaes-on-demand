import React, { useEffect, useState } from 'react'
import Options from '../../components/Options/Options'
import { useOrderDetails } from '../../context/OrderDetails.context'
import api from '../../services/api'
import { pricePerItem } from '../../utils/pricePerItem'

const OrderSummary = () => {
  const [orderDetails, updateItemCount] = useOrderDetails()
  const [scoopsData, setScoopsData] = useState([])
  const [toppingsData, setToppingsData] = useState([])
  const [error, setError] = useState(false)
  const [error2, setError2] = useState(false)

  const getScoops = () => {
    api
      .get(`http://localhost:3030/scoops`)
      .then(res => {
        setScoopsData(res.data)
      })
      .catch(err => {
        setError(true)
      })
  }

  const getToppings = () => {
    api
      .get(`http://localhost:3030/toppings`)
      .then(res => {
        setToppingsData(res.data)
      })
      .catch(err => {
        setError2(true)
      })
  }

  useEffect(() => {
    getScoops()
    getToppings()
  }, [])

  const handleChange = (itemName, value, optionType) => {
    if (optionType === 'toppings') {
      updateItemCount(itemName, value, optionType)
    } else {
      updateItemCount(itemName, value, optionType)
    }
  }

  return (
    <div style={{ padding: '50px' }}>
      <h3>Design your Sundae</h3>
      <Options
        title='Scoops'
        eachValue={pricePerItem.scoops}
        totalValue={orderDetails.totals.scoops}
        data={scoopsData}
        handleChange={handleChange}
      />
      {error && <p>An unexpected error ocurred. Please try again later.</p>}
      <Options
        checkbox
        title='Toppings'
        eachValue={pricePerItem.toppings}
        totalValue={orderDetails.totals.toppings}
        data={toppingsData}
        handleChange={handleChange}
      />
      {error2 && <p>An unexpected error ocurred. Please try again later.</p>}
    </div>
  )
}

export default OrderSummary
