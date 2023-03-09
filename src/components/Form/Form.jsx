import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './Form.module.css'

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  extraClass: PropTypes.string,
}

function Form({ children, onSubmit, extraClass }) {
  return (
    <form
      className={cn(styles.wrapper, extraClass)}
      onSubmit={() => onSubmit()}
    >
      {children}
    </form>
  )
}

export default Form
