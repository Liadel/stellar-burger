import React from 'react'
import cn from 'classnames'
import styles from './IngredientIcon.module.css'

interface IngredientIconProps {
  image: string
  name?: string
  extraClass?: string
  overflow: number | null
}

const IngredientIcon: React.FC<IngredientIconProps> = ({
  image = 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  name,
  extraClass,
  overflow,
}) => {
  return (
    <figure
      className={cn(styles.figure, extraClass, {
        [styles.overflow]: !!overflow,
      })}>
      <img className={cn(styles.icon)} src={image} alt={name} />
      {!!overflow && (
        <figcaption className="text text_type_digits-default">
          +{overflow}
        </figcaption>
      )}
    </figure>
  )
}

export default IngredientIcon
