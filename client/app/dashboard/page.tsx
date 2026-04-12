"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardContent } from "./DashboardContent";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
