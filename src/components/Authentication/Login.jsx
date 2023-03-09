import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Form from '../Form/Form'

function Login() {
  return (
    <Form>
      <h1 className="text text_type_main-medium pb-6">Войти</h1>
      <EmailInput placeholder="Имя" />
      <PasswordInput extraClass="mt-6" placeholder="Имя" />
      <Button htmlType="submit" extraClass="mt-6">
        Войти
      </Button>

      <footer className="text text_type_main-small text_color_inactive pt-20">
        <p>
          {'Вы — новый пользователь? '}
          <Link to={'/register'}>Зарегистрироваться</Link>
        </p>
        <p>
          {'Забыли пароль? '}
          <Link to={'/forgot-password'}>Восстановить пароль</Link>
        </p>
      </footer>
    </Form>
  )
}

export default Login
