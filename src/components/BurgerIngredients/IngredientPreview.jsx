import React from 'react'
import PropTypes from 'prop-types'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientPreview.module.css'
import classnames from 'classnames'

IngredientPreview.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  count: PropTypes.number
}

export default function IngredientPreview({_id, name, price, image, count}){
  return (
    <section className={classnames(styles.wrapper, 'pt-4 pb-4 pl-3 pr-3')} key={_id}>
      <div className={styles.card} >
        {count && <Counter count={count} />}
        <img src={image} />
        <p className={classnames(styles.price,'text text_type_digits-default p-1')}>
          <span className='pr-2'>{price}</span>
          <CurrencyIcon primary />
        </p>
        <p className={classnames(styles.name, 'text text_type_main-default')}>{name}</p>
      </div>
    </section>
  )
} 

