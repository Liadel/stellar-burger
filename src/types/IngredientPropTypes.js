import PropTypes from 'prop-types'

export const IngredientPropTypes = PropTypes.shape({
    _id: PropTypes.string,
    type: PropTypes.oneOf(['bun', 'sauce', 'main']),
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
})

