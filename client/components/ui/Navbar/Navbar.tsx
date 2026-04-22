"use client";
import { usePathname } from "next/navigation";
import { IconProfileMenu } from "./IconProfileMenu";
import { TitleDashboard } from "@/app/dashboard/components/ui/TitleDashboard";
import { AddPasswordBtn } from "@/app/dashboard/components/buttons/AddPasswordBtn";

export const Navbar = () => {
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
