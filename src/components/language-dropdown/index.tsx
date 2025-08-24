import React from 'react';
import { useLocale } from 'next-intl';

type LanguageOption = {
  value: string;
  label: string;
};

type TProps = {
  languages: LanguageOption[];
  onLanguageChange: (lang: string) => void;
};

const LanguageDropdown = ({ languages, onLanguageChange }: TProps) => {
  const locale = useLocale();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = event.target.value;
    document.cookie = `locale=${selectedLanguage}`;
    window.location.reload();
    onLanguageChange(selectedLanguage);
  };

  return (
    <select
      value={locale}
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
