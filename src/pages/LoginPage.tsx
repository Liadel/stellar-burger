import React, { FC } from 'react'
import { useDispatch } from '../services/store'
import { Login } from '../components/Authentication'
import { logIn, LogInPayload } from '../services/slices/userSlice'

const LoginPage: FC = () => {
  const dispatch = useDispatch()

  const onFormSubmit = (payload: LogInPayload): void => {
    dispatch(logIn(payload))
  }

  return <Login onSubmit={onFormSubmit} />
}
export default LoginPage
