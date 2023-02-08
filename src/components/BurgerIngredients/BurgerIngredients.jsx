import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Tabs from './Tabs'
import styles from './BurgerIngredients.module.css'
import IngredientSection from './IngredientSection'
import {INGREDIENT_TYPES} from '../../constants'

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']),
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  })).isRequired
}

export default function BurgerIngredients({data}){
  return (
    <section className={classnames(styles.wrapper, 'pt-10 pl-5 pr-5 pb-5' )} >
      <h1 className='text text_type_main-large mb-5 '>Соберите бургер</h1>
      <Tabs />
      <div className={styles.ingredients}>
          {Object.keys(INGREDIENT_TYPES).map(sectionType => {
            return (
              <IngredientSection 
                key={sectionType} 
                type={sectionType}
                ingredients={data.filter(({type}) => type === sectionType)}
              />)
          })}


          {/* {data.map((ingredient) => {
            return <IngredientPreview key={ingredient.id} {...ingredient} />
          })} */}
      </div>
    </section>
    )
}


