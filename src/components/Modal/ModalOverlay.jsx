import React from 'react';
import PropTypes from 'prop-types'
import styles from './ModalOverlay.module.css'

ModalOverlay.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func
}

export default function ModalOverlay({children, onClose}){
  return <div onClick={() => onClose()} className={styles.overlay}>{children}</div>
}
