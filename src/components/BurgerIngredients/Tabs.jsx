import React from 'react'
import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import classnames from 'classnames'
import styles from './Tabs.module.css'

Tabs.propTypes = {
  currentTab: PropTypes.oneOf(['bun', 'sauce', 'main']),
  handleTabClick: PropTypes.func
}

export default function Tabs({currentTab = 'bun', handleTabClick}){
  const [current, setCurrent] = React.useState(currentTab)

  function handleClick(value){
    handleTabClick(value)
    setCurrent(value)
  }
  
  return (
    <div className={classnames(styles.tabs, 'pb-10')}>
      <Tab value="bun" active={current === 'bun'} onClick={handleClick}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={handleClick}>
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={handleClick}>
        Начинки
      </Tab>
    </div>
  )
}