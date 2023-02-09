import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Modal from '../Modal/Modal'
import check from '../../images/check-image.svg'

import styles from './OrderDetails.module.css'

OrderDetails.propTypes = {
  onClose: PropTypes.func
}

export default function OrderDetails({onClose}){
  return (
    <Modal onClose={onClose}>
      <div className={classnames(styles.wrapper, 'pt-4 pb-20', 'pl-15', 'pr-15')}>
        <h2 className='text text_type_digits-large pb-8'>
          034536
        </h2>
        <p className='text text_type_main-medium pb-15'>
          идентификатор заказа
        </p>
        <img className='pb-15' src={check} alt='check' />
        <p className='text text_type_main-default pb-2'>
          Ваш заказ начали готовить
        </p>
        <p className='text text_type_main-default  text_color_inactive'>
           Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  )
}