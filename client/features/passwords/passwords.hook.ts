import {
  deletePassword,
  getPasswords,
  savePassword,
} from "@/api/passwords.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeletePasswordDTO,
  PasswordListDTO,
  SavePasswordFormDTO,
} from "./passwords.schemas";

export function usePasswords() {
  return useQuery({
    queryKey: ["passwords"],
    queryFn: getPasswords,
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
