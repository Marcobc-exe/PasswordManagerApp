import { getCurrentUserProfile } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUserProfile() {
  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
  });
}
