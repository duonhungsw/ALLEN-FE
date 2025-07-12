"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getStorageData, setStorageData } from "@/shared/store";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  customColors: {
    bodyBg: string;
    textColor: string;
    cardBg: string;
  };
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

import { themeColors } from "@/theme/themeColors";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = getStorageData("theme");
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newDark = !prev;
      setStorageData("theme", newDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newDark);
      return newDark;
    });
  };

  const customColors = isDark ? themeColors.dark : themeColors.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, customColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
