export const APP_URL = process.env.NEXT_PUBLIC_API_URL;
export const EXPIRED_TOKEN = 100210;

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  GOOGLE_LOGIN: '/auth/signin-google',
  ACTIVATE_ACCOUNT: '/auth/activate',
} as const;

// User endpoints
export const USER_ENDPOINTS = {
  GET_PROFILE: '/users/me',
  CHANGE_PASSWORD: '/users/change-password',
  FORGOT_PASSWORD: '/users/forgot-password',
  RESET_PASSWORD: '/users/update-forgot-password',
} as const;

// Token storage keys
export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_INFO: 'userInfo',
} as const;
