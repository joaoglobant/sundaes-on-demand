import { useEffect } from 'react'
import { createContext, useContext, useState, useMemo } from 'react'
import { pricePerItem } from '../utils/pricePerItem'

const OrderDetails = createContext()

const useOrderDetails = () => {
  const context = useContext(OrderDetails)

  if (!context) {
    throw new Error('Error')
  }

  return context
}

const calculateSubtotal = (optionType, optionsCounts) => {
  let optionCount = 0

  for (const count of optionsCounts[optionType].values()) {
    optionCount += count
  }
  return optionCount * pricePerItem[optionType]
}

const OrderDetailsProvider = props => {
  const [optionsCounts, setOptionsCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  })

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  })

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionsCounts)
    const toppinsSubtotal = calculateSubtotal('toppings', optionsCounts)
    const grandTotal = scoopsSubtotal + toppinsSubtotal
    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppinsSubtotal,
      grandTotal,
    })
  }, [optionsCounts])

  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionsCounts = { ...optionsCounts }
      const optionCountsMap = optionsCounts[optionType]
      if (optionType === 'toppings') {
        optionCountsMap.set(itemName, newItemCount)
      } else {
        optionCountsMap.set(itemName, parseInt(newItemCount))
      }
      setOptionsCounts(newOptionsCounts)
    }
    return [{ ...optionsCounts, totals }, updateItemCount]
  }, [optionsCounts, totals])

  return (
    <OrderDetails.Provider value={value} {...props}>
      {props.children}
    </OrderDetails.Provider>
  )
}

export { useOrderDetails, OrderDetailsProvider }
