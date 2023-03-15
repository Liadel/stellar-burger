import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Form from '../Form/Form'
import styles from './Profile.module.css'
import { selectUser } from '../../services/selectors'
import { ROUTES } from '../../constants'

const linkClasses = (isActive) =>
  cn('text text_type_main-medium', styles.link, {
    [styles.active]: isActive,
    ['text_color_inactive']: !isActive,
  })

Profile.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
}

function Profile({ onSubmit, onLogOut }) {
  const { user } = useSelector(selectUser)
  const initialFormData = { ...user, password: '' }

  const [formData, setFormData] = useState(initialFormData)
  const [hasChanged, setHasChanged] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setHasChanged(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setHasChanged(false)
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setHasChanged(false)
  }

  useEffect(() => {
    const hasFormChanged =
      JSON.stringify(initialFormData) !== JSON.stringify(formData)
    setHasChanged(hasFormChanged)
  }, [formData, initialFormData])

  return (
    <section className={styles.wrapper}>
      <section className={'pr-15'}>
        <nav className={styles.navigation}>
          <NavLink
            to={ROUTES.profile}
            className={({ isActive }) => linkClasses(isActive)}
          >
            Профиль
          </NavLink>
          <NavLink
            to={'/profile/orders'}
            className={({ isActive }) => linkClasses(isActive)}
          >
            История заказов
          </NavLink>
          <NavLink
            to={'/logout'}
            className={({ isActive }) => linkClasses(isActive)}
            onClick={onLogOut}
          >
            Выход
          </NavLink>
        </nav>
        <footer
          className={cn(
            styles.footer,
            'text text_type_main-small text_color_inactive pt-20'
          )}
        >
          В этом разделе вы можете изменить свои персональные данные
        </footer>
      </section>

      <Form extraClass={styles.form} onSubmit={handleSubmit}>
        <EmailInput
          placeholder="Имя"
          name="name"
          icon="EditIcon"
          isIcon={true}
          error={false}
          value={formData.name}
          onChange={handleChange}
        />
        <EmailInput
          extraClass={'mt-6'}
          name="email"
          isIcon={true}
          placeholder="Логин"
          value={formData.email}
          onChange={handleChange}
        />
        <PasswordInput
          extraClass={'mt-6'}
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          value={formData.password}
        />
        {hasChanged && (
          <section className={styles.actions}>
            <Button
              onClick={handleReset}
              htmlType="reset"
              type="secondary"
              size="medium"
            >
              Отмена
            </Button>
            <Button htmlType="submit">Сохранить</Button>
          </section>
        )}
      </Form>
    </section>
  )
}

export default Profile
