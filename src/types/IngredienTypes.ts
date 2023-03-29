import PropTypes from 'prop-types'
import { INGREDIENT_TYPES } from '../constants'

export const IngredientPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']),
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    
})

export type IngredientType = keyof typeof INGREDIENT_TYPES;

export type Ingredient = {
    _id: string,
    type: IngredientType,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    name: string,
    price: number,
    image: string,
    image_large: string,
}

