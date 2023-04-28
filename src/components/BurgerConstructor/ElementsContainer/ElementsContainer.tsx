import React, { useCallback } from 'react'
import { useSelector, useDispatch } from '../../../services/store'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import DraggableElement from '../DraggableElement/DraggableElement'

import styles from './ElementsContainer.module.css'
import {
  removeIngredient,
  updateIngredients,
} from '../../../services/slices/constructorItemsSlice'
import { selectConstructorItems } from '../../../services/selectors'
import { RootState } from '../../../services/store'

const ElementsContainer: React.FC = () => {
  const dispatch = useDispatch()
  const { bun, ingredients } = useSelector((state: RootState) =>
    selectConstructorItems(state)
  )

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = ingredients[dragIndex]
      const newCards = [...ingredients]

      newCards.splice(dragIndex, 1)
      newCards.splice(hoverIndex, 0, dragCard)

      dispatch(updateIngredients(newCards))
    },
    [ingredients, dispatch]
  )

  return (
    <>
      {bun && (
        <DraggableElement draggable={false}>
          <ConstructorElement
            type="top"
            text={`${bun?.name} (верх)`}
            price={bun?.price}
            thumbnail={bun?.image}
            isLocked={true}
          />
        </DraggableElement>
      )}
      <ul className={styles.scroll}>
        {ingredients.map((ingredient, i) => {
          const { name, price, image, dragId } = ingredient
          return (
            <DraggableElement
              key={dragId}
              moveCard={moveCard}
              index={i}
              ingredient={ingredient}>
              <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                handleClose={() => dispatch(removeIngredient(i))}
              />
            </DraggableElement>
          )
        })}
      </ul>
      {bun && (
        <DraggableElement draggable={false} extraClass={'pt-4'}>
          <ConstructorElement
            type="bottom"
            text={`${bun?.name} (низ)`}
            price={bun?.price}
            thumbnail={bun?.image}
            isLocked={true}
          />
        </DraggableElement>
      )}
    </>
  )
}

export default ElementsContainer
