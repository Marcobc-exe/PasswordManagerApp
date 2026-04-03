import {
  PasswordListDTO,
  PasswordListSchema,
  PasswordsFailedSchema,
} from "@/features/passwords/passwords.schema";
import { api } from "./config";

export async function getPasswords(): Promise<PasswordListDTO> {
  const token = localStorage.getItem("token");

  const { data } = await api.get("/get-passwords", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    validateStatus: () => true,
  });

  const success = PasswordListSchema.safeParse(data);
  if (success.success) return success.data;

  const failed = PasswordsFailedSchema.safeParse(data);
  if (failed.success) throw new Error(failed.data.detail);

  throw new Error("Unexpected get-passwords response");
}
