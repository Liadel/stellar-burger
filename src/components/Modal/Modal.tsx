import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from './ModalOverlay'

import styles from './Modal.module.css'

const modalRoot = document.getElementById('react-modals')

type ModalProps = {
  children: React.ReactNode
  title?: string
  onClose(): void
}

const Modal: React.FC<ModalProps> = ({ children, title = '', onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  return createPortal(
    <div className={styles.wrapper}>
      <div className={cn(styles.modal, 'p-10')}>
        {title && (
          <header className={styles.header}>
            <h2 className="text text_type_main-large pr-5">{title}</h2>
            <button className={styles.button} onClick={() => onClose()}>
              <CloseIcon type="primary" />
            </button>
          </header>
        )}
        {!title && (
          <button
            className={cn(styles.button, styles.withoutTitle)}
            onClick={() => onClose()}>
            <CloseIcon type="primary" />
          </button>
        )}
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </div>,
    modalRoot as HTMLElement
  )
}

export default Modal
