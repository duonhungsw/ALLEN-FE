import { useEffect } from "react";
import { setUser, setError } from "@/providers/auth/reducer/authSlice";
import { getCurrentUser } from "@/shared/api/auth.api";
import { updateUserProfile, uploadAvatar } from "@/shared/api/user.api";
import { isAuthenticated } from "@/shared/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/providers/store";
import { selectAuthUser, selectAuthLoading, selectAuthError } from "@/providers/auth/selector/authSelector";

export const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectAuthUser);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  // Fetch user profile if authenticated but no user data
  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getCurrentUser,
    enabled: isAuthenticated() && !user,
  });

  // Handle profile data success
  useEffect(() => {
    if (profileData?.data) {
      dispatch(setUser(profileData.data));
    }
  }, [profileData, dispatch]);

  // Check authentication status on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasToken = isAuthenticated();
      if (!hasToken && user) {
        // Clear user if no valid tokens
        dispatch(setUser(null as any));
      }
    }
  }, [dispatch, user]);

  return { 
    data: user, 
    loading: loading || isProfileLoading, 
    error 
  };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      if (data?.data) {
        dispatch(setUser(data.data));
      }
    },
    onError: (error) => {
      const errorMessage = (error as any)?.response?.data?.message || "Failed to update profile";
      dispatch(setError(errorMessage));
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      const errorMessage = (error as any)?.response?.data?.message || "Failed to upload avatar";
      console.error("Avatar upload error:", errorMessage);
    },
  });
};
