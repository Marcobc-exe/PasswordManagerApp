import { Moon, Sun } from "lucide-react";
import { FC } from "react";

type Props = {
  darkMode: boolean;
  handleDarkMode: (value: boolean) => void;
};

export const ThemeBtn: FC<Props> = ({ darkMode, handleDarkMode }) => {
  return (
    <button
      onClick={() => handleDarkMode(!darkMode)}
      className={`cursor-pointer p-3 rounded-3xl transition text-white 
        ${darkMode 
          ? "bg-[#0f2027] hover:bg-[#0d1b21]" 
          : "bg-[#dbb985] hover:bg-[#f6c479] text-black"}
      `}
    >
      {darkMode ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};
