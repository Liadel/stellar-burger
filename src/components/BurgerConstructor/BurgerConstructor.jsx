import React, {useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import DraggableElement from './DraggableElement/DraggableElement'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import { IngredientPropTypes } from '../../types/IngredientPropTypes'

import styles from './BurgerConstructor.module.css'

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(IngredientPropTypes))
}

export default function BurgerConstructor({data}){
  const [modalIsOpen, setModalOpen] = useState(false)

  const {ingredients, bun} = useMemo(() => {
    return {
      ingredients: data.filter(el => el.type !== "bun"),
      bun: data.find(el => el.type === "bun")
    }
  },[data])
 
  return (
    <section className={classnames(styles.wrapper, 'pt-25 pl-5 pr-5 pb-5')}>
      {modalIsOpen && <Modal onClose={() => setModalOpen(false)}><OrderDetails /></Modal>}
      <DraggableElement draggable={false}>
        <ConstructorElement 
          type='top'
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          isLocked={true}
        />
      </DraggableElement>
      <ul className={styles.scroll}>
        {ingredients.map((element) => {
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
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
          isLocked={true}
        />
      </DraggableElement>
      
      <footer className={classnames(styles.footer, 'pt-6 pr-4')}>
        <p className={classnames(styles.price,'text text_type_digits-medium pr-10')}>
          <span className='p-2'>610</span> 
          <CurrencyIcon type='primary' />
        </p>
        <Button htmlType="button" type="primary" size="medium" onClick={() => setModalOpen(true)}>Оформить заказ</Button>
      </footer>
    </section>
  )
}

