import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/ui/Navbar/Navbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Navbar />
        {children}
      </div>
    </ProtectedRoute>
  );
}
