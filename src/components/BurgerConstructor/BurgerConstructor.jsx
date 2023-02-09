import React, {useState} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import DraggableElement from './DraggableElement/DraggableElement'
import OrderDetails from '../OrderDetails/OrderDetails'
import { IngredientPropTypes } from '../../types/IngredientPropTypes'

import styles from './BurgerConstructor.module.css'

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(IngredientPropTypes)).isRequired
}

export default function BurgerConstructor({data}){
  const [modalIsOpen, setModalOpen] = useState(false)
  
  const firstElement = data[0]
  const lastElement = data[data.length -1]
  const elements = data.slice(1, -1)
 
  return (
    <section className={classnames(styles.wrapper, 'pt-25 pl-5 pr-5 pb-5')}>
      {modalIsOpen && <OrderDetails onClose={() => setModalOpen(false)}/>}
      <DraggableElement draggable={false}>
        <ConstructorElement 
          type='top'
          text={firstElement.name}
          price={firstElement.price}
          thumbnail={firstElement.image}
          isLocked={true}
        />
      </DraggableElement>
      <ul className={styles.scroll}>
        {elements.map((element) => {
          const {_id, name, price, image} = element
          return (
          <DraggableElement key={_id}> 
            <ConstructorElement 
              text={name}
              price={price}
              thumbnail={image}
            />
          </DraggableElement>)
        }
        )}
      </ul>
      <DraggableElement draggable={false} extraClass={'pt-4'}>
        <ConstructorElement 
          type='bottom'
          text={lastElement.name}
          price={lastElement.price}
          thumbnail={lastElement.image}
          isLocked={true}
        />
      </DraggableElement>
      
      <footer className={classnames(styles.footer, 'pt-6 pr-4')}>
        <p className={classnames(styles.price,'text text_type_digits-medium pr-10')}>
          <span className='p-2'>610</span> 
          <CurrencyIcon type='primary' />
        </p>
        <Button onClick={() => setModalOpen(true)}>Оформить заказ</Button>
      </footer>
    </section>
  )
}

