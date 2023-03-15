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

import OrderDetails from '../OrderDetails/OrderDetails'
import IngredientDetails from '../IngredientDetails/IngredientDetails'

import { getUser } from '../../services/userSlice'
import { fetchIngredients } from '../../services/ingredientsSlice'

import styles from './App.module.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      dispatch(getUser())
      dispatch(fetchIngredients())
    } catch (e) {
      console.log(e)
    }
  }, [])

  const ModalSwitch = () => {
    const location = useLocation()
    const navigate = useNavigate()
    let background = location.state && location.state.background

    const handleModalClose = () => {
      navigate(-1)
    }

    return (
      <>
        <AppHeader />
        <div className={styles.wrapper}>
          <Routes location={background || location}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute anonymousOnly>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute anonymousOnly>
                  <RegistrationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ingredients/:ingredientId"
              element={<IngredientDetails />}
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRoute anonymousOnly>
                  <ForgotPasswordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reset-password"
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
                path="/ingredients/:ingredientId"
                element={
                  <Modal onClose={handleModalClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path="/profile/orders/:orderNumber"
                element={
                  <ProtectedRoute>
                    <Modal onClose={handleModalClose}>
                      <OrderDetails />
                    </Modal>
                  </ProtectedRoute>
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
