import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { ResetPassword } from '../components/Authentication'
import { selectUser } from '../services/selectors'
import { resetPassword } from '../services/userSlice'

import { ROUTES } from '../constants'

function ResetPasswordPage() {
  const { resetPasswordSuccessful } = useSelector(selectUser)
  const dispatch = useDispatch()
  const location = useLocation()

  const previousPathname = location.state?.from || ROUTES.home

  if (previousPathname !== ROUTES.forgotPassword) {
    return <Navigate to={previousPathname} replace />
  }
  if (resetPasswordSuccessful) {
    return <Navigate to={ROUTES.logIn} replace />
  }

  const onSubmit = (payload) => {
    dispatch(resetPassword(payload))
  }

  return <ResetPassword onSubmit={onSubmit} />
}

export default ResetPasswordPage
