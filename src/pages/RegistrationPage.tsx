import React from 'react'
import { useDispatch } from 'react-redux'
import { Registration } from '../components/Authentication'
import { signIn, SignInPayload } from '../services/userSlice'

const RegistrationPage: React.FC = () => {
  const dispatch: any = useDispatch()

  const onFormSubmit = (payload: SignInPayload): void => {
    dispatch(signIn(payload))
  }

  return <Registration onSubmit={onFormSubmit} />
}

export default RegistrationPage
