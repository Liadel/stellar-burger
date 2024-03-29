import React from 'react'
import classnames from 'classnames'
import { useParams } from 'react-router-dom'
import { useSelector } from '../../services/store'

import styles from './IngredientDetails.module.css'
import { selectIngredients } from '../../services/selectors'

const IngredientDetails: React.FC = () => {
  const { ingredientId } = useParams()
  const { items } = useSelector(selectIngredients)
  if (!items.length) return null

  const ingredient = items.find(({ _id }) => _id === ingredientId)
  if (!ingredient) return null

  const { name, image_large, proteins, fat, carbohydrates, calories } =
    ingredient

  return (
    <div className={classnames(styles.wrapper, 'pb-5', 'pl-15', 'pr-15')}>
      <figure className="pb-8">
        <img src={image_large} alt={name} />
        <figcaption className="pt-4 text text_type_main-medium">
          {name}
        </figcaption>
      </figure>
      <section
        className={classnames(
          styles.details,
          'text_type_main-default text_color_inactive'
        )}>
        <div className={classnames(styles.prop, 'pr-5')}>
          <p className="text pb-2">Калории, ккал</p>
          <p className="text text_type_digits-default">{calories}</p>
        </div>
        <div className={classnames(styles.prop, 'pr-5')}>
          <p className="text pb-2">Белки, г</p>
          <p className="text text_type_digits-default">{proteins}</p>
        </div>
        <div className={classnames(styles.prop, 'pr-5')}>
          <p className="text pb-2">Жиры, г</p>
          <p className="text text_type_digits-default">{fat}</p>
        </div>
        <div className={classnames(styles.prop)}>
          <p className="text pb-2">Углеводы, г</p>
          <p className="text text_type_digits-default">{carbohydrates}</p>
        </div>
      </section>
    </div>
  )
}

export default IngredientDetails
