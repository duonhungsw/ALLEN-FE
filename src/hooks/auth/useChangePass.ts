import { changePassword } from '@/shared/api/auth.api';
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
