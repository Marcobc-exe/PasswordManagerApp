import { useThemeStore } from "@/app/store/themeStore";
import { CircleUserRound } from "lucide-react";
import { FC } from "react";

type Props = {
  handleViewMenu: () => void;
};

export const IconProfileBtn: FC<Props> = ({ handleViewMenu }) => {
  const darkMode = useThemeStore((state) => state.darkMode);

  return (
    <button
      className={`
          p-2 rounded-full transition cursor-pointer
          ${darkMode ? "bg-[#21414f] hover:bg-[#0d1b21]" : "bg-[#ffd391] hover:bg-[#f9c16c]"}
        `}
      onClick={handleViewMenu}
    >
      <CircleUserRound size={28} />
    </button>
  );
};
