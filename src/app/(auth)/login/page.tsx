"use client";

import LoginForm from "@/components/login/LoginForm";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GoogleIcon from "@p/svg/google.svg";
import { useActivateAccount } from "@/hooks/auth/useActiveAccount";
import Image from "next/image";
import { getGoogleLoginUrl } from "@/shared/api/auth.api";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation('common');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-4xl bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden backdrop-blur-sm border border-white/20">
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-12 w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-center relative z-10"
          >
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </motion.div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {t("Welcome-Back")}
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              {t("Sign-into")}
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center space-x-3 text-blue-100">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Secure Authentication</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-blue-100">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-blue-100">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Advanced Features</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
              >
                {t("Login-to-Allen")}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gray-600 dark:text-gray-300"
              >
                Enter your credentials to access your account
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              type="button"
              onClick={handleLoginWithGoogle}
              className="flex cursor-pointer text-gray-700 dark:text-gray-200 items-center justify-center w-full rounded-xl border-2 border-gray-200 dark:border-gray-600 py-3 px-6 font-semibold bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-[1.02] shadow-sm hover:shadow-md mb-6"
            >
              <Image
                src={GoogleIcon}
                alt="Google Icon"
                width={20}
                height={20}
                className="mr-3"
              />
              {t("Continue with Google")}
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="relative my-6"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                  OR
                </span>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <LoginForm />
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-center mt-8 space-y-4"
            >
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t("Chưa có tài khoản?")}{" "}
                <button
                  type="button"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold hover:underline transition-colors"
                  onClick={() => router.push("/register")}
                >
                  {t("Đăng ký")}
                </button>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {t("Khi đăng nhập, bạn đồng ý với")}{" "}
                <a className="underline hover:text-gray-700 dark:hover:text-gray-300 transition-colors" href="#">
                  {t("Điều khoản & Bảo mật")}
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
