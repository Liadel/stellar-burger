import React, { FC } from 'react'

import styles from './NotFound404.module.css'

const NotFound404: FC = () => {
  return (
    <section className={styles.wrapper}>
      <h1 className="text text_type_digits-large ">404</h1>
      <p className="text text_type_main-large pt-5">Страница не найдена</p>
    </section>
  )
}

export default NotFound404
