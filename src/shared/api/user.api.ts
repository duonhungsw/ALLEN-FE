import { UserInfo } from "@/providers/auth/types/authType";
import api from "./index";
import { APP_URL } from "../constants/apiConstants";


export const fetchUserProfile = async (userId: string): Promise<UserInfo> => {
  const response = await api.get(`${APP_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data;
};

export const updateUserProfile = async (
  userId: string, 
  payload: Partial<UserInfo> | FormData
): Promise<UserInfo> => {
  const isFormData = payload instanceof FormData;
  const response = await api.patch(`${APP_URL}/users/${userId}`, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
  });
  return response.data;
};

export const getAllUsers = async (): Promise<UserInfo[]> => {
  try {
    const response = await api.get(`${APP_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

