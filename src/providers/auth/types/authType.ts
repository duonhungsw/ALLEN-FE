export interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  picture: string;
  birthDay: string;
}

export interface AuthState {
  user: UserInfo | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
  isRefreshing: boolean;
}


export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface LoginResponse {
  user: UserInfo;
  tokens: AuthTokens;
  message: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}