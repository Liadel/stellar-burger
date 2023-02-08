import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Element from './Element'
import styles from './BurgerConstructor.module.css'

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
}

export default function BurgerConstructor({data}){
  console.log(data)
  const firstElement = data[0]
  const lastElement = data[data.length -1]
  const elements = data.slice(1, -1)
  console.log(elements)
  return (
    <section className={classnames(styles.wrapper, 'pt-25 pl-5 pr-5 pb-5')}>
      <Element type='top' ingredient={firstElement} />
      <ul className={styles.scroll}>
        {elements.map((element) => 
          <Element key={element._id} draggable ingredient={element} />
        )}
      </ul>
      <Element type='bottom' ingredient={lastElement} />
      
      <footer className={classnames(styles.footer, 'pt-6 pr-4')}>
      
        <p className={classnames(styles.price,'text text_type_digits-medium pr-10')}>
          <span className='p-2'>610</span> 
          <CurrencyIcon type='primary' />
        </p>
        <Button>Оформить заказ</Button>
      </footer>
    </section>
  )
}

