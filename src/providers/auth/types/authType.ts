export interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  picture: string;
  birthDay: string | null;
  isDeleted: boolean;
  role: string;
}

export interface AuthState {
  user: UserInfo | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}
