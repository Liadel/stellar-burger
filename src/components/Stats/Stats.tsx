import React from 'react'
import cn from 'classnames'
import styles from './Stats.module.css'

const Stats: React.FC = () => {
  const captionStyles = 'text text_type_main-medium'
  return (
    <section>
      <section className={cn(styles.dashboard, 'pb-15')}>
        <section>
          <h3 className={captionStyles}>Готовы:</h3>
          <ul className={cn(styles.list, styles.done, 'pt-6')}>
            <li className="text text_type_digits-default">034533</li>
          </ul>
        </section>
        <section>
          <h3 className={captionStyles}>В работе:</h3>
          <ul className={cn(styles.list, 'pt-6')}>
            <li className="text text_type_digits-default">034538</li>
          </ul>
        </section>
      </section>
      <section className="pb-15">
        <h3 className={captionStyles}>Выполнено за все время:</h3>
        <p className={cn(styles.numbers, 'text text_type_digits-large')}>
          28 752
        </p>
      </section>
      <section>
        <h3 className={captionStyles}>Выполнено за сегодня:</h3>
        <p className={cn(styles.numbers, 'text text_type_digits-large')}>752</p>
      </section>
    </section>
  )
}

export default Stats
