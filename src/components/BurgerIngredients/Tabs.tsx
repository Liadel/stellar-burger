import React, { useEffect } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import classnames from 'classnames'
import styles from './Tabs.module.css'

type TabsProps = {
  currentTab: string,
  handleTabClick(value: string): void
}

const Tabs: React.FC<TabsProps> = ({ currentTab = 'bun', handleTabClick }) => {
  const [current, setCurrent] = React.useState(currentTab)

  useEffect(() => {
    setCurrent(currentTab)
  }, [currentTab])

  function handleClick(value:string) {
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

export default Tabs