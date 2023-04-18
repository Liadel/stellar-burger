import React from 'react'
import cn from 'classnames'
import Feed from '../components/Feed/Feed'
import Stats from '../components/Stats/Stats'

import styles from './FeedPage.module.css'

const orders = [
  {
    _id: '6435869b0905fd001b629351',
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0941',
    ],
    status: 'done',
    name: 'Spicy флюоресцентный бургер',
    createdAt: '2023-04-11T16:11:07.091Z',
    updatedAt: '2023-04-11T16:11:07.567Z',
    number: 48526,
  },
  {
    _id: '6435869b0905fd001b629351',
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0941',
    ],
    status: 'done',
    name: 'Spicy флюоресцентный бургер',
    createdAt: '2023-04-11T16:11:07.091Z',
    updatedAt: '2023-04-11T16:11:07.567Z',
    number: 48526,
  },
  {
    _id: '6435869b0905fd001b629351',
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0941',
    ],
    status: 'done',
    name: 'Spicy флюоресцентный бургер',
    createdAt: '2023-04-11T16:11:07.091Z',
    updatedAt: '2023-04-11T16:11:07.567Z',
    number: 48526,
  },
  {
    _id: '6435869b0905fd001b629351',
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0941',
    ],
    status: 'done',
    name: 'Spicy флюоресцентный бургер',
    createdAt: '2023-04-11T16:11:07.091Z',
    updatedAt: '2023-04-11T16:11:07.567Z',
    number: 48526,
  },
  {
    _id: '6435869b0905fd001b629351',
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0941',
    ],
    status: 'done',
    name: 'Spicy флюоресцентный бургер',
    createdAt: '2023-04-11T16:11:07.091Z',
    updatedAt: '2023-04-11T16:11:07.567Z',
    number: 48526,
  },
  {
    _id: '6435869b0905fd001b629351',
    ingredients: [
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0941',
    ],
    status: 'done',
    name: 'Spicy флюоресцентный бургер',
    createdAt: '2023-04-11T16:11:07.091Z',
    updatedAt: '2023-04-11T16:11:07.567Z',
    number: 48526,
  },
]

const FeedPage: React.FC = () => {
  return (
    <div className={cn(styles.page, 'pl-5 pr-5 pt-10')}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <section className={styles.wrapper}>
        <Feed orders={orders} extraClass={styles.feedWrapper} />

        <Stats />
      </section>
    </div>
  )
}

export default FeedPage
