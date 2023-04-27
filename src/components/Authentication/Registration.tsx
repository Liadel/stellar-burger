import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from '../../services/store'

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Form from '../Form/Form'
import { selectUser } from '../../services/selectors'
import { ROUTES } from '../../constants'
import { useForm } from '../../hooks/useForm'

type RegistrationProps = {
  onSubmit(arg: RegistrationState): void
}

type RegistrationState = {
  name: string
  email: string
  password: string
}

const Registration: React.FC<RegistrationProps> = ({ onSubmit }) => {
  const { loading, error } = useSelector(selectUser)
  const initialState: RegistrationState = { name: '', email: '', password: '' }

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
      <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
      <Input
        placeholder={'Имя'}
        type={'text'}
        name={'name'}
        value={values.name}
        onChange={handleChange}
      />
      <EmailInput
        extraClass="mt-6"
        placeholder="E-mail"
        name={'email'}
        value={values.email}
        onChange={handleChange}
      />
      <PasswordInput
        extraClass="mt-6"
        placeholder="Пароль"
        name={'password'}
        value={values.password}
        onChange={handleChange}
      />
      {error && (
        <p className="text text_type_main-small p-2">{error.message}</p>
      )}
      <Button htmlType="submit" extraClass="mt-6" disabled={loading}>
        Зарегистрироваться
      </Button>
      <footer className="text text_type_main-small text_color_inactive mt-20">
        {'Уже зарегистрированы? '}
        <Link to={ROUTES.logIn}>Войти</Link>
      </footer>
    </Form>
  )
}

export default Registration
