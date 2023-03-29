import React, {FC} from 'react'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'

import styles from './HeaderLink.module.css'


type HeaderLinkProps = {
  icon: React.ReactNode
  to: string;
  children: React.ReactNode
}

const HeaderLink: FC<HeaderLinkProps> = ({ icon, children, to }) =>{
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classnames(
          styles.link,
          'pl-5 pr-5 pt-4 pb-4 text text_type_main-default',
          {
            text_color_inactive: !isActive,
            [styles.isActive]: isActive,
          }
        )
      }
    >
      <span className={'pr-2'}>{icon}</span>
      {children}
    </NavLink>
  )
}

export default HeaderLink
