import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/login.api";
import { LoginFormDTO } from "./login.schemas";

export function useLogin() {
  return useMutation({
    mutationFn: (values: LoginFormDTO) => loginUser(values),
  });
}