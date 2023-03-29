import React, {FC} from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderLink from './HeaderLink'

import styles from './AppHeader.module.css'
import { ROUTES } from '../../constants'

const AppHeader: FC = () => {
  return (
    <header className={classnames(styles.header, 'p-4')}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <HeaderLink
            to={ROUTES.home}
            icon={<BurgerIcon type="primary" />}
          >
            Конструктор
          </HeaderLink>
          <HeaderLink to={'/list'} icon={<ListIcon type="primary" />}>
            Лента заказов
          </HeaderLink>
        </nav>
        <div className={styles.logo}>
          <Link to={ROUTES.home}>
            <Logo />
          </Link>
        </div>
        <HeaderLink to={ROUTES.profile} icon={<ProfileIcon type="primary" />}>
          Профиль
        </HeaderLink>
      </div>
    </header>
  )
}

export default AppHeader
