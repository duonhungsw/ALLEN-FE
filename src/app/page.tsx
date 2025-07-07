"use client";

import { useProfile } from "@/hooks/auth/useProfile";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/providers/store";
import { logout } from "@/providers/auth/reducer/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const { data: user, formatted } = useProfile();
  console.log("user1111", user);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900 flex items-center justify-center p-4">
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
              user?.avatarUrl ||
              `https://avatar.vercel.sh/${user?.username}.svg`
            }
            alt={formatted?.name || "User Avatar"}
            width={96}
            height={96}
            className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Hello world,{" "}
          <span className="text-blue-600 dark:text-blue-400">
            {formatted?.name || "Users111"}
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          I great to see you again. Le get learning!
        </p>
        <button
          onClick={handleLogout}
          className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Logout
        </button>
      </motion.div>
    </div>
  );
}
