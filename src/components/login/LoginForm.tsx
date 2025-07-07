"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginFormValues,
} from "@/utils/validation/auth/loginSchema";
import { useLogin } from "@/hooks/auth/useLogin";

export default function LoginForm() {
  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto space-y-4"
    >
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
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded font-bold"
        disabled={isPending}
      >
        {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
