"use client";
import { TitleDashboard } from "./TitleDashboard";
import { IconProfileMenu } from "./IconProfileMenu";
import { AddPasswordBtn } from "../buttons/AddPasswordBtn";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import { MobileMenu } from "./MobileMenu";

export const DashboardNavbar = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const pathname = usePathname();
  const isPasswordsPage = pathname === "/dashboard";

  return (
    <header className="w-full flex items-center justify-between px-6 py-4">
      <TitleDashboard />

      <div className="flex items-center gap-3">
        {isPasswordsPage && <AddPasswordBtn />}
        {isMobile ? <MobileMenu /> : <IconProfileMenu />}
      </div>
    </header>
  );
};
