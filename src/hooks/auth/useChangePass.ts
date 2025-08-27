import { changePassword, forgotPassword, resetPassword} from '@/shared/api/auth.api';
import { extractErrorMessage } from '@/utils/ErrorHandle';
import { useMutation } from '@tanstack/react-query';
import { toast } from "sonner";

export const useChangePass = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success('Password reset link has been sent to your email');
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Password has been reset successfully');
    },
    onError: (error) => {
      const msg = extractErrorMessage(error);
      toast.error(msg);
    },
  });
};
