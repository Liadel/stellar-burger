import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppHeader from '../AppHeader/AppHeader'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { 
  HomePage, 
  LoginPage, 
  ProfilePage, 
  RegistrationPage, 
  IngredientPage, 
  ForgotPasswordPage, 
  ResetPasswordPage
} from '../../pages'

import styles from './App.module.css'

function App() {
  return ( 
    <ErrorBoundary>
      <BrowserRouter>
        <AppHeader />
        <div className={styles.wrapper}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/ingredients/:id" element={<IngredientPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
