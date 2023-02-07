import React from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './HeaderLink.module.css'

HeaderLink.propTypes = {
  icon: PropTypes.element,
  children: PropTypes.node,
  active: PropTypes.bool,
}

function HeaderLink({icon, children, active}) {
  const className = classnames(styles.link, 'pl-5 pr-5 pt-4 pb-4 text text_type_main-default', {
    'text_color_inactive': !active
  })
  return (
    <a className={className}>
      <span className={'pr-2'}>{icon}</span>
      {children}
    </a>
  );
}

export default HeaderLink;