export const INGREDIENT_TYPES = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки'
};

export const API_URL = 'https://norma.nomoreparties.space/api';

export const AUTH_LOGIN = '/auth/login';
export const AUTH_USER = '/auth/user';
export const AUTH_REGISTER = '/auth/register';
export const AUTH_LOGOUT = '/auth/logout';
export const AUTH_TOKEN = '/auth/token';

export const PASSWORD_FORGOT = '/password-reset';
export const PASSWORD_RESET = '/password-reset/reset';

export const WS_URL = (token: string | null) => {
  if (token) return `wss://norma.nomoreparties.space/orders?token=${token}`
  return 'wss://norma.nomoreparties.space/orders/all'
}

export const ROUTES = {
  home: '/',
  logIn: '/login',
  profile: '/profile',
  signIn: '/register',
  ingredientDetails: '/ingredients/:ingredientId',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  feed: '/feed',
  feedOrder: '/feed/:id',
  orders: '/profile/orders',
  profileOrder: '/profile/orders/:id'
};

export const ORDER_STATUSES = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'В процессе',
  cancel: 'Отменен',
}