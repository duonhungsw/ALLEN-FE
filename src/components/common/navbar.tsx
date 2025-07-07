"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { logout } from "@/providers/auth/reducer/authSlice";
import { removeStorageData } from "@/shared/store";
import { useTranslation } from "react-i18next";
import { LANGUAGE_OPTIONS } from "@/configs/i18n";
import { toast } from "sonner";
import { useState } from "react";
import { useHasMounted } from "@/hooks/useHasMounted";
import { getStorageData } from "@/shared/store";
import { parseJwt } from "@/utils/jwt";

const DarkModeToggle = () => (
  <button className="hover:text-yellow-300 transition-colors font-bold text-white px-3 py-2 rounded-md">
    🌙
  </button>
);

export default function Navbar() {
  const hasMounted = useHasMounted();
  const dispatch = useDispatch();
  const accessToken = getStorageData("accessToken");
  const user = accessToken ? parseJwt(accessToken) : null;

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  console.log("user", user);

  if (!hasMounted) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const userAny = user as any;
  const userName =
    userAny?.name ||
    userAny?.username ||
    userAny?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
    "User";

  const userEmail =
    userAny?.email ||
    userAny?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ] ||
    "";

  const userRole =
    userAny?.role ||
    userAny?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
    "";

  const handleLogout = () => {
    dispatch(logout());
    removeStorageData("accessToken");
    removeStorageData("refreshToken");
    toast.success("Đăng xuất thành công!");
    router.push("/login");
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsLanguageDropdownOpen(false);
    const languageName = LANGUAGE_OPTIONS.find(
      (option) => option.value === lang
    )?.lang;
    toast.info(`Đã chuyển sang ${languageName}`);
  };

  const renderHeaderLogin = () => (
    <>
      {["/login", "/register"].map((path) => (
        <motion.div
          key={path}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href={path}>
            <button
              className={`transition-colors font-bold px-3 py-2 rounded-md ${
                pathname === path
                  ? "text-yellow-300"
                  : "text-white hover:text-gray-300"
              }`}
            >
              {path === "/login" ? t("Đăng nhập") : t("Đăng ký")}
            </button>
          </Link>
        </motion.div>
      ))}
    </>
  );

  const renderHeader = () => {
    return (
      <div className="relative">
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="hover:text-yellow-300 transition-colors font-bold text-white flex items-center px-3 py-2 rounded-md"
          >
            {userName}
            <motion.span transition={{ duration: 0.2 }} className="ml-1">
              👤
            </motion.span>
          </button>
        </motion.div>

        {isUserDropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
            <div className="px-4 py-2 border-b border-gray-200">
              <div className="font-bold text-gray-800">{userName}</div>
              {userEmail && (
                <div className="text-xs text-gray-500">{userEmail}</div>
              )}
              {userRole && (
                <div className="text-xs text-gray-400 italic">{userRole}</div>
              )}
            </div>
            <Link href="/profile">
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {t("Hồ sơ")}
              </button>
            </Link>
            {userRole === "instructor" && (
              <Link href="/instructor">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {t("Giảng viên")}
                </button>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {t("Đăng xuất")}
            </button>
          </div>
        )}
      </div>
    );
  };

  const navLinks = [{ href: "/", label: t("Trang chủ") }];

  return (
    <div>
      <header className="bg-gradient-to-l bg-[#0A092D] text-white px-8 py-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-3 mt-4">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className="flex"
          >
            <span role="img" aria-label="music">
              <div
                onClick={() => router.push("/")}
                className="w-10 h-10 cursor-pointer bg-blue-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">A</span>
              </div>
            </span>
            <button className="cursor-pointer" onClick={() => router.push("/")}>
              <span className="font-semibold text-2xl">Allen Courses</span>
            </button>
          </motion.div>
        </div>

        <nav className="flex items-center space-x-6 mt-4">
          {navLinks.map(({ href, label }) => (
            <motion.div
              key={href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={href}>
                <button
                  className={`transition-colors font-bold px-3 py-2 rounded-md ${
                    pathname === href || pathname.startsWith(href + "/")
                      ? "text-blue-500 font-bold"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  {label}
                </button>
              </Link>
            </motion.div>
          ))}

          {/* Language Dropdown */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <div className="relative">
              <button
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="hover:text-yellow-300 transition-colors font-bold text-white flex items-center px-3 py-2 rounded-md"
              >
                🌐
                {LANGUAGE_OPTIONS.find((opt) => opt.value === i18n.language)
                  ?.lang || "Tiếng Việt"}
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {LANGUAGE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleChangeLanguage(option.value)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {option.lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <DarkModeToggle />
          </motion.div>

          {user ? renderHeader() : renderHeaderLogin()}
        </nav>
      </header>

      {/* Click outside to close dropdowns */}
      {(isUserDropdownOpen || isLanguageDropdownOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsUserDropdownOpen(false);
            setIsLanguageDropdownOpen(false);
          }}
        />
      )}
    </div>
  );
}
