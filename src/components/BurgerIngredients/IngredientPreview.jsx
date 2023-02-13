import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientPropTypes } from '../../types/IngredientPropTypes'
import styles from './IngredientPreview.module.css'


IngredientPreview.propTypes = {
  ...IngredientPropTypes,
  count: PropTypes.number
}

export default function IngredientPreview({_id, name, price, image, count, chooseIngredient}){
  return (
    <li className={classnames(styles.wrapper, 'pt-4 pb-4 pl-3 pr-3')} onClick={() => chooseIngredient(_id)}>
      <figure className={styles.card} >
        {count && <Counter count={count} />}
        <img src={image} alt={name} />
        <p className={classnames(styles.price,'text text_type_digits-default p-1')}>
          <span className='pr-2'>{price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <figcaption className={classnames(styles.name, 'text text_type_main-default')}>{name}</figcaption>
      </figure>
    </li>
  )
} 

