import { FC } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const FilterPasswords: FC<Props> = ({ value, onChange }) => {
  const optionStyles = "bg-[#0f2027] text-white cursor-pointer";

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        px-4 py-2 mb-3 rounded-xl border
      bg-[#0f2027] text-white
      border-[#21414f]
        focus:outline-none
        cursor-pointer
      `}
    >
      <option className={optionStyles} value="date_desc">
        Newest
      </option>
      <option className={optionStyles} value="date_asc">
        Oldest
      </option>
      <option className={optionStyles} value="favorites">
        Favorites
      </option>
      <option className={optionStyles} value="az">
        A-Z
      </option>
      <option className={optionStyles} value="za">
        Z-A
      </option>
    </select>
  );
};
