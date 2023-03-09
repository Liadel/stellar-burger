import React from 'react'
import { Link } from 'react-router-dom'
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Form from '../Form/Form'

function ForgotPassword() {
  return (
    <Form>
      <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>

      <EmailInput placeholder="Укажите e-mail" />

      <Button htmlType="submit" extraClass="mt-6">
        Восстановить
      </Button>
      <footer className="text text_type_main-small text_color_inactive mt-20">
        {'Вспомнили пароль? '}
        <Link to={'/login'}>Войти</Link>
      </footer>
    </Form>
  )
}

export default ForgotPassword
