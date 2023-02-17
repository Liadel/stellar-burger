import React, {useState, useCallback, useMemo} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import {useIngredients} from '../IngredientsProvider/IngredientsProvider'
import { useOrderData } from '../OrderDataProvider/OrderDataProvider'
import { IngredientPropTypes } from '../../types/IngredientPropTypes'
import {API_URL} from '../../constants'

import styles from './BurgerConstructor.module.css'
import { requestWrapper, getRandomInt } from '../../utils'
import ConstructorFooter from './ConstructorFooter/ConstructorFooter'
import ElementsContainer from './ElementsContainer/ElementsContainer'

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(IngredientPropTypes))
}

export default function BurgerConstructor(){
  const [modalIsOpen, setModalOpen] = useState(false)
  const [constructorItems, setConstructorItems] = useState({bun: null, ingredients: []})
  
  const {orderData, setOrderData} = useOrderData()
  const {ingredients} = useIngredients()
  
  const {main, sauce, bun} = useMemo(() => {
    return {
      main: ingredients.filter(el => el.type === "main"),
      sauce: ingredients.filter(el => el.type === "sauce"),
      bun: ingredients.filter(el => el.type === "bun")
    }
  },[ingredients])

  // a bit of random before implementing dnd

  const getRandomBurger = useCallback(() => {
    if (!main.length) return null
    const burger = RandomBurger({main, sauce, bun})
    setConstructorItems({
      bun: burger.bun,
      ingredients: [...burger.sauce, ...burger.main]
    })
  }, [main, sauce, bun])

  if (!constructorItems.ingredients.length) {
    getRandomBurger()
  }

  const sendOrder = async () => {
    const ingredientsToSend = [
      constructorItems.bun._id, 
      ...constructorItems.ingredients.map(({_id}) => _id), 
      constructorItems.bun._id
    ]
    try {
      setOrderData({...orderData, loading: true});
      const {name, order} = await requestWrapper({
        url: `${API_URL}/orders`,
        payload: {ingredients: ingredientsToSend}
      });
      
      setOrderData({ ...orderData, number: order.number, name, loading: false});
    } catch(e) {
      setOrderData({...orderData, error: e});
    }    
  }

  const handleOrderSend = () => {
    sendOrder()
    setModalOpen(true)
  }
  
  if (!constructorItems.ingredients.length) return null

  return (
    <section className={classnames(styles.wrapper, 'pt-25 pl-5 pr-5 pb-5')}>
      {modalIsOpen && !orderData.loading && <Modal onClose={() => setModalOpen(false)}><OrderDetails /></Modal>}
      <ElementsContainer {...{...constructorItems}} />
      
      <ConstructorFooter 
        price={getPrice(constructorItems)}
        disable={orderData.loading || !constructorItems.ingredients}
        handleClick={handleOrderSend}
      />
    </section>
  )
}

const RandomBurger = ({main, sauce, bun}) => {
  const ingredientsAmount = getRandomInt(main?.length)
  
  return {
    bun: bun[getRandomInt(bun?.length)],
    sauce: [sauce[getRandomInt(sauce?.length)]],
    main: [...Array(ingredientsAmount)].map(() => main[getRandomInt(main?.length)])
  }
}

function getPrice({bun, ingredients}) {
  return ingredients.reduce((acc, {price}) => acc + price, bun.price * 2)
}