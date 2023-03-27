import React, {FC} from 'react'
import { useDispatch } from 'react-redux'
import { Login } from '../components/Authentication'
import { logIn, LogInPayload } from '../services/userSlice'

const LoginPage: FC = () => {
  const dispatch: any = useDispatch()

  const onFormSubmit = (payload: LogInPayload): void => {
    dispatch(logIn(payload))
  }

  return <Login onSubmit={onFormSubmit} />
}
export default LoginPage
