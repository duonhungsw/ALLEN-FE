"use client";

import RegisterForm from "@/components/register/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-500 dark:from-blue-900 dark:via-gray-900 dark:to-blue-800 p-4">
      <div className="w-full max-w-lg bg-white/95 dark:bg-blue-950/90 rounded-3xl shadow-2xl flex flex-col items-center p-0 sm:p-8 border border-blue-200 dark:border-blue-800">
        <div className="flex flex-col items-center w-full pt-8 pb-4">
          <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-4 mb-4 shadow-md">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
              <path
                fill="#2563eb"
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4Z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-center text-blue-700 dark:text-blue-300 mb-1 tracking-tight">
            Đăng ký tài khoản mới
          </h1>
          <p className="text-center text-blue-500 dark:text-blue-200 mb-6 text-base">
            Hãy điền đầy đủ thông tin để tham gia Allen
          </p>
        </div>
        <div className="w-full px-0 sm:px-8 pb-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
