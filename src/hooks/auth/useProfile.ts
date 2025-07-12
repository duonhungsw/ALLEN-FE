import { useEffect, useState } from "react";
import { setUser } from "@/providers/auth/reducer/authSlice";
import { updateUserProfile, uploadAvatar } from "@/shared/api/user.api";
import { getCookie } from "@/utils/cookies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/providers/store";
import { parseJwt } from "@/utils/jwt";

const JWT_CLAIMS = {
  EMAIL: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  NAME: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
  ROLE: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
} as const;
export interface UserClaims {
  Id: string;
  Picture: string;
  aud: string;
  exp: number;
  iss: string;
  [JWT_CLAIMS.EMAIL]: string;
  [JWT_CLAIMS.NAME]: string;
  [JWT_CLAIMS.ROLE]: string;
  [key: string]: unknown;
}
export interface FormattedUser {
  email: string;
  name: string;
  role: string;
}

export function formatUserClaims(user: UserClaims): FormattedUser {
  return {
    email: user[JWT_CLAIMS.EMAIL] || "",
    name: user[JWT_CLAIMS.NAME] || "",
    role: user[JWT_CLAIMS.ROLE] || "",
  };
}

export const useProfile = () => {
  const [user, setUser] = useState<UserClaims | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = getCookie("accessToken");
      if (accessToken) {
        try {
          const userInfo = parseJwt(accessToken) as UserClaims;
          setUser(userInfo);
        } catch (error) {
          console.error("Failed to parse access token:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
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
