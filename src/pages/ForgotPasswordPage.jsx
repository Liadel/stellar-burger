import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ForgotPassword } from '../components/Authentication'
import { selectUser } from '../services/selectors'
import { forgotPassword } from '../services/userSlice'

function ForgotPasswordPage() {
  const { forgotPasswordEmailSend } = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (forgotPasswordEmailSend) {
    navigate('/reset-password', { state: { from: '/forgot-password' } })
  }

  const onSubmit = (payload) => {
    dispatch(forgotPassword(payload))
  }

  return <ForgotPassword onSubmit={onSubmit} />
}

export default ForgotPasswordPage
