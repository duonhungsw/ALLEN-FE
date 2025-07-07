import { useEffect, useState } from "react";
import { setUser } from "@/providers/auth/reducer/authSlice";
import { updateUserProfile, uploadAvatar } from "@/shared/api/user.api";
import { getStorageData } from "@/shared/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/providers/store";
import { parseJwt } from "@/utils/jwt";

export function formatUserClaims(user: Record<string, any>) {
  return {
    email: user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || "",
    name: user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "",
    role: user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || "",
  };
}

export const useProfile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = getStorageData("accessToken");
      setUser(accessToken ? parseJwt(accessToken) : null);
    }
  }, []);

  const formatted = user ? formatUserClaims(user) : null;
  return { data: user, formatted };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      dispatch(setUser(data));
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
  });
};
