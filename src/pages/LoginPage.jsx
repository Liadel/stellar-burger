import React from 'react'
import { useDispatch } from 'react-redux'
import { Login } from '../components/Authentication'
import { logIn } from '../services/userSlice'

function LoginPage() {
  const dispatch = useDispatch()

  const onFormSubmit = (payload) => {
    dispatch(logIn(payload))
  }

  return <Login onSubmit={onFormSubmit} />
}
export default LoginPage
