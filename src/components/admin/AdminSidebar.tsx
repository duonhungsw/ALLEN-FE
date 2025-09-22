"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    Shield,
    BarChart3,
    Settings,
    Bell,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Mic,
    Headphones,
    PenTool,
    BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useProfile } from "@/hooks/auth/useProfile";

const adminNavigation = [
    { name: "Người dùng", href: "/admin/users", icon: Users },
    { name: "Category", href: "/admin/category", icon: Shield },
    { name: "Topic", href: "/admin/topic", icon: BarChart3 },
    { name: "Thông báo", href: "/admin/notifications", icon: Bell },
    { name: "Cài đặt", href: "/admin/settings", icon: Settings },
];

const skillNavigation = [
    { name: "Speaking", href: "/admin/skills/speaking", icon: Mic },
    { name: "Listening", href: "/admin/skills/listening", icon: Headphones },
    { name: "Writing", href: "/admin/skills/writing", icon: PenTool },
    { name: "Reading", href: "/admin/skills/reading", icon: BookOpen },
];

export default function AdminSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const { data: user, isLoading } = useProfile();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = "/login";
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
                                Allen Admin
                            </h1>
                            <p className="text-xs text-gray-300">Admin Panel1111</p>
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
                                    : `https://avatar.vercel.sh/${user?.name ?? "admin"}.svg`
                            }
                            alt={user?.name || "Admin Avatar"}
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
                                        {user?.name || "Admin"}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <Badge
                                            variant="secondary"
                                            className="text-white text-xs"
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
                                                "h-5 w-5",
                                                !collapsed && "mr-3"
                                            )}
                                        />
                                        {!collapsed && item.name}
                                    </Button>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Skills Section */}
                {!collapsed && (
                    <div className="mt-6">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                            Kỹ năng
                        </h3>
                        <ul className="space-y-2">
                            {skillNavigation.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                return (
                                    <li key={item.name}>
                                        <Link href={item.href}>
                                            <Button
                                                variant="ghost"
                                                className={cn(
                                                    "w-full justify-start text-sm text-gray-300 hover:text-white hover:bg-gray-600 relative",
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
                                                <Icon className="h-4 w-4 mr-3" />
                                                {item.name}
                                            </Button>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {/* Collapsed Skills */}
                {collapsed && (
                    <div className="mt-6">
                        <ul className="space-y-2">
                            {skillNavigation.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                return (
                                    <li key={item.name}>
                                        <Link href={item.href}>
                                            <Button
                                                variant="ghost"
                                                className={cn(
                                                    "w-full justify-center text-gray-300 hover:text-white hover:bg-gray-600 relative px-2",
                                                    isActive && "text-white hover:text-white"
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
                                                <Icon className="h-4 w-4" />
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
                    onClick={handleLogout}
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