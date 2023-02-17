import React, { createContext, useContext, useState, useEffect  } from 'react'
import PropTypes from 'prop-types'
import {requestWrapper} from '../../utils/index'
import {API_URL} from '../../constants'

const initialContext = {
  ingredients: [],
  loading: false,
  error: false
}

export const IngredientsContext = createContext(initialContext)


const IngredientsProvider = ({ children }) => {
  const [state, setState] = useState(initialContext)
  
  useEffect(() => {
    const getData = async () => {
      try {
        setState({...state, loading: true});
        const {data} = await requestWrapper({url: `${API_URL}/ingredients`})
        setState({ ...state, ingredients: data, loading: false});
      } catch(e) {
        setState({...state, error: e});
      }    
    }
    getData()

  }, [])
  
  return (
    <IngredientsContext.Provider value={state}>
      {children}
    </IngredientsContext.Provider>
  )
}

IngredientsProvider.propTypes = {
  children: PropTypes.node
}

export const useIngredients = () => useContext(IngredientsContext)

export default IngredientsProvider
