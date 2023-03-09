import React from 'react';
import classnames from 'classnames'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderLink from './HeaderLink'

import styles from './AppHeader.module.css'

function AppHeader() {
  return (
    <header className={classnames(styles.header, 'p-4')}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <HeaderLink to={'/'} icon={<BurgerIcon type="primary" />} active>Конструктор</HeaderLink>
          <HeaderLink to={'/list'} icon={<ListIcon type="primary" />}>Лента заказов</HeaderLink>
        </nav>
        <div className={styles.logo} ><Logo /></div>
        <HeaderLink  to={'/profile'} icon={<ProfileIcon type="primary" />}>Профиль</HeaderLink>
      </div>
    </header>
  );
}

export default AppHeader;