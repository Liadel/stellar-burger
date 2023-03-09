import React from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import {
  Input,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './Profile.module.css'

const linkClasses = (isActive) =>
  cn('text text_type_main-medium', styles.link, {
    [styles.active]: isActive,
    ['text_color_inactive']: !isActive,
  })

function Profile() {
  return (
    <section className={styles.wrapper}>
      <section className={'pr-15'}>
        <nav className={styles.navigation}>
          <NavLink
            to={'/profile'}
            className={({ isActive }) => linkClasses(isActive)}
          >
            Профиль
          </NavLink>
          <NavLink
            to={'/profile/orders'}
            className={({ isActive }) => linkClasses(isActive)}
          >
            История заказов
          </NavLink>
          <NavLink
            to={'/logout'}
            className={({ isActive }) => linkClasses(isActive)}
          >
            Выход
          </NavLink>
        </nav>
        <footer
          className={cn(
            styles.footer,
            'text text_type_main-small text_color_inactive pt-20'
          )}
        >
          В этом разделе вы можете изменить свои персональные данные
        </footer>
      </section>
      <section>
        <Input placeholder="Имя" />
        <EmailInput
          extraClass={'mt-6'}
          placeholder="Логин"
          value={'some@valie.re'}
        />
        <PasswordInput extraClass={'mt-6'} placeholder="Пароль" />
      </section>
    </section>
  )
}

export default Profile
