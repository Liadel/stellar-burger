import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import AppHeader from '../AppHeader/AppHeader'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import NotFound404 from '../NotFound404/NotFound404'
import Modal from '../Modal/Modal'
import {
  HomePage,
  LoginPage,
  ProfilePage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,

} from '../../pages'

import FeedPage from '../../pages/FeedPage'
import OrderPage from '../../pages/OrderPage'
import OrdersPage from '../../pages/OrdersPage'
import UserProfile from '../Profile/UserProfile'

import IngredientDetails from '../IngredientDetails/IngredientDetails'

import { getUser } from '../../services/userSlice'
import { fetchIngredients } from '../../services/ingredientsSlice'
import { ROUTES } from '../../constants'

import styles from './App.module.css'

const App = () => {
  const dispatch: any = useDispatch()

  useEffect(() => {
    try {
      if (localStorage.getItem('accessToken')) {
        dispatch(getUser())
      }

      dispatch(fetchIngredients())
    } catch (e) {
      console.log(e)
    }
  }, [])

  const ModalSwitch = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const background: Location = location.state && location.state.background

    const handleModalClose = () => {
      navigate(-1)
    }
    const handlePageClose = () => {
      navigate(ROUTES.home)
    }

    return (
      <>
        <AppHeader />
        <div className={styles.wrapper}>
          <Routes location={background || location}>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.feed} element={<FeedPage />} />
            <Route
              path={ROUTES.logIn}
              element={
                <ProtectedRoute anonymousOnly>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.profile}
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            >
              <Route  path={ROUTES.profile} element={
                <ProtectedRoute>
                 <UserProfile />
                </ProtectedRoute>
              }/>
              <Route  path={ROUTES.orders} element={
                <ProtectedRoute>
                 <OrdersPage />
                </ProtectedRoute>
              }/>
              <Route  path={ROUTES.profileOrder}  element={
                <ProtectedRoute>
                 <OrderPage />
                </ProtectedRoute>
              }/>
            </Route>
            <Route
              path={ROUTES.signIn}
              element={
                <ProtectedRoute anonymousOnly>
                  <RegistrationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.ingredientDetails}
              element={
                <Modal onClose={handlePageClose} title="Детали ингредиента">
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path={ROUTES.forgotPassword}
              element={
                <ProtectedRoute anonymousOnly>
                  <ForgotPasswordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.resetPassword}
              element={
                <ProtectedRoute anonymousOnly>
                  <ResetPasswordPage />
                </ProtectedRoute>
              }
            />

            <Route path="/*" element={<NotFound404 />} />
          </Routes>
          {background && (
            <Routes>
              <Route
                path={ROUTES.ingredientDetails}
                element={
                  <Modal onClose={handleModalClose} title="Детали ингредиента">
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </div>
      </>
    )
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ModalSwitch />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
