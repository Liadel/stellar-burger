import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import classnames from 'classnames'
import styles from './Tabs.module.css'

Tabs.propTypes = {
  currentTab: PropTypes.oneOf(['bun', 'sauce', 'main'])
}

export default function Tabs({currentTab = 'bun'}){
  const [current, setCurrent] = React.useState(currentTab)
  
  return (
    <div className={classnames(styles.tabs, 'pb-10')}>
      <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}