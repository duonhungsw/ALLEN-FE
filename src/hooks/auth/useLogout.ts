import { logout } from "@/providers/auth/reducer/authSlice";
import { AppDispatch } from "@/providers/store";
import { logout as logoutApi } from "@/shared/api/auth.api";
import { clearAllAuthData } from "@/shared/store";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Clear Redux state
      dispatch(logout());
      
      // Clear localStorage and cookies
      clearAllAuthData();
      
      // Redirect to login
      router.push("/login");
      
      toast.success("Đăng xuất thành công!");
    },
    onError: (error) => {
      // Even if API call fails, clear local data
      dispatch(logout());
      clearAllAuthData();
      router.push("/login");
      
      console.error("Logout error:", error);
    },
  });
};
