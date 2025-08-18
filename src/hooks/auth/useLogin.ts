import { setUser } from "@/providers/auth/reducer/authSlice";
import { AppDispatch } from "@/providers/store";
import { login } from "@/shared/api/auth.api";
import { setCookie } from "@/utils/cookies";
import { extractErrorMessage } from "@/utils/ErrorHandle";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { parseJwt } from "@/utils/jwt";
import { setStorageData } from "@/shared/store";

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      const { remember, email, password } = variables;
      const userInfo = parseJwt(data.accessToken);
      setStorageData('accessToken', data.accessToken);

      if (remember) {
        setCookie("accessToken", data.accessToken, 30);
        setCookie("refreshToken", data.refreshToken, 30);
        setCookie("user", JSON.stringify(userInfo), 30);
        setCookie("rememberMe", "true", 30);
        setCookie("rememberedEmail", email, 30);
        setCookie("rememberedPassword", password, 30);
      } else {
        setCookie("accessToken", data.accessToken);
        setCookie("refreshToken", data.refreshToken);
        setCookie("user", JSON.stringify(userInfo));
        setCookie("rememberMe", "false");
        setCookie("rememberedEmail", "");
        setCookie("rememberedPassword", "");
      }

      dispatch(setUser(userInfo));
      toast.success("Đăng nhập thành công!");
      router.push("/");
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
    },
  });
};
