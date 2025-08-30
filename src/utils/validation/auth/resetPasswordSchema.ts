import * as z from "zod";
import { useTranslations } from "next-intl";

export const useResetPasswordSchema = () => {
  const t = useTranslations("validation");

  return z
    .object({
      newPassword: z
        .string()
        .min(6, t("passwordMin"))
        .max(50, t("passwordMax")),
      confirmPassword: z.string().min(1, t("confirmRequired")),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("passwordMismatch"),
      path: ["confirmPassword"],
    });
};

export type ResetPasswordFormData = z.infer<
  ReturnType<typeof useResetPasswordSchema>
>;
