import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Form from '../Form/Form'
import { useSelector } from 'react-redux'
import { selectUser } from '../../services/selectors'

ForgotPassword.propTypes = {
  onSubmit: PropTypes.func,
}

function ForgotPassword({ onSubmit }) {
  const { loading, error } = useSelector(selectUser)
  const [formData, setFormData] = useState({
    email: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
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
      <h1 className="text text_type_main-medium pb-6">Восстановление пароля</h1>

      <EmailInput
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Укажите e-mail"
      />

      {error && (
        <p className="text text_type_main-small p-2">{error.message}</p>
      )}

      <Button htmlType="submit" extraClass="mt-6" disabled={loading}>
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
