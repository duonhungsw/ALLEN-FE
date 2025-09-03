"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  registerSchema,
  RegisterFormValues,
} from "@/utils/validation/auth/registerSchema";
import { useRegister } from "@/hooks/auth/useRegister";

export default function RegisterForm() {
  const router = useRouter();
  const { mutate, isPending } = useRegister();
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
        <input
          {...register("password")}
          type="password"
          className="w-full px-4 py-3 border-1 border-[#F5F5DC] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-[#F5F5DC] text-gray-900 placeholder-gray-500"
          placeholder="Nhập mật khẩu"
        />
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
        <input
          {...register("confirmPassword")}
          type="password"
          className="w-full px-4 py-3 border-1 border-[#F5F5DC] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-[#F5F5DC] text-gray-900 placeholder-gray-500"
          placeholder="Nhập lại mật khẩu"
        />
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
