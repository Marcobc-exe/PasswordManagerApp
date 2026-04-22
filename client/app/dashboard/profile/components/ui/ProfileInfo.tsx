import { UserProfileSuccessDTO } from "@/features/user/user.schemas";
import { FC } from "react";

type Props = {
  user: UserProfileSuccessDTO;
  handlerIsEditing: (value: boolean) => void;
};

export const ProfileInfo: FC<Props> = ({ user, handlerIsEditing }) => {
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
  const displayName = fullName || user.username || "Not set";
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const avatarColor = user.avatar_color || "#2563eb";

  return (
    <>
      <div className="flex justify-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-semibold"
          style={{ backgroundColor: avatarColor }}
        >
          {avatarLetter}
        </div>
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

      <button
        onClick={() => handlerIsEditing(true)}
        className="px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
      >
        Edit profile
      </button>
    </>
  );
};
