/* eslint-disable react/prop-types */
import React, { forwardRef, memo, RefObject } from 'react'

import classnames from 'classnames'
import IngredientPreview from './IngredientPreview'
import { INGREDIENT_TYPES } from '../../constants'

import styles from './IngredientSection.module.css'

import { Ingredient, IngredientType } from '../../types/IngredienTypes'

type IngredientSectionProps = {
  type: IngredientType,
  ingredients: Ingredient[]
  ref: RefObject<HTMLElement>
}

const IngredientSection = forwardRef<HTMLElement, IngredientSectionProps>(({ type, ingredients }, ref) => {
  return (
    <section ref={ref} id={type}>
      <h2 className="text text_type_main-medium pb-6">
        {INGREDIENT_TYPES[type]}
      </h2>
      <ul className={classnames(styles.wrapper, 'pb-10 pl-1 pr-1')}>
        {ingredients.map((ingredient) => {
          return (
            <IngredientPreview key={ingredient._id} ingredient={ingredient} />
          )
        })}
      </ul>
    </section>
  )
})

IngredientSection.displayName = 'IngredientSection'

export default memo(IngredientSection)
