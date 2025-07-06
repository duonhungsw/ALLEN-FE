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
      className="max-w-sm mx-auto space-y-4"
    >
      <div>
        <label className="block mb-1 font-bold">Tên</label>
        <input
          {...register("name")}
          className="border px-3 py-2 rounded w-full"
          placeholder="Nhập tên"
        />
        {errors.name && (
          <div className="text-red-500 text-sm">{errors.name.message}</div>
        )}
      </div>
      <div>
        <label className="block mb-1 font-bold">Email</label>
        <input
          {...register("email")}
          className="border px-3 py-2 rounded w-full"
          placeholder="Nhập email"
        />
        {errors.email && (
          <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}
      </div>
      <div>
        <label className="block mb-1 font-bold">Mật khẩu</label>
        <input
          {...register("password")}
          type="password"
          className="border px-3 py-2 rounded w-full"
          placeholder="Nhập mật khẩu"
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password.message}</div>
        )}
      </div>
      <div>
        <label className="block mb-1 font-bold">Xác nhận mật khẩu</label>
        <input
          {...register("confirmPassword")}
          type="password"
          className="border px-3 py-2 rounded w-full"
          placeholder="Nhập lại mật khẩu"
        />
        {errors.confirmPassword && (
          <div className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-green-600 text-white rounded font-bold"
        disabled={isPending}
      >
        {isPending ? "Đang đăng ký..." : "Đăng ký"}
      </button>
    </form>
  );
}
