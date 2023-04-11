import React, {FC} from 'react'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { logOut } from '../services/userSlice'
import { ROUTES } from '../constants'

import styles from './ProfilePage.module.css'

const ProfilePage: FC = () =>  {
  const dispatch: any = useDispatch()

  const onLogOut = (e: React.SyntheticEvent)=> {
    e.preventDefault()
    dispatch(logOut({ token: localStorage.getItem('refreshToken') }))
  }
  const linkClasses = (isActive: boolean) =>
    cn('text text_type_main-medium', styles.link, {
      [styles.active]: isActive,
      ['text_color_inactive']: !isActive,
    })

  return    ( <section className={styles.wrapper}>
  <section className={'pr-15'}>
    <nav className={styles.navigation}>
      <NavLink
        to={ROUTES.profile}
        className={({ isActive }) => linkClasses(isActive)}
      >
        Профиль
      </NavLink>
      <NavLink
        to={ROUTES.orders}
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
    <Outlet />
  </section>)
}
export default ProfilePage

{/*import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import cn from 'classnames'
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import Form from '../Form/Form'
import styles from './Profile.module.css'
import { selectUser } from '../../services/selectors'


import { User } from '../../services/userSlice'




type ProfileProps = {
  onSubmit: (arg: FormData) => void
  onLogOut: (e: React.SyntheticEvent) => void
}

type FormData = User & {
  password: string
}

const Profile: React.FC<ProfileProps> = ({ onSubmit, onLogOut }) => {
  const { user } = useSelector(selectUser)
  const initialFormData: FormData = { ...user, password: '' }
  const [ disabled, setDisabled ] = useState(true)
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
    onSubmit(formData)
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
    setDisabled(true);
};

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
 */}
