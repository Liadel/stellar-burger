import React from 'react'
import cn from 'classnames'
import { useSelector } from '../../services/store'
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Order } from '../../types/Order'

import styles from './FeedCard.module.css'
import { selectAllIngredients } from '../../services/selectors'
import IngredientIcon from '../IngredientIcon/IngredientIcon'
import { Ingredient } from '../../types/IngredientTypes'
import { Link, useLocation } from 'react-router-dom'

interface FeedCardProps {
  order: Order
  linkTo: string
}

const FeedCard: React.FC<FeedCardProps> = ({ order, linkTo }) => {
  const location = useLocation()
  const { ingredients: ingredientIds, name, number, createdAt, _id } = order
  const allIngredients = useSelector(selectAllIngredients)
  const ingredients = ingredientIds
    .map((id) => {
      return allIngredients.find(
        (ingredient) => ingredient._id === id
      ) as Ingredient
    })
    .filter((ingredient) => {
      return ingredient !== undefined && ingredient !== null
    })

  const overflow = ingredientIds.length > 6 ? ingredientIds.length - 6 : null

  const icons = (ingredients ?? [])?.slice(0, 6)?.map((ingredient, index) => {
    const { name, image } = ingredient
    return (
      <IngredientIcon
        extraClass={styles.overflow}
        key={index}
        name={name}
        image={image}
        overflow={index === 0 && overflow ? overflow : null}
      />
    )
  })
  const price = ingredients.reduce((acc: number, { price }) => acc + price, 0)
  return (
    <li className={cn(styles.card, 'p-6 mb-4')}>
      <Link
        to={{
          pathname: `${linkTo}${_id}`,
        }}
        state={{ background: location }}>
        <div className={cn(styles.lineWrapper, 'pb-6')}>
          <h2 className="text text_type_digits-default">#{number}</h2>
          <span className="text text_type_main-small text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </span>
        </div>
        <p className="text text_type_main-medium pb-6">{name}</p>
        <div className={styles.lineWrapper}>
          <div className={styles.icons}>{icons}</div>
          <div className={cn(styles.price, 'text text_type_digits-default')}>
            {price}&nbsp;
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </li>
  )
}

export default FeedCard
