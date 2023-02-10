import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import IngredientPreview from './IngredientPreview'
import {INGREDIENT_TYPES} from '../../constants'

import styles from './IngredientSection.module.css'

IngredientSection.propTypes = {
  type: PropTypes.oneOf(['bun', 'sauce', 'main']),
  chooseIngredient: PropTypes.func,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string
  }))
}

export default function IngredientSection({type, ingredients, chooseIngredient}){
  return (
    <>
      <h2 className='text text_type_main-medium pb-6'>{INGREDIENT_TYPES[type]}</h2>
      <ul className={classnames(styles.wrapper, 'pb-10 pl-1 pr-1')}>
        {ingredients.map((ingredient) => {
          return (
            <IngredientPreview 
              chooseIngredient={chooseIngredient}
              key={ingredient._id} 
              {...ingredient} 
              count={type === 'bun' ? 1: null} 
            />
          )
        })}
      </ul>
    </>
  )
}
