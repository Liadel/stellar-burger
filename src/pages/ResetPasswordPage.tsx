import React from 'react'
import { useDispatch, useSelector } from '../services/store'
import { Navigate, useLocation } from 'react-router-dom'

import { ResetPassword } from '../components/Authentication'
import { selectUser } from '../services/selectors'
import {
  resetPassword,
  ResetPasswordPayload,
} from '../services/slices/userSlice'
import { RootState } from '../services/store'

import { ROUTES } from '../constants'

const ResetPasswordPage: React.FC = () => {
  const { resetPasswordSuccessful } = useSelector((state: RootState) =>
    selectUser(state)
  )
  const dispatch = useDispatch()
  const location = useLocation()

  const previousPathname = location.state?.from || ROUTES.home

  if (previousPathname !== ROUTES.forgotPassword) {
    return <Navigate to={previousPathname} replace />
  }
  if (resetPasswordSuccessful) {
    return <Navigate to={ROUTES.logIn} replace />
  }

  const onSubmit = (payload: ResetPasswordPayload): void => {
    dispatch(resetPassword(payload))
  }

  return <ResetPassword onSubmit={onSubmit} />
}

export default ResetPasswordPage
