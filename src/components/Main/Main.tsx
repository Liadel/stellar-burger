import React from 'react'
import { useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'

import { selectIngredients } from '../../services/selectors'

import styles from './Main.module.css'

const Main: React.FC = () => {
  const { loading, error } = useSelector(selectIngredients)

  return (
    <>
      {!loading && !error && (
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      )}
      {error && (
        <div className={styles.error}>
          <p className="text text_type_main-large pb-4">
            Что-то пошло не так, повторите попытку позже
          </p>
          <p className="text text_type_main-medium">{error.message}</p>
        </div>
      )}
    </>
  )
}

export default Main
