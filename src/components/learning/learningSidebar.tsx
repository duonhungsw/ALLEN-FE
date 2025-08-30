"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Volume2,
  Trophy,
  Gift,
  ShoppingBag,
  User,
  MoreHorizontal,
} from "lucide-react";
import React from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  iconColor: string;
}

const navItems: NavItem[] = [
  {
    label: "HỌC",
    href: "/learning",
    icon: <BookOpen size={24} />,
    iconColor: "#FFD700",
  },
  {
    label: "PHÁT ÂM",
    href: "/learning/pronunciation",
    icon: <Volume2 size={24} />,
    iconColor: "#FF6B6B",
  },
  {
    label: "BẢNG XẾP HẠNG",
    href: "/learning/leaderboard",
    icon: <Trophy size={24} />,
    iconColor: "#FFD700",
  },
  {
    label: "NHIỆM VỤ",
    href: "/learning/quests",
    icon: <Gift size={24} />,
    iconColor: "#FFD700",
  },
  {
    label: "CỬA HÀNG",
    href: "/learning/shop",
    icon: <ShoppingBag size={24} />,
    iconColor: "#FF6B6B",
  },
  {
    label: "HỒ SƠ",
    href: "/learning/profile",
    icon: <User size={24} />,
    iconColor: "#A855F7",
  },
  {
    label: "XEM THÊM",
    href: "/learning/more",
    icon: <MoreHorizontal size={24} />,
    iconColor: "#A855F7",
  },
];

const NavLink = ({ item, isActive }: { item: NavItem; isActive: boolean }) => (
  <Link
    href={item.href}
    className={`flex items-center space-x-4 px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-200 ${isActive
        ? "bg-[#58CC03] text-black shadow-md"
        : "text-gray-300 hover:text-white hover:bg-gray-700"
      }`}
  >
    <span
      className="flex items-center justify-center w-8 h-8"
      style={{ color: item.iconColor }}
    >
      {item.icon}
    </span>
    <span className="whitespace-nowrap">{item.label}</span>
  </Link>
);

export default function LearningSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#132024] text-white py-6 px-4 transition-all duration-300">
      <div className="mb-8 px-4">
        <h1 className="text-2xl font-bold text-[#58CC03]">duolingo</h1>
      </div>

      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return <NavLink key={item.label} item={item} isActive={isActive} />;
        })}
      </nav>
    </aside>
  );
}
