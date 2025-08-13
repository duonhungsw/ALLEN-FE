import api from "./index";
import { APP_URL, AUTH_ENDPOINTS, USER_ENDPOINTS } from "../constants/apiConstants";

export interface LoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await api.post(`${APP_URL}${AUTH_ENDPOINTS.LOGIN}`, payload);
  return response.data;
};

export const refreshToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  const response = await api.post(`${APP_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`, {
    refreshToken,
  });
  return response.data;
};

export const getGoogleLoginUrl = () => {
  return `${APP_URL}${AUTH_ENDPOINTS.GOOGLE_LOGIN}`;
};

export const logout = async () => {
  const response = await api.post(`${APP_URL}${AUTH_ENDPOINTS.LOGOUT}`);
  return response.data;
};

export const register = async (payload: RegisterPayload) => {
  const response = await api.post(`${APP_URL}${AUTH_ENDPOINTS.REGISTER}`, payload);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get(`${APP_URL}${USER_ENDPOINTS.GET_PROFILE}`);
  return response.data;
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.post(`${APP_URL}${USER_ENDPOINTS.CHANGE_PASSWORD}`, data);
  return response.data;
};

export const forgotPassword = async (data: { email: string }) => {
  const response = await api.post(`${APP_URL}${USER_ENDPOINTS.FORGOT_PASSWORD}`, data);
  return response.data;
};

export const resetPassword = async (data: {
  token: string;
  password: string;
}) => {
  const response = await api.post(
    `${APP_URL}${USER_ENDPOINTS.RESET_PASSWORD}`,
    data
  );
  return response.data;
};

export const getActivateAccount = (token: string) =>
  api.get(`${APP_URL}${AUTH_ENDPOINTS.ACTIVATE_ACCOUNT}?token=${token}`);
