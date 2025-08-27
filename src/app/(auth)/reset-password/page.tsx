"use client";

import { useForm } from "react-hook-form";
import { useResetPassword } from "@/hooks/auth/useChangePass";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = (data: ResetPasswordForm) => {
    resetPassword(
      {
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      },
      {
        onSuccess: () => {
          toast.success(t("resetPassword.success"));
          router.push("/login");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {t("resetPassword.title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("resetPassword.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                  <span className="text-blue-500">✨</span>
                  {t("resetPassword.formTitle")}
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-green-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-2">
                        {t("resetPassword.newPassword")}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Tạo mật khẩu mới an toàn với ít nhất 6 ký tự
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-2">
                        {t("resetPassword.confirmPassword")}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Xác nhận mật khẩu mới để đảm bảo chính xác
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-2">
                        {t("resetPassword.loginWithNewPass")}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Đăng nhập với mật khẩu mới của bạn
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold mb-2">Bảo mật tài khoản</h3>
                <p className="text-blue-100 text-sm">
                  Mật khẩu mới sẽ được mã hóa và bảo vệ an toàn
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <span className="text-blue-500">🔑</span>
                    {t("resetPassword.newPassword")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: t("resetPassword.passwordRequired"),
                        minLength: {
                          value: 6,
                          message: t("resetPassword.passwordMin"),
                        },
                      })}
                      placeholder={t("resetPassword.enterNewPassword")}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <span className="text-xl">🙈</span>
                      ) : (
                        <span className="text-xl">👁️</span>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center gap-2"
                    >
                      <span>⚠️</span>
                      {errors.password.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <span className="text-green-500">✅</span>
                    {t("resetPassword.confirmPassword")}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword", {
                        required: t("resetPassword.confirmRequired"),
                        validate: (value) =>
                          value === password || t("resetPassword.confirmNotMatch"),
                      })}
                      placeholder={t("resetPassword.reEnterPassword")}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-400 transition-all duration-200 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showConfirmPassword ? (
                        <span className="text-xl">🙈</span>
                      ) : (
                        <span className="text-xl">👁️</span>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-500 flex items-center gap-2"
                    >
                      <span>⚠️</span>
                      {errors.confirmPassword.message}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isPending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg disabled:shadow-none"
                >
                  {isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {t("resetPassword.submitting")}
                    </>
                  ) : (
                    <>
                      <span>🔐</span>
                      {t("resetPassword.submit")}
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  {t("resetPassword.remember")}{" "}
                  <Link
                    href="/login"
                    className="text-blue-500 hover:text-blue-600 font-medium underline hover:no-underline transition-all duration-200"
                  >
                    {t("resetPassword.login")}
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
