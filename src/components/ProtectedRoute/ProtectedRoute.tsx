import React from 'react'
import { useSelector } from '../../services/store'
import { useLocation, Navigate } from 'react-router-dom'

import { selectUser } from '../../services/selectors'

import { ROUTES } from '../../constants'

type ProtectedRouteProps = {
  children: React.ReactElement
  background?: Location
  anonymousOnly?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  background,
  anonymousOnly = false,
}) => {
  const { isLoggedIn } = useSelector(selectUser)

  const location = useLocation()
  const from = location.state?.from || ROUTES.home

  if (anonymousOnly && isLoggedIn) {
    return <Navigate to={from} />
  }

  if (!anonymousOnly && !isLoggedIn) {
    return <Navigate to={ROUTES.logIn} state={{ from: location }} />
  }

  if (background && !isLoggedIn) {
    return <Navigate to={ROUTES.logIn} state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
