import React, { FC } from 'react'
import Feed from '../components/Feed/Feed'
import { WS_URL } from '../constants'

import styles from './FeedPage.module.css'

const OrdersPage: FC = () => {
  return (
    <div className={styles.page}>
      <Feed
        wsUrl={WS_URL(localStorage.getItem('accessToken'))}
        extraClass={styles.feedWrapper}
        linkTo={'/profile/orders/'}
      />
    </div>
  )
}

export default OrdersPage
