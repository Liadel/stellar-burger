import React, { useEffect } from 'react'
import cn from 'classnames'
import styles from './Feed.module.css'
import FeedCard from './FeedCard'
import { selectFeed } from '../../services/selectors'
import { useDispatch, useSelector } from '../../services/store'
import { connect, disconnect } from '../../services/actions'

interface FeedProps {
  extraClass?: string
  linkTo: string
  wsUrl: string
}

const Feed: React.FC<FeedProps> = ({ wsUrl, linkTo, extraClass }) => {
  const dispatch = useDispatch()
  const { orders } = useSelector(selectFeed)
  const disconnectHandler = () => dispatch(disconnect())

  useEffect(() => {
    dispatch(connect(wsUrl))
    return () => {
      disconnectHandler()
    }
  }, [])

  return (
    <ul className={cn(styles.wrapper, extraClass, 'pr-2')}>
      {orders.map((order, i) => (
        <FeedCard key={i} order={order} linkTo={linkTo} />
      ))}
    </ul>
  )
}

export default Feed
