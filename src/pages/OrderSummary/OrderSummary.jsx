import React, { useEffect, useState } from 'react'
import Options from '../../components/Options/Options'
import { BASE_URL } from '../../mocks/handlers'
import api from '../../services/api'

const OrderSummary = () => {
  const [scoopsData, setScoopsData] = useState([])
  const [toppingsData, setToppingsData] = useState([])
  const [error, setError] = useState()

  const getScoops = () => {
    api
      .get(`${BASE_URL}/scoops`)
      .then(res => {
        setScoopsData(res.data)
      })
      .catch(err => {
        setError(err.response.data.message)
      })
  }

  const getToppings = () => {
    api
      .get(`${BASE_URL}/toppings`)
      .then(res => {
        setToppingsData(res.data)
      })
      .catch(err => {
        setError(err.response.data.message)
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
      <p>{error}</p>
      <Options
        checkbox
        title='Toppings'
        eachValue='$1.50'
        totalValue='$4.50'
        data={toppingsData}
      />
      <p>{error}</p>
    </div>
  )
}

export default OrderSummary
