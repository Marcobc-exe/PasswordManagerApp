import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ReactNode } from "react";
import { DashboardNavbar } from "./components/ui/DashboardNavbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <DashboardNavbar />
        {children}
      </div>
    </ProtectedRoute>
  );
}
