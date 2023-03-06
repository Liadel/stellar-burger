import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {useSelector, useDispatch} from 'react-redux'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import DraggableElement from '../DraggableElement/DraggableElement'

import { IngredientPropTypes } from '../../../types/IngredientPropTypes'
import styles from './ElementsContainer.module.css'
import { removeIngredient, updateIngredients } from '../../../services/constructorItemsSlice'

const ElementsContainer = () => {
  const dispatch = useDispatch()
  const {bun, ingredients} = useSelector((state) => state.constructorItems)
  
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = ingredients[dragIndex]
    const newCards = [...ingredients]

    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)

    dispatch(updateIngredients(newCards))
  }, [ingredients, dispatch])

  return (
    <>        
      {bun && <DraggableElement draggable={false}>
        <ConstructorElement 
          type='top'
          text={`${bun?.name} (верх)`}
          price={bun?.price}
          thumbnail={bun?.image}
          isLocked={true}
        />
      </DraggableElement>}
      <ul className={styles.scroll}>
        {ingredients.map((ingredient, i) => { 
          const {_id, name, price, image, dragId} = ingredient
          return (
          <DraggableElement key={dragId} moveCard={moveCard} index={i} ingredient={ingredient} > 
            <ConstructorElement 
              text={name}
              price={price}
              thumbnail={image}
              handleClose={() => dispatch(removeIngredient(_id))}
            />
          </DraggableElement>)
        }
        )}
      </ul>
      {bun && <DraggableElement draggable={false} extraClass={'pt-4'}>
        <ConstructorElement 
          type='bottom'
          text={`${bun?.name} (низ)`}
          price={bun?.price}
          thumbnail={bun?.image}
          isLocked={true}
        />
      </DraggableElement>}
    </>
  )
}

ElementsContainer.propTypes = {
  bun: IngredientPropTypes,
  ingredients: PropTypes.arrayOf(IngredientPropTypes)
}

export default ElementsContainer