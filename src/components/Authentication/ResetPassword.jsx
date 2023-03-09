import React from 'react'
import { Link } from 'react-router-dom'
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'

import Form from '../Form/Form'

function ResetPassword() {
  return (
    <Form>
      <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>

      <PasswordInput placeholder="Укажите e-mail" />
      <Input extraClass="mt-6" placeholder="Введите код из письма" />

      <Button htmlType="submit" extraClass="mt-6">
        Сохранить
      </Button>
      <footer className="text text_type_main-small text_color_inactive mt-20">
        {'Вспомнили пароль? '}
        <Link to={'/login'}>Войти</Link>
      </footer>
    </Form>
  )
}

export default ResetPassword
