import React, { useRef, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import Tabs from './Tabs'
import Modal from '../Modal/Modal'
import IngredientSection from './IngredientSection'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import { setIngredient, clearIngredient} from '../../services/currentIngredientSlice'

import { INGREDIENT_TYPES } from '../../constants'

import styles from './BurgerIngredients.module.css'

export default function BurgerIngredients(){
  const dispatch = useDispatch()
  
  const refs = {
    bun: useRef(),
    sauce: useRef(),
    main: useRef()
  }

  const ingredients = useSelector((state) => state.ingredients.items)
  const currentIngredient = useSelector((state) => state.currentIngredient.item)
  
  const handleIngredientClick = useCallback((id) => {
    const ingredient = ingredients?.find(el => el._id === id)
    dispatch(setIngredient(ingredient))
  }, [])

  function handleTabClick(refName) {
    refs[refName].current.scrollIntoView({ behavior: 'smooth' })
  } 

  return (
    <section className={classnames(styles.wrapper, 'pt-10 pl-5 pr-5 pb-5' )} >
      {currentIngredient && (
        <Modal title='Детали ингредиента' onClose={() => dispatch(clearIngredient())}>
          <IngredientDetails ingredient={currentIngredient}/>
        </Modal>
      )}
      
      <h1 className='text text_type_main-large mb-5 '>Соберите бургер</h1>
      <Tabs handleTabClick={handleTabClick} />
      <div className={styles.ingredients}>
          {Object.keys(INGREDIENT_TYPES).map(sectionType => {
            return (
              <IngredientSection 
                ref={refs[sectionType]}
                chooseIngredient={handleIngredientClick}
                key={sectionType} 
                type={sectionType}
                ingredients={ingredients?.filter(({type}) => type === sectionType)}
              />)
          })}
      </div>
    </section>
    )
}


