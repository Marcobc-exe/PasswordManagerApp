"use client";
import { TitleDashboard } from "./TitleDashboard";
import { IconProfileMenu } from "./IconProfileMenu";
import { AddPasswordBtn } from "./AddPasswordBtn";
import { usePathname } from "next/navigation";

export const DashboardNavbar = () => {
  const pathname = usePathname();
  const isPasswordsPage = pathname === "/dashboard";

  return (
    <header className="w-full flex items-center justify-between px-6 py-4">
      <TitleDashboard />

      <div className="flex items-center gap-3">
        {isPasswordsPage && <AddPasswordBtn />}
        <IconProfileMenu />
      </div>
    </header>
  );
};
