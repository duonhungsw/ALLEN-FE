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
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}
