import { useCurrentUserProfile } from "@/features/user/user.hook";
import { NavbarQueryStateHandler } from "./NavbarQueryStateHandler";
import { ErrorNavbar } from "../Errors/ErrorNavbar";
import { X } from "lucide-react";
import { FC } from "react";
import { useMediaQuery } from "@mui/material";

type Props = {
  handleViewMenu: () => void;
};

export const UserSubMenu: FC<Props> = ({ handleViewMenu }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { data, isLoading, error } = useCurrentUserProfile();

  const fullName = [data?.first_name, data?.last_name].filter(Boolean).join(" ");

  const primaryText =
    fullName || data?.username || data?.email || "Unknown user";
  const secondaryText = data?.username ? data.username : data?.email || "";
  const avatarLetter = primaryText.charAt(0).toUpperCase();

  return (
    <NavbarQueryStateHandler
      isLoading={isLoading}
      error={error}
      errorFallback={(message) => <ErrorNavbar message={message} />}
    >
      <div className="flex items-center gap-3 p-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
          {avatarLetter}
        </div>

        <div className="flex flex-col min-w-0">
          <p className="font-semibold truncate">{primaryText}</p>
          <p className="text-sm text-zinc-400 truncate">{secondaryText}</p>
        </div>
        {isMobile && (
          <button
            className="cursor-pointer mr-4 absolute right-0"
            onClick={handleViewMenu}
          >
            <X />
          </button>
        )}
      </div>
    </NavbarQueryStateHandler>
  );
};
