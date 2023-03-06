import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './ConstructorFooter.module.css'

const ConstructorFooter = ({price, disable, handleClick}) => {
  return (
    <footer className={classnames(styles.footer, 'pt-6 pr-4')}>
    <p className={classnames(styles.price,'text text_type_digits-medium pr-10')}>
      <span className='p-2'>
        {price}
      </span> 
      <CurrencyIcon type='primary' />
    </p>
    <Button 
      htmlType="button" 
      type="primary" 
      size="medium"
      disabled={disable} 
      onClick={handleClick}
      >
        Оформить заказ
    </Button>
  </footer>
  )
}

ConstructorFooter.propTypes = {
  price: PropTypes.number.isRequired,
  disable: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
}

export default ConstructorFooter