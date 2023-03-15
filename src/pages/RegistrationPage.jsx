import React from 'react'

import { useDispatch } from 'react-redux'
import { Registration } from '../components/Authentication'
import { signIn } from '../services/userSlice'

function RegistrationPage() {
  const dispatch = useDispatch()

  const onFormSubmit = (payload) => {
    dispatch(signIn(payload))
  }

  return <Registration onSubmit={onFormSubmit} />
}

export default RegistrationPage
