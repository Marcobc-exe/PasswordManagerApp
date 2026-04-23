import { useThemeStore } from "@/app/store/themeStore";
import { ActionButton } from "@/components/ActionButton";
import { UserProfileSuccessDTO } from "@/features/user/user.schemas";
import { Pen } from "lucide-react";
import { FC } from "react";

type Props = {
  user: UserProfileSuccessDTO;
  handlerIsEditing: (value: boolean) => void;
};

export const ProfileInfo: FC<Props> = ({ user, handlerIsEditing }) => {
  const darkMode = useThemeStore((state) => state.darkMode);
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
  const displayName = fullName || user.username || "Not set";
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const avatarColor = user.avatar_color || "#2563eb";

  return (
    <>
      <div className="relative flex justify-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-semibold"
          style={{ backgroundColor: avatarColor }}
        >
          {avatarLetter}
        </div>
        <ActionButton
          darkMode={darkMode}
          icon={<Pen size={20} />}
          onClick={() => handlerIsEditing(true)}
          label="Edit"
          styles="absolute right-0 p-3 rounded-full transition cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-zinc-400">Full name</p>
          <p className="text-lg font-semibold">{displayName}</p>
        </div>

        <div>
          <p className="text-sm text-zinc-400">Username</p>
          <p className="text-lg font-semibold">{user.username || "Not set"}</p>
        </div>

        <div>
          <p className="text-sm text-zinc-400">Email</p>
          <p className="text-lg">{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-zinc-400">Password</p>
          <p className="text-lg font-mono">************</p>
        </div>
      </div>
    </>
  );
};
