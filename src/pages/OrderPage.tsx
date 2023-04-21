import React, { FC, useEffect } from 'react'
import cn from 'classnames'
import { useParams, useMatch } from 'react-router-dom'
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from '../services/store'
import { selectFeed, selectAllIngredients } from '../services/selectors'
import { Ingredient } from '../types/IngredientTypes'
import IngredientElement from '../components/Feed/IngredientElement'

import styles from './OrderPage.module.css'
import { connect, disconnect } from '../services/actions'
import { useDispatch } from 'react-redux'
import { WebsocketStatus } from '../types'
import { ROUTES, WS_URL, ORDER_STATUSES } from '../constants'

const OrderPage: FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const match = useMatch(ROUTES.profileOrder)
  const { orders, status: wsStatus } = useSelector(selectFeed)
  const allIngredients = useSelector(selectAllIngredients)

  const wsUrl =
    match && match.params.id
      ? WS_URL(localStorage.getItem('accessToken'))
      : WS_URL(null)

  const disconnectHandler = () => dispatch(disconnect())

  useEffect(() => {
    if (wsStatus !== WebsocketStatus.ONLINE) {
      dispatch(connect(wsUrl))
    }
    return () => {
      disconnectHandler()
    }
  }, [])

  const order = orders.find(({ _id }) => id === _id)

  if (!order)
    return <p className="text text_type_main-medium">Заказ не найден</p>

  const { status, number, name, ingredients: ingredientIds, updatedAt } = order

  const counts: Record<string, number> = {}

  ingredientIds.map((id) => {
    if (counts[id]) {
      counts[id] += 1
    } else {
      counts[id] = 1
    }
  })
  const ingredients = ingredientIds
    .map((id) => {
      return allIngredients.find(
        (ingredient) => ingredient._id === id
      ) as Ingredient
    })
    .filter((ingredient) => {
      return ingredient !== undefined && ingredient !== null
    })

  const price = ingredients.reduce((acc: number, { price }) => acc + price, 0)

  const unicIngredients: Array<React.ReactNode> = []
  new Set(ingredients).forEach((el) => {
    unicIngredients.push(
      <IngredientElement key={el._id} ingredient={el} count={counts[el._id]} />
    )
  })

  return (
    <div className={styles.page}>
      <h1 className={cn(styles.number, 'text text_type_digits-default pb-10')}>
        #{number}
      </h1>
      <h2 className="text text_type_main-medium pb-3">{name}</h2>
      <h2 className={cn(styles[status], 'text text_type_main-small pb-15')}>
        {ORDER_STATUSES[status]}
      </h2>
      <section className="pb-10">
        <h3 className="text text_type_main-medium pb-6">Состав:</h3>
        <ul className={styles.list}>{unicIngredients}</ul>
      </section>
      <section className={cn(styles.footer)}>
        <span className="text text_type_main-small  text_color_inactive">
          <FormattedDate date={new Date(updatedAt)} />
        </span>

        <span className={cn(styles.price, 'text text_type_digits-default')}>
          {price}&nbsp;
          <CurrencyIcon type="primary" />
        </span>
      </section>
    </div>
  )
}

export default OrderPage
