import { useTheme } from "@/hooks/useTheme";

export default function DarkModeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-16 h-8 rounded-full flex items-center justify-between px-2 transition-colors duration-300
        ${isDark ? "bg-[#0A092D]" : "bg-blue-500"}
      `}
      style={{ position: "relative" }}
    >
      <span className={`w-6 h-7 text-lg z-10 transition-opacity duration-300 ${isDark ? "opacity-0" : "opacity-100"}`}>🌞</span>
      <span className={`w-4 h-7 text-lg z-10 transition-opacity duration-300 ${isDark ? "opacity-100" : "opacity-0"}`}>🌙</span>
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md absolute top-1 left-2 transition-transform duration-300
          ${isDark ? "translate-x-8" : "translate-x-0"}
        `}
        style={{ zIndex: 5 }}
      />
    </button>
  );
}
