import {
  changeCurrentUserPassword,
  deleteCurrentUserAccount,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "@/api/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCurrentUserProfile() {
  return useQuery({
    queryKey: ["current-user-profile"],
    queryFn: getCurrentUserProfile,
  });
}

export function useUpdateCurrentUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCurrentUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-profile"] });
    },
  });
}

export function useChangeCurrentUserPassword() {
  return useMutation({
    mutationFn: changeCurrentUserPassword,
  });
}

export function useDeleteCurrentUserAccount() {
  return useMutation({
    mutationFn: (current_password: string) =>
      deleteCurrentUserAccount(current_password),
  });
}