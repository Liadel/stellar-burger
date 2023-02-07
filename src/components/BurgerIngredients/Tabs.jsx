import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import classnames from 'classnames'
import styles from './Tabs.module.css'

export default function Tabs(){
  
  return (
    <div className={classnames(styles.tabs, 'pb-10')}>
      <Tab value="bun" active>
        Булки
      </Tab>
      <Tab value="sause">
        Соусы
      </Tab>
      <Tab value="main">
        Начинки
      </Tab>
    </div>
  )
}