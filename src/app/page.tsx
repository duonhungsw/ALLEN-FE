"use client";

import { useProfile } from "@/hooks/auth/useProfile";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export default function Home() {
  const { data: user, isLoading, error } = useProfile();
  const { customColors } = useTheme();

  if (isLoading) {
    return (
      <div className={`relative min-h-screen w-full ${customColors.bodyBg} flex items-center justify-center p-4 transition-colors duration-500`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`relative min-h-screen w-full ${customColors.bodyBg} flex items-center justify-center p-4 transition-colors duration-500`}>
        <div className="text-center text-red-600">
          <p>Có lỗi xảy ra khi tải thông tin user</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-screen w-full ${customColors.bodyBg} flex items-center justify-center p-4 transition-colors duration-500`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-5 dark:opacity-20"></div>

      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 text-center bg-white/70 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl"
      >
        <div className="mb-6">
          <Image
            src={
              user?.picture && user.picture !== ""
                ? user.picture
                : `https://avatar.vercel.sh/${user?.name ?? "default"}.svg`
            }
            alt={user?.name || "User Avatar"}
            width={96}
            height={96}
            className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Xin chào,{" "}
          <span className="text-blue-600 dark:text-blue-400">
            {user?.name || "User"}
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Email: {user?.email || "N/A"}
        </p>
        {user?.phone && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Số điện thoại: {user.phone}
          </p>
        )}
        {user?.birthDay && (
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Ngày sinh: {user.birthDay}
          </p>
        )}
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Rất vui được gặp lại bạn. Hãy tiếp tục học tập!
        </p>
      </motion.div>
    </div>
  );
}
