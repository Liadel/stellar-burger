import React from 'react'
import cn from 'classnames'
import Feed from '../components/Feed/Feed'
import Stats from '../components/Stats/Stats'

import styles from './FeedPage.module.css'

import { WS_URL } from '../constants'

const FeedPage: React.FC = () => {
  return (
    <div className={cn(styles.page, 'pl-5 pr-5 pt-10')}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <section className={styles.wrapper}>
        <Feed
          wsUrl={WS_URL(null)}
          extraClass={styles.feedWrapper}
          linkTo={'/feed/'}
        />
        <Stats />
      </section>
    </div>
  )
}

export default FeedPage
