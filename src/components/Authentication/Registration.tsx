import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Form from '../Form/Form'
import { selectUser } from '../../services/selectors'
import { ROUTES } from '../../constants'


type RegistrationProps = {
  onSubmit(arg: RegistrationState): void,
}

type RegistrationState = {
  name: string,
  email: string,
  password: string,
}

const Registration: React.FC<RegistrationProps> = ({ onSubmit }) => {
  const { loading, error } = useSelector(selectUser)

  const [formData, setFormData] = useState<RegistrationState>({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
      <Input
        placeholder={'Имя'}
        type={'text'}
        name={'name'}
        value={formData.name}
        onChange={handleChange}
      />
      <EmailInput
        extraClass="mt-6"
        placeholder="E-mail"
        name={'email'}
        value={formData.email}
        onChange={handleChange}
      />
      <PasswordInput
        extraClass="mt-6"
        placeholder="Пароль"
        name={'password'}
        value={formData.password}
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
