import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from '../../services/store'
import { useDrop } from 'react-dnd'
import { nanoid } from '@reduxjs/toolkit'

import classnames from 'classnames'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import { Ingredient } from '../../types/IngredientTypes'

import styles from './BurgerConstructor.module.css'
import ConstructorFooter from './ConstructorFooter/ConstructorFooter'
import ElementsContainer from './ElementsContainer/ElementsContainer'

import { sendOrder, clearOrder } from '../../services/slices/orderSlice'
import {
  addIngredient,
  clearConstructor,
} from '../../services/slices/constructorItemsSlice'

import {
  selectOrder,
  selectConstructorItems,
  selectUser,
} from '../../services/selectors'
import { ROUTES } from '../../constants'

const BurgerConstructor: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { ingredients, bun } = useSelector(selectConstructorItems)
  const { number, loading } = useSelector(selectOrder)
  const { isLoggedIn } = useSelector(selectUser)

  const [{ isHover }, dropTargetRef] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop: (item: Ingredient) => {
      dispatch(
        addIngredient({
          ...item,
          dragId: nanoid(),
        })
      )
    },
  })

  const handleOrderSend = async () => {
    if (!isLoggedIn) {
      navigate(ROUTES.logIn)
    }
    const ingredientsToSend = bun && [
      bun._id,
      ...ingredients.map(({ _id }) => _id),
      bun._id,
    ]
    try {
      const data = await dispatch(sendOrder({ ingredients: ingredientsToSend }))
      if (data.payload.success) {
        dispatch(clearConstructor())
      }
    } catch (e) {
      console.log(e)
    }
  }

  const totalPrice = useMemo(() => {
    const accumulator = bun ? bun.price * 2 : 0
    return ingredients.reduce((acc, { price }) => acc + price, accumulator)
  }, [ingredients, bun])

  return (
    <section className={classnames(styles.wrapper, 'pt-25 pl-5 pr-5 pb-5')}>
      {(number || loading) && (
        <Modal onClose={() => dispatch(clearOrder())}>
          {loading && 'Loading...'}
          {number && <OrderDetails />}
        </Modal>
      )}
      <section
        ref={dropTargetRef}
        className={classnames(styles.section, {
          isHover: isHover ? styles.onHover : '',
        })}>
        <ElementsContainer />
      </section>
      <ConstructorFooter
        price={totalPrice}
        disable={loading || !bun}
        handleClick={handleOrderSend}
      />
    </section>
  )
}

export default BurgerConstructor
