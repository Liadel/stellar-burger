import React from 'react'
import cn from 'classnames'
import { Order } from '../../types/Order'
import styles from './Feed.module.css'
import FeedCard from './FeedCard'

interface FeedProps {
  orders: Order[]
  extraClass?: string
}

const Feed: React.FC<FeedProps> = ({ orders, extraClass }) => {
  return (
    <ul className={cn(styles.wrapper, extraClass, 'pr-2')}>
      {orders.map((order, i) => (
        <FeedCard key={i} order={order} />
      ))}
    </ul>
  )
}

export default Feed
