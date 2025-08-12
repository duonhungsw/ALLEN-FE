import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type LanguageOption = {
  value: string;
  label: string;
};

type TProps = {
  languages: LanguageOption[];
  onLanguageChange: (lang: string) => void;
};

const LanguageDropdown = ({ languages, onLanguageChange }: TProps) => {
  const { i18n } = useTranslation();

  // Khôi phục ngôn ngữ từ localStorage khi component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && languages.some(lang => lang.value === savedLanguage)) {
      i18n.changeLanguage(savedLanguage);
      onLanguageChange(savedLanguage);
    }
  }, [i18n, onLanguageChange, languages]);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = event.target.value;
    
    // Lưu ngôn ngữ được chọn vào localStorage
    localStorage.setItem('selectedLanguage', selectedLanguage);
    
    // Thay đổi ngôn ngữ
    i18n.changeLanguage(selectedLanguage);
    onLanguageChange(selectedLanguage);
  };

  return (
    <select
      value={i18n.language}
      onChange={handleLanguageChange}
      className="px-3 py-2 border rounded-md text-sm"
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageDropdown;
