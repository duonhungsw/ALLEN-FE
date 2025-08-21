"use client";

import { useChangePass } from "@/hooks/auth/useChangePass";
import { useForm } from "react-hook-form";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const ChangePassForm = () => {
  const { mutate: changePassword, isPending } = useChangePass();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    changePassword(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            🔐 Security Settings
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Keep your account safe by updating your password regularly
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2 cursor-pointer">
                <span className="text-blue-500">🔒</span>
                Change Password
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="text-blue-500">🔑</span>
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your current password"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-400"
                    {...register("currentPassword", {
                      required: "Please input your current password!",
                    })}
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="text-blue-500">🆕</span>
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your new password"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-400"
                    {...register("newPassword", {
                      required: "Please input your new password!",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters!",
                      },
                    })}
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.newPassword.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span>💡</span>
                    Minimum 6 characters required
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="text-blue-500">✅</span>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm your new password"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder:text-gray-400"
                    {...register("confirmNewPassword", {
                      required: "Please confirm your new password!",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match!",
                    })}
                  />
                  {errors.confirmNewPassword && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span>⚠️</span>
                      {errors.confirmNewPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isPending}
                className="w-full px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isPending ? "⏳" : "🔒"}</span>
                {isPending ? "Changing Password..." : "Change Password"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassForm;
