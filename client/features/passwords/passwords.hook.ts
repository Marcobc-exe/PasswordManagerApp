import { getPasswords } from "@/api/passwords.api";
import { useQuery } from "@tanstack/react-query";

export function usePasswords() {
  return useQuery({
    queryKey: ["passwords"],
    queryFn: getPasswords,
    staleTime: 30_000,
  });
}
