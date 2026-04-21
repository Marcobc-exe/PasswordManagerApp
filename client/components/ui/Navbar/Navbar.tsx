"use client";
import { MobileMenu } from "./MobileMenu";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import { IconProfileMenu } from "./IconProfileMenu";
import { TitleDashboard } from "@/app/dashboard/components/ui/TitleDashboard";
import { AddPasswordBtn } from "@/app/dashboard/components/buttons/AddPasswordBtn";

export const Navbar = () => {
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
