"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { logout } from "@/providers/auth/reducer/authSlice";
import { clearAllAuthData } from "@/shared/store/index";
import { useTranslation } from "react-i18next";
import { LANGUAGE_OPTIONS } from "@/configs/i18n";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import { useHasMounted } from "@/hooks/useHasMounted";
import { getCookie } from "@/utils/cookies";
import { parseJwt } from "@/utils/jwt";
import Image from "next/image";
import DarkModeToggle from "./Darkmode";

const JWT_CLAIMS = {
  EMAIL: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  NAME: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
  ROLE: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
} as const;

interface UserClaims {
  Id: string;
  Picture: string;
  aud: string;
  exp: number;
  iss: string;
  [JWT_CLAIMS.EMAIL]: string;
  [JWT_CLAIMS.NAME]: string;
  [JWT_CLAIMS.ROLE]: string;
  [key: string]: unknown;
}

export default function Navbar() {
  const hasMounted = useHasMounted();
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");
  const user: UserClaims | null = accessToken ? parseJwt(accessToken) : null;
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  const currentLang = LANGUAGE_OPTIONS.find(
    (opt) => opt.value === i18n.language
  );

  const languageDropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    }
    if (isLanguageDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

  if (!hasMounted) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getUserName = (user: UserClaims | null): string => {
    if (!user) return "User";
    return user[JWT_CLAIMS.NAME] || "User";
  };

  const getUserEmail = (user: UserClaims | null): string => {
    if (!user) return "";
    return user[JWT_CLAIMS.EMAIL] || "";
  };

  const getUserRole = (user: UserClaims | null): string => {
    if (!user) return "";
    return user[JWT_CLAIMS.ROLE] || "";
  };

  const userName = getUserName(user);
  const userEmail = getUserEmail(user);
  const userRole = getUserRole(user);

  const handleLogout = () => {
    dispatch(logout());
    clearAllAuthData();
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
          <Link
            href={path}
            className={`transition-colors font-bold px-3 py-2 rounded-md ${
              pathname === path
                ? "text-yellow-300"
                : "text-white hover:text-gray-300"
            }`}
          >
            {path === "/login" ? t("Đăng nhập") : t("Đăng ký")}
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
            className="hover:text-yellow-300 transition-colors font-bold text-white flex items-center px-3 py-2 rounded-md gap-2"
          >
            <motion.span transition={{ duration: 0.2 }} className="ml-1">
              👤
            </motion.span>
            {userName}
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
            <button className="cursor-pointer" onClick={() => router.push("/")}>
              <span className="font-semibold text-2xl">Allen</span>
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
          <div className="relative" ref={languageDropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen((v) => !v)}
              className="hover:text-yellow-300 transition-colors font-bold text-white flex items-center px-3 py-2 rounded-md"
            >
              <Image
                src={currentLang?.flag || "/default-flag.png"}
                alt={currentLang?.lang || "flag"}
                width={24}
                height={24}
                className="inline-block mr-2 "
                style={{ width: "24px", height: "24px" }}
              />
              {LANGUAGE_OPTIONS.find((opt) => opt.value === i18n.language)
                ?.lang || "Tiếng Việt"}
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                {LANGUAGE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleChangeLanguage(option.value)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Image
                      src={option.flag}
                      alt={option.lang}
                      width={24}
                      height={24}
                      className="inline-block mr-2"
                    />
                    {option.lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <DarkModeToggle />
          </motion.div>

          {user ? renderHeader() : renderHeaderLogin()}
        </nav>
      </header>

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
