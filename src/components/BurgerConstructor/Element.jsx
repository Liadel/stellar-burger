import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Element.module.css'

Element.propTypes = {
  draggable: PropTypes.bool,
  type: PropTypes.oneOf(['top', 'bottom']),
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })
} 

export default function Element({draggable, type, ingredient }) {
  const {name, price, image} = ingredient
  return (
    <li className={classnames(styles.element, 'pl-8 pr-2 pb-4', {
      'pt-4': type === 'bottom',
    })}>
      {draggable && <span className={styles.icon}><DragIcon type="primary" /></span>}
      <ConstructorElement  
        type={type}
        text={name}
        price={price}
        thumbnail={image}
        isLocked={!!type}
      />
    </li>
  )
}