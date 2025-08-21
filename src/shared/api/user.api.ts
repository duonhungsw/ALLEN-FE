import { UserInfo } from "@/providers/auth/types/authType";
import api from "./index";
import { APP_URL } from "../constants/apiConstants";
import { getCookie } from "@/utils/cookies";

export const fetchUserProfile = async (): Promise<UserInfo> => {
  const { Id, id } = JSON.parse(getCookie('user') || '{}');
  const userId: string = Id || id;
  const response = await api.get(`${APP_URL}/users/${userId}`, {
  headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const updateUserProfile = async (payload: UserInfo): Promise<UserInfo> => {
  const { Id, id } = JSON.parse(getCookie('user') || '{}');
  const userId: string = Id || id;
  const response = await api.patch(`${APP_URL}/users/${userId}`, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAllUsers = async (): Promise<UserInfo[]> => {
  try {
    const response = await api.get(`${APP_URL}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};