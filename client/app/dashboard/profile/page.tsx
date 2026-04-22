"use client";

import { useCurrentUserProfile } from "@/features/user/user.hook";
import { ProfileQueryStateHandler } from "./components/utils/ProfileQueryStateHandler";
import { useThemeStore } from "@/app/store/themeStore";
import { ErrorNavbar } from "@/components/ui/Errors/ErrorNavbar";
import { useState } from "react";
import { EditProfileForm } from "./components/ui/EditProfileForm";
import { ProfileInfo } from "./components/ui/ProfileInfo";

export default function ProfilePage() {
  const { data, isLoading, error } = useCurrentUserProfile();
  const darkMode = useThemeStore((state) => state.darkMode);
  const [isEditing, setIsEditing] = useState(false);

  const handlerIsEditing = (value: boolean) => setIsEditing(value);

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
          {isEditing && data && (
            <EditProfileForm
              user={data}
              onCancel={() => handlerIsEditing(false)}
              onSuccess={() => handlerIsEditing(false)}
            />
          )}

          {!isEditing && data && (
            <ProfileInfo user={data} handlerIsEditing={handlerIsEditing} />
          )}
        </div>
      </main>
    </ProfileQueryStateHandler>
  );
}
