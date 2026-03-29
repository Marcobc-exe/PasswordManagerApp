import { LogOut } from "lucide-react";
import { FC } from "react";

type Props = {
  isMobile: boolean;
  handleLogout: () => void;
};

export const LogoutBtn: FC<Props> = ({ isMobile, handleLogout }) => {
  return (
    <button
      onClick={handleLogout}
      className={`
        bg-red-600 text-white cursor-pointer rounded-xl hover:bg-red-700 transition flex flex-row gap-2
        ${isMobile ? "p-3 rounded-4xl" : "px-5 py-3"}
      `}
    >
      <LogOut size={24} />
      {!isMobile && <span>Logout</span>}
    </button>
  );
};
