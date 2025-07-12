const LanguageDropdown = (props: TProps) => {
  const { t, i18n } = useTranslation();
  const { languages, onLanguageChange } = props;

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    onLanguageChange(selectedLanguage);
  };

  return (
    <select value={i18n.language} onChange={handleLanguageChange} className="language-dropdown">
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {t(lang.lang)}
        </option>
      ))}
    </select>
  );
}

export default LanguageDropdown;