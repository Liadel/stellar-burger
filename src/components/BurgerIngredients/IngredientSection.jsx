import React, { forwardRef, memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import IngredientPreview from './IngredientPreview'
import {INGREDIENT_TYPES} from '../../constants'

import styles from './IngredientSection.module.css'

const IngredientSection = forwardRef(({ type, ingredients, chooseIngredient}, ref) => {
  return (
    <section  ref={ref} id={type}>
      <h2  className='text text_type_main-medium pb-6'>{INGREDIENT_TYPES[type]}</h2>
      <ul className={classnames(styles.wrapper, 'pb-10 pl-1 pr-1')}>
        {ingredients.map((ingredient) => {
          return (
            <IngredientPreview 
              chooseIngredient={chooseIngredient}
              key={ingredient._id} 
              ingredient={ingredient} 
            />
          )
        })}
      </ul>
    </section>
  )
})

IngredientSection.displayName = 'IngredientSection'

IngredientSection.propTypes = {
  type: PropTypes.oneOf(['bun', 'sauce', 'main']),
  chooseIngredient: PropTypes.func,
  setTab: PropTypes.func,
  activeTab: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string
  }))
}

export default memo(IngredientSection)
