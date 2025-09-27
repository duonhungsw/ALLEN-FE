"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ChevronLeft,
    ChevronRight,
    LogOut,
    Circle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useProfile } from "@/hooks/auth/useProfile";
import { useLogout } from "@/hooks/auth/useLogin";

const adminNavigation: Array<{
    name: string;
    href: string;
    icon: any;
    iconPath?: string;
}> = [
        { name: "Người dùng", href: "/admin/users", icon: "svg", iconPath: "/svg/user.png" },
        { name: "Category", href: "/admin/category", icon: "svg", iconPath: "/svg/categories.png" },
        { name: "Topic", href: "/admin/topic", icon: "svg", iconPath: "/svg/topic.png" },
        { name: "Thông báo", href: "/admin/notifications", icon: "svg", iconPath: "/svg/bell.png" },
        { name: "Cài đặt", href: "/admin/settings", icon: "svg", iconPath: "/svg/Setting.svg" },
    ];

const skillNavigation: Array<{
    name: string;
    href: string;
    icon: any;
    iconPath?: string;
}> = [
        { name: "Speaking", href: "/admin/skills/speaking", icon: "svg", iconPath: "/svg/mic.png" },
        { name: "Listening", href: "/admin/skills/listening", icon: "svg", iconPath: "/svg/headphone.png" },
        { name: "Writing", href: "/admin/skills/writing", icon: "svg", iconPath: "/svg/writing_language.png" },
        { name: "Reading", href: "/admin/skills/reading", icon: "svg", iconPath: "/svg/book.png" },
    ];

export default function AdminSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const { data: user, isLoading } = useProfile();

    const { mutate: doLogout, isPending } = useLogout();

    return (
        <div
            className={cn(
                "text-white transition-all duration-300 flex flex-col",
                collapsed ? "w-[72px]" : "w-70"
            )}
            style={{ backgroundColor: "#142F50" }}
        >
            <div className="p-4 border-b" style={{ borderColor: "#1e3a5f" }}>
                <div className="flex items-center justify-between">
                    {!collapsed && (
                        <div>
                            <h1 className="text-lg font-bold font-calistoga-regular" style={{ color: "#F3713B" }}>
                                Allen Admin
                            </h1>
                            <p className="text-xs text-gray-300 font-calistoga-regular">Admin Panel</p>
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
                    <div className="relative w-10 h-10">
                        {isLoading ? (
                            <div className="w-10 h-10 bg-gray-600 rounded-full animate-pulse"></div>
                        ) : (
                            <Image
                                src={
                                    user?.picture && user.picture !== ""
                                        ? user.picture
                                        : `https://avatar.vercel.sh/${user?.name ?? "admin"}.svg`
                                }
                                alt={user?.name || "Admin Avatar"}
                                width={40}
                                height={40}
                                className="w-10 h-10 mx-auto rounded-full object-cover border-2 border-gray-300 shadow-md"
                            />
                        )}

                        <Circle
                            className="absolute bottom-0 right-0  w-2.5 h-2.5 text-green-500 bg-white rounded-full"
                            strokeWidth={2}
                            stroke="white"
                            fill="currentColor"
                        />
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            {isLoading ? (
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                                    <div className="h-3 bg-gray-600 rounded animate-pulse w-3/4"></div>
                                </div>
                            ) : (
                                <>
                                    <p className="text-sm font-medium truncate text-white font-calistoga-regular">
                                        {user?.name || "Admin"}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <Badge
                                            variant="secondary"
                                            className="text-white text-xs font-calistoga-regular"
                                            style={{ backgroundColor: "#F3713B" }}
                                        >
                                            Admin
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
                    {adminNavigation.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.name}>
                                <Link href={item.href}>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start font-calistoga-regular text-base leading-5 text-white hover:text-white hover:bg-gray-600 relative",
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
                                        {item.icon === "svg" ? (
                                            <Image
                                                src={item.iconPath || ""}
                                                alt={item.name}
                                                width={collapsed ? 28 : 24}
                                                height={collapsed ? 28 : 24}
                                                className={cn(
                                                    "text-white",
                                                    !collapsed && "mr-3"
                                                )}
                                            />
                                        ) : (
                                            <item.icon
                                                className={cn(
                                                    "h-6 w-6",
                                                    !collapsed && "mr-3"
                                                )}
                                            />
                                        )}
                                        {!collapsed && <span className="font-calistoga-regular">{item.name}</span>}
                                    </Button>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {!collapsed && (
                    <div className="mt-6">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2 font-calistoga-regular">
                            Kỹ năng
                        </h3>
                        <ul className="space-y-2">
                            {skillNavigation.map((item) => {
                                const isActive = pathname === item.href;

                                return (
                                    <li key={item.name}>
                                        <Link href={item.href}>
                                            <Button
                                                variant="ghost"
                                                className={cn(
                                                    "w-full justify-start text-sm text-gray-300 hover:text-white hover:bg-gray-600 relative font-calistoga-regular",
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
                                                {item.icon === "svg" ? (
                                                    <Image
                                                        src={item.iconPath || ""}
                                                        alt={item.name}
                                                        width={collapsed ? 38 : 28}
                                                        height={collapsed ? 38 : 28}
                                                        className={cn(
                                                            "text-white",
                                                            !collapsed && "mr-3"
                                                        )}
                                                    />
                                                ) : (
                                                    <item.icon
                                                        className={cn(
                                                            "h-7 w-7",
                                                            !collapsed && "mr-3"
                                                        )}
                                                    />
                                                )}
                                                <span className="font-calistoga-regular">{item.name}</span>
                                            </Button>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {collapsed && (
                    <div className="mt-6">
                        <ul className="space-y-2">
                            {skillNavigation.map((item) => {
                                const isActive = pathname === item.href;

                                return (
                                    <li key={item.name}>
                                        <Link href={item.href}>
                                            <Button
                                                variant="ghost"
                                                className={cn(
                                                    "w-full justify-start text-sm text-gray-300 hover:text-white hover:bg-gray-600 relative font-calistoga-regular",
                                                    isActive && "text-white hover:text-white",
                                                    collapsed && "px-2"
                                                )}
                                                style={isActive ? { backgroundColor: "#1e3a5f" } : {}}
                                                title={item.name}
                                            >
                                                {isActive && (
                                                    <div
                                                        className="absolute left-0 top-0 bottom-0 w-1"
                                                        style={{ backgroundColor: "#F3713B" }}
                                                    />
                                                )}
                                                {item.icon === "svg" ? (
                                                    <Image
                                                        src={item.iconPath || ""}
                                                        alt={item.name}
                                                        width={collapsed ? 28 : 28}
                                                        height={collapsed ? 28 : 28}
                                                        className={cn(
                                                            "text-white",
                                                            collapsed ? "h-6 w-6" : "h-4 w-4"
                                                        )}
                                                    />
                                                ) : (
                                                    <item.icon
                                                        className={cn(
                                                            collapsed ? "h-6 w-6" : "h-4 w-4"
                                                        )}
                                                    />
                                                )}
                                            </Button>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </nav>

            <div className="p-4 border-t" style={{ borderColor: "#1e3a5f" }}>
                <Button
                    variant="ghost"
                    onClick={() => doLogout()}
                    disabled={isPending}
                    className={cn(
                        "w-full justify-start text-white hover:text-white hover:bg-gray-600",
                        collapsed && "px-2"
                    )}
                >
                    <LogOut className={cn("h-5 w-5", !collapsed && "mr-4")} />
                    {!collapsed && "Đăng xuất"}
                </Button>
            </div>
        </div>
    );
}