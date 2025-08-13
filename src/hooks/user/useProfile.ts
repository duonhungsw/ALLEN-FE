import { fetchUserProfile, updateUserProfile } from "@/shared/api/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { parseJwt } from "@/utils/jwt";
import { getStorageData } from "@/shared/store";
import { UserInfo } from "@/providers/auth/types/authType";
import { useHasMounted } from "@/hooks/useHasMounted";

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
  const hasMounted = useHasMounted();
  const token = hasMounted ? getStorageData('accessToken') : null;
  let userId: string | undefined;

  if (token) {
    try {
      const decoded = parseJwt(token);
      userId = decoded?.Id;
    } catch (error) {
      console.error("Error parsing JWT:", error);
    }
  }

  const query = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("UserId is required");
      }
      try {
        const result = await fetchUserProfile(userId);
        return result;
      } catch (error) {
        console.error("API call failed:", error);
        throw error;
      }
    },
    enabled: hasMounted && !!token && !!userId,
    retry: 1,
    retryDelay: 1000,
  });
  return query;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, payload }: { 
      userId: string; 
      payload: Partial<UserInfo> | FormData 
    }) => updateUserProfile(userId, payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profile', variables.userId] });
    },
  });
};
