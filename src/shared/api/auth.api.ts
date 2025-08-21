import api from "./index";
import { APP_URL } from "../constants/apiConstants";
import axios from "axios";
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

export const sendGoogleUserToBackend = async (payload: { idToken: string,signedToken:string }) => {
  try {
    console.log("call api to post data ");
    const res = await api.post(`${APP_URL}/auth/signin-google`, payload);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      // Server trả về status code khác 2xx
      console.error("Backend responded with error:");
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // Request đã gửi đi nhưng không nhận được phản hồi
      console.error("No response received from backend:", error.request);
    } else {
      // Lỗi khi setup request
      console.error("Error setting up request:", error.message);
    }
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
  const response = await api.post(`${APP_URL}/users/change-password`, data);
  return response.data;
};

export const forgotPassword = async (data: { email: string }) => {
  const response = await api.post(`${APP_URL}/users/forgot-password`, data);
  return response.data;
};

export const resetPassword = async (data: {
  token: string;
  password: string;
}) => {
  const response = await api.post(
    `${APP_URL}/users/update-forgot-password`,
    data
  );
  return response.data;
};

export const getActivateAccount = (token: string) =>
  api.get(`${APP_URL}/auth/activate?token=${token}`);
