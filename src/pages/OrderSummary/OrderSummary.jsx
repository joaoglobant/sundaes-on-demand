import React, { useEffect, useState } from 'react'
import Options from '../../components/Options/Options'
import api from '../../services/api'

const OrderSummary = () => {
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

  return (
    <div style={{ padding: '50px' }}>
      <h3>Design your Sundae</h3>
      <Options
        title='Scoops'
        eachValue='$2.00'
        totalValue='$6.00'
        data={scoopsData}
      />
      {error && <p>An unexpected error ocurred. Please try again later.</p>}
      <Options
        checkbox
        title='Toppings'
        eachValue='$1.50'
        totalValue='$4.50'
        data={toppingsData}
      />
      {error2 && <p>An unexpected error ocurred. Please try again later.</p>}
    </div>
  )
}

export default OrderSummary
