import React from 'react'
import PropTypes from 'prop-types'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import DraggableElement from '../DraggableElement/DraggableElement'

import { IngredientPropTypes } from '../../../types/IngredientPropTypes'
import styles from './ElementsContainer.module.css'

const ElementsContainer = ({bun, ingredients}) => {
  if (!bun) return null
  if (!ingredients.length) return null
  //TODO: change keys to uniq ids
  return (
    <>        
      <DraggableElement draggable={false}>
        <ConstructorElement 
          type='top'
          text={`${bun?.name} (верх)`}
          price={bun?.price}
          thumbnail={bun?.image}
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
          text={`${bun?.name} (низ)`}
          price={bun?.price}
          thumbnail={bun?.image}
          isLocked={true}
        />
      </DraggableElement>
    </>
  )
}

ElementsContainer.propTypes = {
  bun: IngredientPropTypes.isRequired,
  ingredients: PropTypes.arrayOf(IngredientPropTypes)
}

export default ElementsContainer