export interface UserInfo {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string;
  dob: string;
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