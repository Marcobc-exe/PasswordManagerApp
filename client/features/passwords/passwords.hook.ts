import {
  deletePassword,
  getPasswords,
  savePassword,
  toggleFavoritePassword,
} from "@/api/passwords.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeletePasswordDTO,
  PasswordListDTO,
  SavePasswordFormDTO,
} from "./passwords.schemas";
import { getAccessToken } from "@/helpers/helpers";

export function usePasswords() {
  return useQuery({
    queryKey: ["passwords"],
    queryFn: getPasswords,
    enabled: !!getAccessToken(),
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

export function useDeletePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (value: DeletePasswordDTO) => deletePassword(value),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["passwords"] });

      const previousPasswords = queryClient.getQueryData<PasswordListDTO>([
        "passwords",
      ]);

      queryClient.setQueryData<PasswordListDTO>(["passwords"], (old = []) =>
        old.filter((password) => password.id !== id),
      );

      return { previousPasswords };
    },
  });
}

export function useToggleFavoritePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => toggleFavoritePassword(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["passwords"] });
    },
  });
}