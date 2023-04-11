import React, { memo } from 'react'

import { Link, useLocation } from 'react-router-dom'
import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { selectConstructorItems } from '../../services/selectors'

import { Ingredient } from '../../types/IngredientTypes'
import styles from './IngredientPreview.module.css'

type IngredientPreviewProps = {
  ingredient: Ingredient
}

const IngredientPreview: React.FC<IngredientPreviewProps> = ({ ingredient }) => {
  const { _id, name, price, image } = ingredient
  const { bun, ingredients } = useSelector(selectConstructorItems)

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })
  const location = useLocation()
  const count = [bun, ...ingredients].filter((el) => el?._id === _id).length

  return (
    <li
      className={classnames(styles.wrapper, 'pt-4 pb-4 pl-3 pr-3')}
      ref={dragRef}
      style={{ opacity }}
    >
      <Link
        className={styles.link}
        to={{
          pathname: `/ingredients/${_id}`,
        }}
        state={{ background: location }}
      >
        <figure className={styles.card}>
          {!!count && <Counter count={count} />}
          <img src={image} alt={name} />
          <p
            className={classnames(
              styles.price,
              'text text_type_digits-default p-1'
            )}
          >
            <span className="pr-2">{price}</span>
            <CurrencyIcon type="primary" />
          </p>
          <figcaption
            className={classnames(styles.name, 'text text_type_main-default')}
          >
            {name}
          </figcaption>
        </figure>
      </Link>
    </li>
  )
}

export default memo(IngredientPreview)
