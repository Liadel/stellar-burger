export const INGREDIENT_TYPES = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки'
}

export const API_URL = 'https://norma.nomoreparties.space/api'

export const AUTH_LOGIN = '/auth/login'
export const AUTH_USER = '/auth/user'
export const AUTH_REGISTER = '/auth/register'
export const AUTH_LOGOUT = '/auth/logout'
export const AUTH_TOKEN = '/auth/token'

export const PASSWORD_FORGOT = '/password-reset'
export const PASSWORD_RESET = '/password-reset/reset'

export const ROUTES = {
  home: '/',
  logIn: '/login',
  profile: '/profile',
  signIn: '/register',
  ingredientDetails: '/ingredients/:ingredientId',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password'
}