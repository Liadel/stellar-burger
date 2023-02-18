import React from 'react'
import classnames from 'classnames'
import { useOrderData } from '../../context/OrderDataProvider'

import check from '../../images/check-image.svg'
import styles from './OrderDetails.module.css'


export default function OrderDetails(){
  const {orderData} = useOrderData()
  
  return (
    <div className={classnames(styles.wrapper, 'pt-4 pb-20', 'pl-15', 'pr-15')}>
      <h2 className='text text_type_digits-large pb-8'>
        {orderData?.number}
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
  )
}