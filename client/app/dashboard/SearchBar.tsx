import { FC, useEffect, useState } from "react";
import { useThemeStore } from "@/app/store/themeStore";
import { Search } from "lucide-react";

type Props = {
  search: string;
  handleSearch: (value: string) => void;
};

const placeholders = [
  "Search passwords...",
  "Search by website...",
  "Search by username...",
];

export const SearchBar: FC<Props> = ({ search, handleSearch }) => {
  const darkMode = useThemeStore((state) => state.darkMode);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    if (search) return;

    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [search]);

  return (
    <div className="relative mb-8 w-full">
      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <Search
          size={18}
          className={darkMode ? "text-zinc-400" : "text-zinc-700"}
        />
      </div>

      <input
        type="text"
        placeholder={placeholders[placeholderIndex]}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className={`w-full focus:border-zinc-500 backdrop-blur pl-11 pr-5 py-3 rounded-2xl outline-none border transition-all duration-300
          ${
            darkMode
              ? "bg-[#0f2027] hover:bg-[#0d1b21] text-white placeholder:text-zinc-400 border-zinc-700"
              : "bg-[#dbb985] hover:bg-[#d7ae71] text-black placeholder:text-zinc-700 border-zinc-400"
          }
        `}
      />
    </div>
  );
};
