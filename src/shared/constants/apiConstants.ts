export const APP_URL = process.env.NEXT_PUBLIC_API_URL;
export const EXPIRED_TOKEN = 100210;

// Token storage keys
export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_INFO: 'userInfo',
} as const;
