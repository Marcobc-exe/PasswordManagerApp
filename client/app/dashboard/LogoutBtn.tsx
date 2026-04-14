import { FC } from "react";
import { Spinner } from "@/components/Spinner";
import { useLogout } from "@/hooks/useLogout";
import { LogOut } from "lucide-react";

type Props = {
  isMobile: boolean;
};

export const LogoutBtn: FC<Props> = ({ isMobile }) => {
  const { handleLogout, isLoading } = useLogout();
  const text = !isMobile && <span>Logout</span>;
  const label = isLoading ? <Spinner /> : text;

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`
        bg-red-600 text-white cursor-pointer rounded-xl hover:bg-red-700 transition flex flex-row gap-2
        ${isMobile ? "p-3 rounded-4xl" : "px-5 py-3"}
      `}
    >
      <LogOut size={24} />
      {label}
    </button>
  );
};
