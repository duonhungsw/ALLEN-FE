"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  BookOpen,
  Headphones,
  Mic,
  FileText,
  PenTool,
  Brain,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { useProfile } from "@/hooks/auth/useProfile";

const navigation = [
  { name: "Trang chủ", href: "/", icon: Home },
  { name: "Lộ trình học", href: "/learning/course", icon: BookOpen },
  { name: "Luyện nghe", href: "/learning/listening", icon: Headphones },
  { name: "Luyện nói", href: "/learning/speaking", icon: Mic },
  { name: "Luyện đọc", href: "/learning/reading", icon: FileText },
  { name: "Luyện viết", href: "/learning/writing", icon: PenTool },
  { name: "Từ vựng", href: "/learning/vocabulary", icon: Brain },
  { name: "Cộng đồng", href: "/community", icon: Users },
];

export function Sidebar() {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const tSidebar = useTranslations("Sidebar");
  const locale = useLocale();
  const { data: user, isLoading } = useProfile();

  const LANGUAGE_OPTIONS = [
    {
      value: "vi",
      lang: tSidebar("vietnam"),
      flag: "/svg/VietnamFlag.svg",
    },
    {
      value: "en",
      lang: tSidebar("english"),
      flag: "/svg/EnglandFlag.svg",
    },
  ];

  const currentLang = LANGUAGE_OPTIONS.find((opt) => opt.value === locale);

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

  const handleChangeLanguage = (lang: string) => {
    document.cookie = `locale=${lang}`;
    router.refresh();
    setIsLanguageDropdownOpen(false);
    const languageName = LANGUAGE_OPTIONS.find(
      (option) => option.value === lang
    )?.lang;
    toast.info(`${tSidebar("languageChanged")} ${languageName}`);
  };

  return (
    <div
      className={cn(
        "text-white transition-all duration-300 flex flex-col",
        collapsed ? "w-[72px]" : "w-75"
      )}
      style={{ backgroundColor: "#142F50" }}
    >
      <div className="p-4 border-b" style={{ borderColor: "#1e3a5f" }}>
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold" style={{ color: "#F3713B" }}>
                Allen
              </h1>
              <p className="text-xs text-gray-300">Learning Platform</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-300 hover:text-white hover:bg-gray-600"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="p-4 border-b" style={{ borderColor: "#1e3a5f" }}>
        <div className="flex items-center space-x-3 gap-3">
          {isLoading ? (
            <div className="w-10 h-10 bg-gray-600 rounded-full animate-pulse"></div>
          ) : (
            <Image
              src={
                user?.picture && user.picture !== ""
                  ? user.picture
                  : `https://avatar.vercel.sh/${user?.name ?? "default"}.svg`
              }
              alt={user?.name || "User Avatar"}
              width={40}
              height={40}
              className="w-10 h-10 mx-auto rounded-full object-cover border-2 border-gray-300 shadow-md"
            />
          )}
          {!collapsed && (
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <div className="space-y-2">
                  <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-600 rounded animate-pulse w-3/4"></div>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium truncate text-white">
                    {user?.name || "User"}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className="text-white text-xs"
                      style={{ backgroundColor: "#F3713B" }}
                    >
                      {user?.email || "N/A"}
                    </Badge>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-roboto text-base font-normal leading-5 text-white hover:text-white hover:bg-gray-600 relative",
                      isActive && "text-white hover:text-white",
                      collapsed && "px-2"
                    )}
                    style={isActive ? { backgroundColor: "#1e3a5f" } : {}}
                  >
                    {isActive && (
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{ backgroundColor: "#F3713B" }}
                      />
                    )}
                    <Icon
                      className={cn(
                        "h- w-6 text-[18px",
                        !collapsed && "mr-3 text-[18px] font-semibold"
                      )}
                    />
                    {!collapsed && item.name}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t" style={{ borderColor: "#1e3a5f" }}>
        <Link href="/settings">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-white hover:text-white hover:bg-gray-600",
              collapsed && "px-2"
            )}
          >
            <Settings className={cn("h-5 w-5", !collapsed && "mr-4")} />
            {!collapsed && "Cài đặt"}
          </Button>
        </Link>
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={() => setIsLanguageDropdownOpen((v) => !v)}
            className="transition-colors font-bold flex gap-2 items-center px-3 py-2 rounded-md text-white hover:text-white hover:bg-gray-600"
          >
            <Image
              src={currentLang?.flag || "/default-flag.png"}
              alt={currentLang?.lang || "flag"}
              width={16}
              height={16}
              className="inline-block mr-4 "
              style={{ width: "16px", height: "16px" }}
            />
            {!collapsed && currentLang?.lang}
          </button>
          {isLanguageDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 bottom-0 border"
              style={{ borderColor: "#E5E7EB" }}
            >
              {LANGUAGE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChangeLanguage(option.value)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <Image
                    src={option.flag}
                    alt={option.lang}
                    width={16}
                    height={16}
                    className="inline-block mr-2"
                  />
                  {option.lang}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
