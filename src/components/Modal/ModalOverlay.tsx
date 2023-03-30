import React from 'react'

import styles from './ModalOverlay.module.css'

type ModalOverlayProps = {
  onClose(): void
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose }) => {
  return <div onClick={() => onClose()} className={styles.overlay} />
}

export default ModalOverlay
