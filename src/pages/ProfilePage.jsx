import React from 'react'
import { useDispatch } from 'react-redux'

import { updateUser, logOut } from '../services/userSlice'
import Profile from '../components/Profile/Profile'

function ProfilePage() {
  const dispatch = useDispatch()

  const onFormSubmit = (payload) => {
    dispatch(updateUser(payload))
  }

  const onLogOut = (e) => {
    e.preventDefault()
    dispatch(logOut({ token: localStorage.getItem('refreshToken') }))
  }
  return <Profile onSubmit={onFormSubmit} onLogOut={onLogOut} />
}

export default ProfilePage
