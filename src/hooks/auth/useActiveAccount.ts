import { getActivateAccount } from "@/shared/api/auth.api";
import { extractErrorMessage } from "@/utils/ErrorHandle";
import { useMutation } from "@tanstack/react-query";

export const useActivateAccount = () => {
  return useMutation({
    mutationFn: getActivateAccount,
    onSuccess: () => {
      // message.success("Account activated successfully");
    },
    onError: (error) => {
      const message: string = extractErrorMessage(error);
      // You can replace this with a UI notification if desired
      console.error("Account activation failed:", message);
    },
  });
};
