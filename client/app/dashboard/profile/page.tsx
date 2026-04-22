"use client";

import { useCurrentUserProfile } from "@/features/user/user.hook";
import { ProfileQueryStateHandler } from "./components/utils/ProfileQueryStateHandler";
import { useThemeStore } from "@/app/store/themeStore";
import { ErrorNavbar } from "@/components/ui/Errors/ErrorNavbar";
import { useState } from "react";
import { EditProfileForm } from "./components/ui/EditProfileForm";

export default function ProfilePage() {
  const { data, isLoading, error } = useCurrentUserProfile();
  const darkMode = useThemeStore((state) => state.darkMode);
  const [isEditing, setIsEditing] = useState(false);

  const fullName = [data?.first_name, data?.last_name]
    .filter(Boolean)
    .join(" ");
  const displayName = fullName || data?.username || "Not set";
  const avatarLetter = displayName?.charAt(0).toUpperCase();
  const avatarColor = data?.avatar_color || "#2563eb";

  return (
    <ProfileQueryStateHandler
      isLoading={isLoading}
      error={error}
      errorFallback={(message) => <ErrorNavbar message={message} />}
    >
      <main className="min-h-screen flex justify-center items-start p-6">
        <div
          className={`
            w-full max-w-md p-6 rounded-2xl shadow-lg flex flex-col gap-6
            ${darkMode ? "bg-[#0f2027] text-white" : "bg-white text-black"}
          `}
        >
          {isEditing && data ? (
            <EditProfileForm
              user={data}
              onCancel={() => setIsEditing(false)}
              onSuccess={() => setIsEditing(false)}
            />
          ) : (
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
                  <p className="text-lg font-semibold">
                    {data?.username || "Not set"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-zinc-400">Email</p>
                  <p className="text-lg">{data?.email}</p>
                </div>

                <div>
                  <p className="text-sm text-zinc-400">Password</p>
                  <p className="text-lg font-mono">************</p>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
              >
                Edit profile
              </button>
            </>
          )}
        </div>
      </main>
    </ProfileQueryStateHandler>
  );
}
