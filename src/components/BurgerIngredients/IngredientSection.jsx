import React, {forwardRef, memo} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import IngredientPreview from './IngredientPreview'
import {INGREDIENT_TYPES} from '../../constants'

import styles from './IngredientSection.module.css'


// eslint-disable-next-line react/display-name
const IngredientSection = forwardRef(({type, ingredients, chooseIngredient}, ref) => {
  
  return (
    <>
      <h2 ref={ref} className='text text_type_main-medium pb-6'>{INGREDIENT_TYPES[type]}</h2>
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
    </>
  )
})

IngredientSection.propTypes = {
  type: PropTypes.oneOf(['bun', 'sauce', 'main']),
  chooseIngredient: PropTypes.func,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string
  }))
}

export default memo(IngredientSection)
