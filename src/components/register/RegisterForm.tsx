"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  registerSchema,
  RegisterFormValues,
} from "@/utils/validation/auth/registerSchema";
import { useRegister } from "@/hooks/auth/useRegister";

export default function RegisterForm() {
  const router = useRouter();
  const { mutate, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    mutate(values, {
      onSuccess() {
        router.replace("/login");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4"
    >
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tên
        </label>
        <input
          {...register("name")}
          className="w-full px-4 py-3 border-1 border-[#F5F5DC] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-[#F5F5DC] text-gray-900 placeholder-gray-500"
          placeholder="Nhập tên của bạn"
        />
        {errors.name && (
          <div className="mt-1 text-sm text-red-500 dark:text-red-400">
            {errors.name.message}
          </div>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          className="w-full px-4 py-3 border-1 border-[#F5F5DC] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-[#F5F5DC] text-gray-900 placeholder-gray-500"
          placeholder="Nhập email của bạn"
        />
        {errors.email && (
          <div className="mt-1 text-sm text-red-500 dark:text-red-400">
            {errors.email.message}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Mật khẩu
        </label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-3 border-1 border-[#F5F5DC] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-[#F5F5DC] text-gray-900 placeholder-gray-500 pr-12"
            placeholder="Nhập mật khẩu"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors z-10 cursor-pointer"
          >
            {!showPassword ? (
              <svg
                className="h-5 w-5 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <div className="mt-1 text-sm text-red-500 dark:text-red-400">
            {errors.password.message}
          </div>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Xác nhận mật khẩu
        </label>
        <div className="relative">
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            className="w-full px-4 py-3 border-1 border-[#F5F5DC] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-[#F5F5DC] text-gray-900 placeholder-gray-500 pr-12"
            placeholder="Nhập lại mật khẩu"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors z-10 cursor-pointer"
          >
            {!showConfirmPassword ? (
              <svg
                className="h-5 w-5 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <div className="mt-1 text-sm text-red-500 dark:text-red-400">
            {errors.confirmPassword.message}
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-6 bg-[#48c0f8] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
      >
        {isPending ? "Đang đăng ký..." : "Đăng ký"}
      </button>
    </form>
  );
}
