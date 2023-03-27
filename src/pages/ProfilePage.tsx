import React, {FC} from 'react'
import { useDispatch } from 'react-redux'

import { updateUser, logOut, UpdateUserPayload } from '../services/userSlice'
import Profile from '../components/Profile/Profile'

const ProfilePage: FC = () =>  {
  const dispatch: any = useDispatch()

  const onFormSubmit = (payload: UpdateUserPayload): void => {
    dispatch(updateUser(payload))
  }

  const onLogOut = (e: Event): void => {
    e.preventDefault()
    dispatch(logOut({ token: localStorage.getItem('refreshToken') }))
  }
  return <Profile onSubmit={onFormSubmit} onLogOut={onLogOut} />
}

export default ProfilePage
