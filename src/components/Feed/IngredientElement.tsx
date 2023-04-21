import React from 'react'
import cn from 'classnames'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './IngredientElement.module.css'
import IngredientIcon from '../IngredientIcon/IngredientIcon'
import { Ingredient } from '../../types/IngredientTypes'

interface IngredientElementProps {
  ingredient: Ingredient
  count: number
}

const IngredientElement: React.FC<IngredientElementProps> = ({
  ingredient,
  count,
}) => {
  const { name, image, price } = ingredient

  return (
    <li className={cn(styles.element, 'pr-6 pb-4')}>
      <IngredientIcon name={name} image={image} overflow={null} />
      <div className={cn(styles.name, 'text text_type_main-medium pl-4 pr-4')}>
        {name}
      </div>
      <div className={cn(styles.price, 'text text_type_digits-default')}>
        {count}&nbsp;x&nbsp;{price}&nbsp;
        <CurrencyIcon type="primary" />
      </div>
    </li>
  )
}

export default IngredientElement
