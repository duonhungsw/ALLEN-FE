import { updateUserProfile  ,fetchUserProfile } from "@/shared/api/user.api";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getStorageData } from "@/shared/store";
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
  
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchUserProfile,
    enabled: hasMounted && !!getStorageData('accessToken'),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

