import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const initialContext = {
  name: null,
  number: null,
  loading: false,
  error: false
}

export const OrderDataContext = createContext(initialContext)

const OrderDataProvider = ({ children }) => {
  const [orderData, setOrderData] = useState(initialContext)
  
  return (
    <OrderDataContext.Provider value={{orderData, setOrderData}}>
      {children}
    </OrderDataContext.Provider>
  )
}

OrderDataProvider.propTypes = {
  children: PropTypes.node
}

export const useOrderData = () => useContext(OrderDataContext)

export default OrderDataProvider
