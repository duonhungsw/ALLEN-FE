import api from "./index";
import { APP_URL } from "../constants/apiConstants";

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

export const login = async (payload: LoginPayload) => {
  const response = await api.post(`${APP_URL}/auth/login`, payload);
  return response.data;
};

export const sendGoogleUserToBackend = async (payload: { idToken: string }) => {
  try {
    console.log("call api to post data ");
    const res = await api.post(`${APP_URL}/auth/signin-google`, payload);
    return res.data;
  } catch (error: any) {
    console.error("No response received from backend:", error);
    throw error; // vẫn throw để chỗ khác xử lý
  }
};

export const logout = async () => {
  const response = await api.post(`${APP_URL}/auth/logout`);
  return response.data;
};

export const register = async (payload: RegisterPayload) => {
  const response = await api.post(`${APP_URL}/auth/register`, payload);
  return response.data;
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.post(`${APP_URL}/auth/change-password`, data,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export const forgotPassword = async (data: { email: string }) => {
  const response = await api.post(`${APP_URL}/auth/forgot-password`, data);
  return response.data;
};

export const resetPassword = async (data: {
  newPassword: string;
  confirmPassword: string;
}) => {
  const response = await api.post(
    `${APP_URL}/auth/reset-password`,
    data
  );
  return response.data;
};

export const getActivateAccount = (token: string) =>
  api.get(`${APP_URL}/auth/activate?token=${token}`);
