import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import IngredientPreview from './IngredientPreview'
import {INGREDIENT_TYPES} from '../../constants'

import styles from './IngredientSection.module.css'

IngredientSection.propTypes = {
  type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  }))
}

export default function IngredientSection({type, ingredients}){
  return (
    <>
      <h2 className='text text_type_main-medium pb-6'>{INGREDIENT_TYPES[type]}</h2>
      <section className={classnames(styles.wrapper, 'pb-10 pl-1 pr-1')}>
        {ingredients.map((ingredient) => {
          return <IngredientPreview key={ingredient._id} {...ingredient} count={type === 'bun' ? 1: null} />
        })}
      </section>
    </>
  )
}
