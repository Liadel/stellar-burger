import React from 'react';
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './HeaderLink.module.css'

HeaderLink.propTypes = {
  icon: PropTypes.element,
  children: PropTypes.node,
  to: PropTypes.string,
}

function HeaderLink({icon, children, to}) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) =>
        classnames(styles.link, 'pl-5 pr-5 pt-4 pb-4 text text_type_main-default', {
          'text_color_inactive': !isActive,
          [styles.isActive]: isActive
        })
      } >
      <span className={'pr-2'}>{icon}</span>
      {children}
    </NavLink>
  );
}

export default HeaderLink;