import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from '../../services/store'

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Form from '../Form/Form'
import styles from './Profile.module.css'
import { selectUser } from '../../services/selectors'

import { User, updateUser } from '../../services/slices/userSlice'

type FormData = User & {
  password: string
}

const UserProfile: React.FC = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(selectUser)
  const initialFormData: FormData = { ...user, password: '' }
  const [disabled, setDisabled] = useState(true)
  const [formData, setFormData] = useState(initialFormData)
  const [hasChanged, setHasChanged] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setHasChanged(true)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(updateUser(formData))
    setHasChanged(false)
  }

  const handleReset = () => {
    setFormData(initialFormData)
    setHasChanged(false)
  }

  const onIconClick = () => {
    setDisabled(false)
    inputRef.current?.focus()
  }
  const onBlur = () => {
    setDisabled(true)
  }

  useEffect(() => {
    const hasFormChanged =
      JSON.stringify(initialFormData) !== JSON.stringify(formData)
    setHasChanged(hasFormChanged)
  }, [formData, initialFormData])

  return (
    <Form extraClass={styles.form} onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        placeholder="Имя"
        name="name"
        icon="EditIcon"
        value={formData.name}
        disabled={disabled}
        onIconClick={onIconClick}
        onBlur={onBlur}
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
            size="medium">
            Отмена
          </Button>
          <Button htmlType="submit">Сохранить</Button>
        </section>
      )}
    </Form>
  )
}

export default UserProfile
