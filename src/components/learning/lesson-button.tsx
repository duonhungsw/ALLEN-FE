"use client";

import type React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface LessonButtonProps {
  children: React.ReactNode;
  variant?: "start" | "special" | "default" | "locked" | "completed";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function LessonButton({
  children,
  variant = "default",
  size = "md",
  className,
  onClick,
  disabled = false,
}: LessonButtonProps) {
  const variantStyles = {
    start:
      "bg-gradient-to-b from-green-400 to-green-600 text-white shadow-lg hover:from-green-500 hover:to-green-700 border-2 border-green-300 hover:shadow-green-500/25",
    special:
      "bg-gradient-to-b from-purple-500 to-purple-700 text-white shadow-lg hover:from-purple-600 hover:to-purple-800 border-2 border-purple-400 hover:shadow-purple-500/25",
    completed:
      "bg-gradient-to-b from-emerald-500 to-emerald-700 text-white shadow-lg hover:from-emerald-600 hover:to-emerald-800 border-2 border-emerald-400 hover:shadow-emerald-500/25",
    locked:
      "bg-gradient-to-b from-slate-600 to-slate-800 text-slate-300 shadow-lg border-2 border-slate-500 cursor-not-allowed",
    default:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-lg hover:from-blue-600 hover:to-blue-800 border-2 border-blue-400 hover:shadow-blue-500/25",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled || variant === "locked"}
      className={cn(
        "rounded-full font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900",
        variantStyles[variant],
        sizeStyles[size],
        variant === "locked" && "hover:scale-100 hover:shadow-lg",
        className
      )}
    >
      {children}
    </Button>
  );
}
