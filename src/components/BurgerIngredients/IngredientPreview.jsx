import React, {memo} from 'react'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientPropTypes } from '../../types/IngredientPropTypes'
import styles from './IngredientPreview.module.css'


IngredientPreview.propTypes = {
  ingredient: IngredientPropTypes,
  chooseIngredient: PropTypes.func,
}

function IngredientPreview({ingredient, chooseIngredient}){
  const {_id, name, price, image} = ingredient
  const {bun, ingredients} = useSelector((state) => state.constructorItems)

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: {...ingredient},
    collect: monitor => ({
      opacity: monitor.isDragging() ? .5 : 1
    })
  }) 

  const count = [bun, ...ingredients].filter((el) => el?._id === _id).length

  return (
    <li 
      className={classnames(styles.wrapper, 'pt-4 pb-4 pl-3 pr-3')} 
      onClick={() => chooseIngredient(_id)}
      ref={dragRef}
      style={{ opacity }}
    >
      <figure className={styles.card} >
        {!!count && <Counter count={count} />}
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

export default memo(IngredientPreview)

