import { options } from "@/consts/consts";
import { ChevronDown } from "lucide-react";
import { FC, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const FilterPasswords: FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);
  const optionStyles = "bg-[#0f2027] text-white cursor-pointer";

  return (
    <div className="relative w-48">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full px-4 py-2 rounded-xl
          bg-[#0f2027] text-white
          border border-[#21414f]
          flex justify-between items-center
          cursor-pointer mb-3
        "
      >
        {selected?.label}
        <ChevronDown size={16} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute mt-2 w-full rounded-xl
            bg-[#0f2027] 
            border border-[#21414f]
            shadow-lg z-50
            overflow-hidden
          "
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`
                w-full text-left px-4 py-2 transition cursor-pointer
                ${value === opt.value ? "bg-[#21414f]" : "hover:bg-[#0d1b21]"}
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
