import React, {useState, useRef, useCallback} from 'react'
import classnames from 'classnames'
import Tabs from './Tabs'
import Modal from '../Modal/Modal'
import IngredientSection from './IngredientSection'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import {useIngredients} from '../../context/IngredientsProvider'

import {INGREDIENT_TYPES} from '../../constants'

import styles from './BurgerIngredients.module.css'

export default function BurgerIngredients(){
  const [modalIsOpen, setModalOpen] = useState(false)
  const [currentIngredient, setCurrentIngredient] = useState(null)
  const refs = {
    bun: useRef(),
    sauce: useRef(),
    main: useRef()
  }
  const {ingredients = []} = useIngredients()
  
  const handleIngredientClick = useCallback((id) => {
    const ingredient = ingredients?.find(el => el._id === id)
    setCurrentIngredient(ingredient)
    setModalOpen(true)
  }, [])

  function handleTabClick(refName) {
    refs[refName].current.scrollIntoView({ behavior: 'smooth' })
  } 

  return (
    <section className={classnames(styles.wrapper, 'pt-10 pl-5 pr-5 pb-5' )} >
      {modalIsOpen && currentIngredient && (
        <Modal title='Детали ингредиента' onClose={() => setModalOpen(false)}>
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


