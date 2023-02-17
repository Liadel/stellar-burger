import React, {memo} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './DraggableElement.module.css'

DraggableElement.propTypes = {
  draggable: PropTypes.bool,
  children: PropTypes.node,
  extraClass: PropTypes.string
} 

function DraggableElement({draggable = true, extraClass, children }) {
  return (
    <li className={classnames(styles.element, 'pl-8 pr-2 pb-4', extraClass)}>
      {draggable && <span className={styles.icon}><DragIcon type="primary" /></span>}
      {children}
    </li>
  )
}

export default memo(DraggableElement)