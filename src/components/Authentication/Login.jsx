import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Form from '../Form/Form'
import { selectUser } from '../../services/selectors'

Login.propTypes = {
  onSubmit: PropTypes.func,
}

function Login({ onSubmit }) {
  const { loading, error } = useSelector(selectUser)

  const [formData, setFormData] = useState({
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
      <h1 className="text text_type_main-medium pb-6">Войти</h1>
      <EmailInput
        name={'email'}
        value={formData.email}
        placeholder="E-mail"
        onChange={handleChange}
      />
      <PasswordInput
        name={'password'}
        value={formData.password}
        extraClass="mt-6"
        placeholder="Пароль"
        onChange={handleChange}
        error={false}
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
