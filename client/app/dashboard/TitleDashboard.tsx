import { FC } from "react";

type Props = {
  darkMode: boolean;
};

export const TitleDashboard: FC<Props> = ({ darkMode }) => {
  return (
    <h1
      className={`text-3xl font-bold ${darkMode ? "text-white" : "text-black"}`}
    >
      Dashboard
    </h1>
  );
};
