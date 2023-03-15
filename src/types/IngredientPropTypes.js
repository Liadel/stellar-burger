import PropTypes from 'prop-types'

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

