import React, {PropsWithChildren} from 'react'
import cn from 'classnames'

import styles from './Form.module.css'

type FormProps = PropsWithChildren<{
  onSubmit: (() => void) | ((e: React.FormEvent<HTMLFormElement>) => void);
  extraClass?: string
}> 
  

const Form: React.FC<FormProps> = ({ children, onSubmit, extraClass }) => {
  return (
    <form className={cn(styles.wrapper, extraClass)} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default Form
