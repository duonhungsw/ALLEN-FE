"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/configs/i18n";

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Khôi phục ngôn ngữ từ localStorage khi component mount
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && ['en', 'vi'].includes(savedLanguage)) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return <>{children}</>;
};
