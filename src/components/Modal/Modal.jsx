import React from 'react';
import {createPortal} from 'react-dom'
import classnames from 'classnames';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './ModalOverlay';

import styles from './Modal.module.css'

const modalRoot = document.getElementById('react-modals');

export default function Modal( { children, title='', onClose }){
  return createPortal(
    (
      <ModalOverlay onClose={onClose}>
        <div className={classnames(styles.modal, 'p-10')}>
          <header className={styles.header}>
            <h2 className='text text_type_main-large pr-5'>{title}</h2>
            <button className={styles.button} onClick={() => onClose()}>
              <CloseIcon style={{cursor: 'pointer'}} type='primary' />
            </button> 
          </header>
          {children}
        </div>
      </ModalOverlay>
    ), 
    modalRoot
  );
}
