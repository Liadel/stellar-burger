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

Registration.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
}

function Registration({ onSubmit, onChange }) {
  const { name, email } = useSelector((state) => state.user)
  const { password, setPassword } = useState('')
  return (
    <Form onSubmit={onSubmit} onChange={onChange}>
      <h1 className="text text_type_main-medium pb-6">Регистрация</h1>
      <Input placeholder={'Имя'} type={'text'} name={'name'} value={name} />
      <EmailInput
        extraClass="mt-6"
        placeholder="E-mail"
        name={'email'}
        value={email}
      />
      <PasswordInput
        extraClass="mt-6"
        placeholder="Пароль"
        name={'password'}
        value={password}
        onChange={setPassword}
      />
      <Button htmlType="submit" extraClass="mt-6">
        Войти
      </Button>
      <footer className="text text_type_main-small text_color_inactive mt-20">
        {'Уже зарегистрированы? '}
        <Link to={'/login'}>Войти</Link>
      </footer>
    </Form>
  )
}

export default Registration
