"use client";

import { logoutUser } from "@/api/logout.api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useLogout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;

    try {
      await logoutUser();
      router.push("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Logout failed";
      toast.warning(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogout,
    isLoading,
  };
}
