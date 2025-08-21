import { deleteCookie } from "@/utils/cookies";
import { TOKEN_KEYS } from "../constants/apiConstants";

const isClient = typeof window !== "undefined";

export const fromStoredData = (storageData: any) => {
  try {
    return JSON.parse(storageData);
  } catch {
    return storageData;
  }
};

export const toStoredData = (data: any) => {
  if (typeof data === "string") {
    return data;
  }
  return JSON.stringify(data);
};

export const getStorageData = (key: any) => {
  if (!isClient) return null;
  const storedData = localStorage.getItem(key);
  return storedData ? fromStoredData(storedData) : null;
};

export const setStorageData = (key: any, data: any) => {
  if (!isClient) return;
  localStorage.setItem(key, toStoredData(data));
};

export const removeStorageData = (key: any) => {
  if (!isClient) return;
  localStorage.removeItem(key);
};

// Token management functions
export const getAccessToken = () => getStorageData(TOKEN_KEYS.ACCESS_TOKEN);
export const getRefreshToken = () => getStorageData(TOKEN_KEYS.REFRESH_TOKEN);
export const getUserInfo = () => getStorageData(TOKEN_KEYS.USER_INFO);

export const setAccessToken = (token: string) => setStorageData(TOKEN_KEYS.ACCESS_TOKEN, token);
export const setRefreshToken = (token: string) => setStorageData(TOKEN_KEYS.REFRESH_TOKEN, token);
export const setUserInfo = (user: any) => setStorageData(TOKEN_KEYS.USER_INFO, user);

export const removeAccessToken = () => removeStorageData(TOKEN_KEYS.ACCESS_TOKEN);
export const removeRefreshToken = () => removeStorageData(TOKEN_KEYS.REFRESH_TOKEN);
export const removeUserInfo = () => removeStorageData(TOKEN_KEYS.USER_INFO);

export const clearAllAuthData = () => {
  // Clear localStorage
  removeAccessToken();
  removeRefreshToken();
  removeUserInfo();
  
  // Clear cookies
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  deleteCookie("user");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  return !!(accessToken && refreshToken);
};
