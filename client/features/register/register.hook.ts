import { useMutation } from "@tanstack/react-query";
import { RegisterFormDTO } from "./register.schemas";
import { registerUser } from "@/api/register.api";

export function useRegister() {
  return useMutation({
    mutationFn: (values: RegisterFormDTO) => registerUser(values),
  });
}
