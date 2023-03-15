import React, { useRef, useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import Tabs from './Tabs'
import Modal from '../Modal/Modal'
import IngredientSection from './IngredientSection'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import {
  setIngredient,
  clearIngredient,
} from '../../services/currentIngredientSlice'
import {
  selectIngredients,
  selectCurrentIngredient,
} from '../../services/selectors'

import { INGREDIENT_TYPES } from '../../constants'

import styles from './BurgerIngredients.module.css'

export default function BurgerIngredients() {
  const dispatch = useDispatch()
  const [currentTab, setTab] = useState('')
  const viewport = useRef()
  const refs = {
    bun: useRef(),
    sauce: useRef(),
    main: useRef(),
  }
  const { items: ingredients } = useSelector(selectIngredients)
  const { item: currentIngredient } = useSelector(selectCurrentIngredient)

  useEffect(() => {
    let visibleHeaders = {}
    let observer
    if (refs.bun.current && refs.sauce.current && refs.main.current) {
      const options = {
        root: viewport.current,
      }

      observer = new IntersectionObserver((entries) => {
        entries.map((entry) => {
          visibleHeaders[entry.target.id] = entry.isIntersecting
        })
        for (const header in visibleHeaders) {
          if (visibleHeaders[header]) {
            setTab(header)
            break
          }
        }
      }, options)
      Object.keys(refs).map((key) => {
        observer.observe(refs[key].current)
      })
    }
    return () => observer?.disconnect()
  }, [...Object.values(refs)])

  const handleIngredientClick = useCallback(
    (id) => {
      const ingredient = ingredients?.find((el) => el._id === id)
      dispatch(setIngredient(ingredient))
    },
    [ingredients]
  )

  function handleTabClick(refName) {
    refs[refName].current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={classnames(styles.wrapper, 'pt-10 pl-5 pr-5 pb-5')}>
      {currentIngredient && (
        <Modal
          title="Детали ингредиента"
          onClose={() => dispatch(clearIngredient())}
        >
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}

      <h1 className="text text_type_main-large mb-5 ">Соберите бургер</h1>
      <Tabs handleTabClick={handleTabClick} currentTab={currentTab} />
      <div className={styles.ingredients} ref={viewport}>
        {Object.keys(INGREDIENT_TYPES).map((sectionType) => {
          return (
            <IngredientSection
              ref={refs[sectionType]}
              chooseIngredient={handleIngredientClick}
              key={sectionType}
              type={sectionType}
              ingredients={ingredients?.filter(
                ({ type }) => type === sectionType
              )}
            />
          )
        })}
      </div>
    </section>
  )
}
