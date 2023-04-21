import React from 'react'
import { useDispatch } from '../services/store'
import { Registration } from '../components/Authentication'
import { signIn, SignInPayload } from '../services/slices/userSlice'

const RegistrationPage: React.FC = () => {
  const dispatch = useDispatch()

  const onFormSubmit = (payload: SignInPayload): void => {
    dispatch(signIn(payload))
  }

  return <Registration onSubmit={onFormSubmit} />
}

export default RegistrationPage
