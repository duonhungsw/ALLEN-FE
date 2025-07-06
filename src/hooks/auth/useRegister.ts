import { register } from "@/shared/api/auth.api";
import { extractErrorMessage } from "@/utils/ErrorHandle";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Đăng ký thành công!");
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
    },
  });
};
