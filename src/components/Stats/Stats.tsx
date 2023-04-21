import React from 'react'
import cn from 'classnames'
import { useSelector } from '../../services/store'
import { selectFeed } from '../../services/selectors'
import styles from './Stats.module.css'

const Stats: React.FC = () => {
  const { orders, total, totalToday } = useSelector(selectFeed)
  const doneOrders = orders.filter(({ status }) => {
    return status === 'done'
  })
  const inProgressOrders = orders.filter(({ status }) => {
    return status !== 'done'
  })
  const captionStyles = 'text text_type_main-medium'
  return (
    <section>
      <section className={cn(styles.dashboard, 'pb-15')}>
        <section>
          <h3 className={captionStyles}>Готовы:</h3>
          <ul className={cn(styles.list, styles.done, 'pt-6')}>
            {doneOrders.map(
              ({ number }, i) =>
                i < 5 && (
                  <li key={i} className="text text_type_digits-default">
                    {number}
                  </li>
                )
            )}
          </ul>
        </section>
        <section>
          <h3 className={captionStyles}>В работе:</h3>
          <ul className={cn(styles.list, 'pt-6')}>
            {inProgressOrders.map(
              ({ number }, i) =>
                i < 5 && (
                  <li key={i} className="text text_type_digits-default">
                    {number}
                  </li>
                )
            )}
          </ul>
        </section>
      </section>
      <section className="pb-15">
        <h3 className={captionStyles}>Выполнено за все время:</h3>
        <p className={cn(styles.numbers, 'text text_type_digits-large')}>
          {total}
        </p>
      </section>
      <section>
        <h3 className={captionStyles}>Выполнено за сегодня:</h3>
        <p className={cn(styles.numbers, 'text text_type_digits-large')}>
          {totalToday}
        </p>
      </section>
    </section>
  )
}

export default Stats
