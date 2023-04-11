import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import Tabs from './Tabs'
import IngredientSection from './IngredientSection'
import {
  selectIngredients,
} from '../../services/selectors'

import { INGREDIENT_TYPES } from '../../constants'
import { IngredientType } from '../../types/IngredientTypes'

import styles from './BurgerIngredients.module.css'

const BurgerIngredients: React.FC = () => {
  const dispatch: any = useDispatch()
  const [currentTab, setTab] = useState('')
  const viewport = useRef<HTMLDivElement>(null)
  const refs: Record<IngredientType, React.MutableRefObject<HTMLElement | null>> = {
    bun: useRef<HTMLElement>(null),
    sauce: useRef<HTMLElement>(null),
    main: useRef<HTMLElement>(null),
  }
  const { items: ingredients }  = useSelector(selectIngredients)
  

  useEffect(() => {
    const visibleHeaders: Record<string, boolean> = {}
    let observer: IntersectionObserver
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
      }, options);
      (Object.keys(refs) as IngredientType[]).map((key) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        observer.observe(refs[key].current!)
      })
    }
    return () => observer?.disconnect()
  }, [...Object.values(refs)])

  function handleTabClick(refName: IngredientType) {
    refs[refName].current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={classnames(styles.wrapper, 'pt-10 pl-5 pr-5 pb-5')}>
      <h1 className="text text_type_main-large mb-5 ">Соберите бургер</h1>
      <Tabs handleTabClick={handleTabClick} currentTab={currentTab} />
      <div className={styles.ingredients} ref={viewport}>
      {Object.keys(INGREDIENT_TYPES).map((sectionType) => {
        const type = sectionType as IngredientType;
        return (
          <IngredientSection
            ref={refs[type]}
            key={type}
            type={type}
            ingredients={ingredients?.filter(({ type }) => type === sectionType)}
          />
        );
      })}
      </div>
    </section>
  )
}

export default BurgerIngredients