"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUser, setTokens } from "@/providers/auth/reducer/authSlice";
import { getAccessToken, getRefreshToken, getUserInfo, isAuthenticated } from "@/shared/store";
import { getCurrentUser } from "@/shared/api/auth.api";

export default function AuthHydration() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const hydrateAuth = async () => {
      dispatch(setLoading(true));
      
      try {
        // Check if we have valid tokens
        if (isAuthenticated()) {
          const accessToken = getAccessToken();
          const refreshToken = getRefreshToken();
          const userInfo = getUserInfo();

          // Set tokens in Redux
          if (accessToken && refreshToken) {
            dispatch(setTokens({
              accessToken,
              refreshToken,
              expiresIn: 3600, // Default value, adjust as needed
              tokenType: "Bearer"
            }));
          }

          // If we have user info, set it
          if (userInfo) {
            dispatch(setUser(userInfo));
          } else {
            // Fetch fresh user data
            try {
              const response = await getCurrentUser();
              if (response.data) {
                dispatch(setUser(response.data));
              }
            } catch (error) {
              console.error("Failed to fetch user profile:", error);
              // If we can't fetch user, clear everything
              localStorage.clear();
            }
          }
        }
      } catch (error) {
        console.error("Failed to hydrate auth state:", error);
        // Clear invalid data
        localStorage.clear();
      } finally {
        dispatch(setLoading(false));
      }
    };

    hydrateAuth();
  }, [dispatch]);

  return null;
}
