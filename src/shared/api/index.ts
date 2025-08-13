import axios, { AxiosError, AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { APP_URL, EXPIRED_TOKEN, AUTH_ENDPOINTS } from "../constants/apiConstants";
import { 
  getAccessToken, 
  getRefreshToken, 
  setAccessToken, 
  setRefreshToken,
  clearAllAuthData 
} from "../store";

interface FailedQueueItem {
  resolve: (value: string) => void;
  reject: (reason?: unknown) => void;
}

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface ErrorResponseData {
  errors?: Array<{ errorCode: number }>;
}

export class Api {
  instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: FailedQueueItem[] = [];

  constructor() {
    this.instance = axios.create({
      baseURL: APP_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    this.setupInterceptors();
  }

  private isExpiredTokenError(error: AxiosError | unknown) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as ErrorResponseData;
    return (
      axiosError.response?.status === 401 &&
      errorData?.errors?.[0]?.errorCode === EXPIRED_TOKEN
    );
  }

  private isUnauthorizedError(error: AxiosError | unknown) {
    return (error as AxiosError).response?.status === 401;
  }

  private processQueue(error: unknown, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (token) resolve(token);
      else reject(error);
    });
    this.failedQueue = [];
  }

  private async refreshTokenRequest() {
    try {
      const refreshTokenValue = getRefreshToken();
      if (!refreshTokenValue) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post(`${APP_URL}${AUTH_ENDPOINTS.REFRESH_TOKEN}`, {
        refreshToken: refreshTokenValue,
      });

      const { accessToken } = response.data.data;
      
      // Update tokens in storage
      setAccessToken(accessToken);
      if (response.data.data.refreshToken) {
        setRefreshToken(response.data.data.refreshToken);
      }

      return accessToken;
    } catch (error) {
      // If refresh fails, clear all auth data and redirect to login
      clearAllAuthData();
      window.location.href = "/login";
      throw error;
    }
  }

  private setupInterceptors() {
    // Request interceptor - add access token to headers
    this.instance.interceptors.request.use(
      (config) => {
        const token = getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle token refresh
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as ExtendedAxiosRequestConfig;

        // If not a 401 error or already retrying, reject
        if (!this.isUnauthorizedError(error) || originalRequest._retry) {
          return Promise.reject(error);
        }

        // If already refreshing, add to queue
        if (this.isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            this.failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return this.instance.request(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        // Start refresh process
        originalRequest._retry = true;
        this.isRefreshing = true;

        try {
          const newToken = await this.refreshTokenRequest();
          this.processQueue(null, newToken);
          
          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return this.instance.request(originalRequest);
        } catch (refreshError) {
          this.processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          this.isRefreshing = false;
        }
      }
    );
  }
}

const api = new Api().instance;
export default api;
