import React, { useState } from 'react'
import PropTypes from 'prop-types'
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

Registration.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

function Registration({ onSubmit }) {
  const { loading, error } = useSelector(selectUser)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
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
