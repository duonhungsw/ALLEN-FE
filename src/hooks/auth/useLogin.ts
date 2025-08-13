import { loginSuccess, setLoading, setError } from "@/providers/auth/reducer/authSlice";
import { AppDispatch } from "@/providers/store";
import { login } from "@/shared/api/auth.api";
import { setAccessToken, setRefreshToken, setUserInfo } from "@/shared/store";
import { extractErrorMessage } from "@/utils/ErrorHandle";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onMutate: () => {
      dispatch(setLoading(true));
      dispatch(setError(null));
    },
    onSuccess: (data, variables) => {
      const { remember } = variables;
      const { user, tokens } = data.data;

      // Store tokens in localStorage
      setAccessToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
      setUserInfo(user);

      // Store in Redux
      dispatch(loginSuccess(data.data));

      // Set cookies for remember me functionality
      if (remember) {
        // You can add cookie logic here if needed
      }

      toast.success("Đăng nhập thành công!");
      router.push("/");
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      dispatch(setError(msg));
      toast.error(msg);
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
  });
};
