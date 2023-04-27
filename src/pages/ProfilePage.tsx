import React, { FC } from 'react'
import cn from 'classnames'
import { useDispatch } from '../services/store'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { logOut } from '../services/slices/userSlice'
import { ROUTES } from '../constants'

import styles from './ProfilePage.module.css'

const ProfilePage: FC = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const getFooterText = () => {
    switch (pathname) {
      case ROUTES.profile:
        return (
          <>
            В этом разделе вы можете
            <br /> изменить свои персональные данные
          </>
        )
      case ROUTES.orders:
        return (
          <>
            В этом разделе вы можете
            <br /> просмотреть свою историю заказов
          </>
        )
      default:
        return ''
    }
  }

  const onLogOut = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(logOut({ token: localStorage.getItem('refreshToken') }))
  }
  const linkClasses = (isActive: boolean) =>
    cn('text text_type_main-medium', styles.link, {
      [styles.active]: isActive,
      ['text_color_inactive']: !isActive,
    })

  return (
    <section className={styles.wrapper}>
      <section className={'pr-15'}>
        <nav className={styles.navigation}>
          <NavLink
            end
            to={ROUTES.profile}
            className={({ isActive }) => linkClasses(isActive)}>
            Профиль
          </NavLink>
          <NavLink
            end
            to={ROUTES.orders}
            className={({ isActive }) => linkClasses(isActive)}>
            История заказов
          </NavLink>
          <NavLink
            to={'/logout'}
            className={({ isActive }) => linkClasses(isActive)}
            onClick={onLogOut}>
            Выход
          </NavLink>
        </nav>
        <footer
          className={cn(
            styles.footer,
            'text text_type_main-small text_color_inactive pt-20'
          )}>
          {getFooterText()}
        </footer>
      </section>
      <Outlet />
    </section>
  )
}
export default ProfilePage
