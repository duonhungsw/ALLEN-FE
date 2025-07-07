import { setUser } from "@/providers/auth/reducer/authSlice";
import { AppDispatch } from "@/providers/store";
import { login } from "@/shared/api/auth.api";
import { setStorageData } from "@/shared/store";
import { extractErrorMessage } from "@/utils/ErrorHandle";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { parseJwt } from "@/utils/jwt";

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setStorageData("accessToken", data.accessToken);
      setStorageData("refreshToken", data.refreshToken);
      const userInfo = parseJwt(data.accessToken);
      dispatch(setUser(userInfo));
      setStorageData("user", userInfo);
      toast.success("Đăng nhập thành công!");
      router.push("/");
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
    },
  });
};
