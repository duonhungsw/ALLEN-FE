"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { toast } from "sonner";
import { parseJwt } from "@/utils/jwt";


const navigation = [
  { name: "Trang chủ", href: "/", icon: Home },
  { name: "Lộ trình học", href: "/course", icon: BookOpen },
  { name: "Luyện nghe", href: "/learning/listening", icon: Headphones },
  { name: "Luyện nói", href: "/learning/speaking", icon: Mic },
  { name: "Luyện đọc", href: "/learning/reading", icon: FileText },
  { name: "Luyện viết", href: "/learning/writing", icon: PenTool },
  { name: "Từ vựng", href: "/learning/vocabulary", icon: Brain },
  { name: "Cộng đồng", href: "/community", icon: Users },
]

interface User {
  id?: string;
  name?: string;
  email?: string;
  picture?: string;
  role?: string;
}

export function Sidebar() {
  const [user, setUser] = useState<User | null>(null);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter();
  const tSidebar = useTranslations("Sidebar");
  const locale = useLocale();
  
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken != null) {
      const rawUserData = parseJwt(accessToken);
  
      const userData: User = {
        id: rawUserData.Id || '',
        name: rawUserData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 'User',
        email: rawUserData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || '',
        picture: rawUserData['Picture'] || '',
        role: rawUserData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || '',
      };
  
      setUser(userData);
    }
  }, []);

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
  
  const currentLang = LANGUAGE_OPTIONS.find(
    (opt) => opt.value === locale
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
      className={cn("bg-slate-900 text-white transition-all duration-300 flex flex-col", collapsed ? "w-[72px]" : "w-64")}
    >
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-teal-400">Allen</h1>
              <p className="text-xs text-slate-400">Learning Platform</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <Image
            src={
              user?.picture && user.picture !== ""
                ? user.picture
                : `https://avatar.vercel.sh/${user?.name ?? "default"}.svg`
            }
            alt={user?.name || "User Avatar"}
            width={40}
            height={40}
            className="w-10 h-10 mx-auto rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md"
          />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-teal-600 text-white text-xs">
                  {user?.email || "N/A"}
                </Badge>
                <span className="text-xs text-slate-400">Level 12</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800",
                      isActive && "bg-teal-600 text-white hover:bg-teal-700",
                      collapsed && "px-2",
                    )}
                  >
                    <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                    {!collapsed && item.name}
                  </Button>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <Link href="/settings">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800",
              collapsed && "px-2",
            )}
          >
            <Settings className={cn("h-5 w-5", !collapsed && "mr-4")} />
            {!collapsed && "Cài đặt"}
          </Button>
        </Link>
        <div className="relative" ref={languageDropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen((v) => !v)}
              className="transition-colors font-bold flex gap-2 items-center px-3 py-2 rounded-md -slate-300 hover:text-white hover:bg-slate-800"
            >
              <Image
                src={currentLang?.flag || "/default-flag.png"}
                alt={currentLang?.lang || "flag"}
                width={16}
                height={16}
                className="inline-block mr-4 "
                style={{ width: "16px", height: "16px" }}
              />
              {!collapsed && currentLang?.lang }
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 bottom-0">
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
  )
}
