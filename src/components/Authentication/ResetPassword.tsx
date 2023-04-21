import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'

import Form from '../Form/Form'
import { useSelector } from '../../services/store'
import { selectUser } from '../../services/selectors'
import { ROUTES } from '../../constants'

type ResetPasswordProps = {
  onSubmit(arg: ResetPasswordState): void
}

type ResetPasswordState = {
  password: string
  token: string
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onSubmit }) => {
  const { loading, error } = useSelector(selectUser)
  const [formData, setFormData] = useState({
    password: '',
    token: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>

      <PasswordInput
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Введите новый пароль"
      />
      <Input
        name="token"
        value={formData.token}
        onChange={handleChange}
        placeholder="Введите код из письма"
        extraClass="mt-6"
      />

      {error && (
        <p className="text text_type_main-small p-2">{error.message}</p>
      )}

      <Button htmlType="submit" extraClass="mt-6" disabled={loading}>
        Сохранить
      </Button>
      <footer className="text text_type_main-small text_color_inactive mt-20">
        {'Вспомнили пароль? '}
        <Link to={ROUTES.logIn}>Войти</Link>
      </footer>
    </Form>
  )
}

export default ResetPassword
