"use client";

import {
  validateEmail,
  validatePassword,
} from "@/utils/validation/validationUtils";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginPayload } from "@/shared/api/auth.api";

export const LoginForm = () => {
  const { mutate, isPending } = useLogin();
  const router = useRouter();
  const [form, setForm] = useState<LoginPayload>({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [submitError, setSubmitError] = useState("");
  const [remember, setRemember] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setSubmitError("");
    mutate(form, {
      onSuccess() {
        router.replace("/");
      },
    });
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <form
      className="space-y-6 w-full max-w-md mx-auto"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div>
        <label className="block text-sm font-bold mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="your@email.com"
          disabled={isPending}
        />
        {errors.email && (
          <div className="text-red-500 text-xs mt-1">{errors.email}</div>
        )}
      </div>
      <div>
        <label className="block text-sm font-bold mb-1" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
          disabled={isPending}
        />
        {errors.password && (
          <div className="text-red-500 text-xs mt-1">{errors.password}</div>
        )}
      </div>
      <div className="flex justify-between items-center mb-2">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="mr-2"
            disabled={isPending}
          />
          Remember me
        </label>
        <button
          type="button"
          className="text-sm text-blue-500 hover:underline"
          onClick={handleForgotPassword}
          disabled={isPending}
        >
          Forgot password?
        </button>
      </div>
      {submitError && (
        <div className="text-red-600 text-center text-sm mb-2">
          {submitError}
        </div>
      )}
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition duration-200 shadow-md hover:shadow-lg disabled:opacity-60"
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};
