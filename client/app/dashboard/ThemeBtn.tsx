import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/app/store/themeStore";

export const ThemeBtn = () => {
  const handleToggleTheme = useThemeStore((state) => state.toggleDarkMode);
  const darkMode = useThemeStore((state) => state.darkMode);

  return (
    <button
      onClick={() => handleToggleTheme()}
      className={`cursor-pointer p-3 rounded-3xl transition text-white 
        ${
          darkMode
            ? "bg-[#0f2027] hover:bg-[#0d1b21]"
            : "bg-[#dbb985] hover:bg-[#f6c479] text-black"
        }
      `}
    >
      {darkMode ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};
