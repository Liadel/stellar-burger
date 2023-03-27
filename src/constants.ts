export const INGREDIENT_TYPES = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки'
} as const;

export const API_URL = 'https://norma.nomoreparties.space/api' as const;

export const AUTH_LOGIN = '/auth/login' as const;
export const AUTH_USER = '/auth/user' as const;
export const AUTH_REGISTER = '/auth/register' as const;
export const AUTH_LOGOUT = '/auth/logout' as const;
export const AUTH_TOKEN = '/auth/token' as const;

export const PASSWORD_FORGOT = '/password-reset' as const;
export const PASSWORD_RESET = '/password-reset/reset' as const;

export const ROUTES = {
  home: '/',
  logIn: '/login',
  profile: '/profile',
  signIn: '/register',
  ingredientDetails: '/ingredients/:ingredientId',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password'
} as const;