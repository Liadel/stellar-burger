import React from 'react'
import cn from 'classnames'

import styles from './Form.module.css'

type FormProps =  {
  children: React.ReactNode;
  onSubmit: (() => void) | ((e: React.SyntheticEvent) => void);
  extraClass?: string
}

const Form: React.FC<FormProps> = ({ children, onSubmit, extraClass }) => {
  return (
    <form className={cn(styles.wrapper, extraClass)} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default Form
