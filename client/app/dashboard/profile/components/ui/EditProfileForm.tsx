"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  useChangeCurrentUserPassword,
  useUpdateCurrentUserProfile,
} from "@/features/user/user.hook";
import { UserProfileSuccessDTO } from "@/features/user/user.schemas";

type Props = {
  user: UserProfileSuccessDTO;
  onCancel: () => void;
  onSuccess: () => void;
};

const avatarColors = [
  "#2563eb",
  "#dc2626",
  "#16a34a",
  "#9333ea",
  "#ea580c",
  "#0d9488",
];

export function EditProfileForm({ user, onCancel, onSuccess }: Props) {
  const updateProfileMutation = useUpdateCurrentUserProfile();
  const changePasswordMutation = useChangeCurrentUserPassword();

  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [avatarColor, setAvatarColor] = useState(user.avatar_color || "#2563eb");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSaveProfile = () => {
    updateProfileMutation.mutate(
      {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        avatar_color: avatarColor,
      },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully");
          onSuccess();
        },
        onError: (error) => {
          const message =
            error instanceof Error ? error.message : "Profile update failed";
          toast.warning(message);
        },
      },
    );
  };

  const handleChangePassword = () => {
    changePasswordMutation.mutate(
      {
        current_password: currentPassword,
        new_password: newPassword,
      },
      {
        onSuccess: () => {
          toast.success("Password updated successfully");
          setCurrentPassword("");
          setNewPassword("");
        },
        onError: (error) => {
          const message =
            error instanceof Error ? error.message : "Password update failed";
          toast.warning(message);
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-zinc-400">Avatar color</p>
        <div className="flex gap-2 flex-wrap">
          {avatarColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setAvatarColor(color)}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                avatarColor === color ? "border-white" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm text-zinc-400 mb-1">First name</p>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-transparent border border-zinc-500"
        />
      </div>

      <div>
        <p className="text-sm text-zinc-400 mb-1">Last name</p>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-transparent border border-zinc-500"
        />
      </div>

      <div>
        <p className="text-sm text-zinc-400 mb-1">Username</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-transparent border border-zinc-500"
        />
      </div>

      <div>
        <p className="text-sm text-zinc-400 mb-1">Email</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-transparent border border-zinc-500"
        />
      </div>

      <div className="border-t border-white/10 pt-4 flex flex-col gap-4">
        <p className="font-semibold">Change password</p>

        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-transparent border border-zinc-500"
        />

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-transparent border border-zinc-500"
        />

        <button
          type="button"
          onClick={handleChangePassword}
          className="px-4 py-3 rounded-xl bg-zinc-700 text-white hover:bg-zinc-600 transition cursor-pointer"
        >
          Update password
        </button>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSaveProfile}
          className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
        >
          Save changes
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 rounded-xl border border-zinc-500 hover:bg-white/5 transition cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}