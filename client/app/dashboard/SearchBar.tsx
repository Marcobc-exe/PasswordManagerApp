import { FC } from "react";
import { useThemeStore } from "@/app/store/themeStore";

type Props = {
  search: string;
  handleSearch: (value: string) => void;
};

export const SearchBar: FC<Props> = ({ search, handleSearch }) => {
  const darkMode = useThemeStore((state) => state.darkMode);

  return (
    <input
      type="text"
      placeholder="Search passwords..."
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
      className={`w-full focus:border-zinc-500 mb-8 backdrop-blur px-5 py-3 rounded-2xl outline-none border transition 
        ${
          darkMode
            ? "bg-[#0f2027] hover:bg-[#0d1b21] text-white"
            : "bg-[#dbb985] hover:bg-[#d7ae71] text-black"
        }
      `}
    />
  );
};
