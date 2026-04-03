import { getPasswords, savePassword } from "@/api/passwords.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SavePasswordFormDTO } from "./passwords.schema";

export function usePasswords() {
  return useQuery({
    queryKey: ["passwords"],
    queryFn: getPasswords,
    staleTime: 30_000,
  });
}

export function useSavePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: SavePasswordFormDTO) => savePassword(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
    },
  });
}
