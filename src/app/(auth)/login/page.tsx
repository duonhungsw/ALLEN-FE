"use client";

import LoginForm from "@/components/login/LoginForm";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GoogleIcon from "@p/svg/google.svg";
import { useActivateAccount } from "@/hooks/auth/useActiveAccount";
import Image from "next/image";
import { getGoogleLoginUrl } from "@/shared/api/auth.api";

export default function LoginPage() {
  const router = useRouter();
  const { mutate: activateAccount } = useActivateAccount();

  const handleLoginWithGoogle = () => {
    const googleLoginUrl = getGoogleLoginUrl();
    window.location.href = googleLoginUrl;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const activateToken = searchParams.get("activateToken");
    if (activateToken) {
      activateAccount(activateToken);
      router.replace("/login");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 p-4">
      <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-800/90 rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 to-cyan-400 dark:from-blue-700 dark:to-cyan-700 p-8 w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-center"
          >
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-lg">Sign in to continue to the platform</p>
          </motion.div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center p-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white mb-6">
              Đăng nhập vào Allen
            </h2>
            <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="flex cursor-pointer text-black items-center justify-center w-full rounded-3xl border-2 border-gray-300 py-4 px-8 font-semibold bg-white hover:bg-gray-100 transition"
            >
              <Image
                src={GoogleIcon}
                alt="Google Icon"
                width={20}
                height={20}
                className="mr-2"
              />
              Using Google account
            </button>
            <div className="my-4 text-center text-gray-400 font-semibold">
              OR
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <LoginForm />
              </motion.div>
            </AnimatePresence>
            <div className="text-center text-sm text-gray-500 mt-4">
              Chưa có tài khoản?
              <button
                type="button"
                className="text-blue-500 hover:underline hover:decoration-blue-500 p-1 bg-transparent font-semibold"
                onClick={() => router.push("/register")}
              >
                Đăng ký
              </button>
            </div>
            <div className="text-center text-xs text-gray-400 mt-2">
              Khi đăng nhập, bạn đồng ý với
              <a className="underline ml-1" href="#">
                Điều khoản & Bảo mật
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
