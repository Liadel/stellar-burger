import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ForgotPassword } from '../components/Authentication'
import { selectUser } from '../services/selectors'
import { forgotPassword } from '../services/userSlice'

import { ROUTES } from '../constants'

function ForgotPasswordPage() {
  const { forgotPasswordEmailSend } = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (forgotPasswordEmailSend) {
    navigate(ROUTES.resetPassword, { state: { from: ROUTES.forgotPassword } })
  }

  const onSubmit = (payload) => {
    dispatch(forgotPassword(payload))
  }

  return <ForgotPassword onSubmit={onSubmit} />
}

export default ForgotPasswordPage
