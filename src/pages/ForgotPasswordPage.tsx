import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from '../services/store'
import { ForgotPassword } from '../components/Authentication'
import { selectUser } from '../services/selectors'
import { RootState } from '../services/store'
import {
  forgotPassword,
  ForgotPasswordPayload,
} from '../services/slices/userSlice'

import { ROUTES } from '../constants'

const ForgotPasswordPage: FC = () => {
  const { forgotPasswordEmailSend } = useSelector((state: RootState) =>
    selectUser(state)
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (forgotPasswordEmailSend) {
    navigate(ROUTES.resetPassword, { state: { from: ROUTES.forgotPassword } })
  }

  const onSubmit = (payload: ForgotPasswordPayload): void => {
    dispatch(forgotPassword(payload))
  }

  return <ForgotPassword onSubmit={onSubmit} />
}

export default ForgotPasswordPage
