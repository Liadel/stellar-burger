import React, { useCallback } from 'react'

import { Link } from 'react-router-dom'
import { useSelector } from '../../services/store'
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Form from '../Form/Form'
import { selectUser } from '../../services/selectors'
import { ROUTES } from '../../constants'
import { useForm } from '../../hooks/useForm'

type LoginProps = {
  onSubmit(arg: LoginState): void
}

type LoginState = {
  email: string
  password: string
}

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
  const { loading, error } = useSelector(selectUser)
  const initialState: LoginState = { email: '', password: '' }

  const { values, handleChange } = useForm(initialState)

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSubmit(values)
    },
    [values, onSubmit]
  )

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium pb-6">Войти</h1>
      <EmailInput
        name={'email'}
        value={values.email}
        placeholder="E-mail"
        onChange={handleChange}
      />
      <PasswordInput
        name={'password'}
        value={values.password}
        extraClass="mt-6"
        placeholder="Пароль"
        onChange={handleChange}
      />
      {error && (
        <p className="text text_type_main-small p-2">{error.message}</p>
      )}
      <Button htmlType="submit" extraClass="mt-6" disabled={loading}>
        Войти
      </Button>

      <footer className="text text_type_main-small text_color_inactive pt-20">
        <p>
          {'Вы — новый пользователь? '}
          <Link to={ROUTES.signIn}>Зарегистрироваться</Link>
        </p>
        <p>
          {'Забыли пароль? '}
          <Link to={ROUTES.forgotPassword}>Восстановить пароль</Link>
        </p>
      </footer>
    </Form>
  )
}

export default Login
