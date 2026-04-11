import {
  DeletePasswordDTO,
  PasswordListDTO,
  PasswordListSchema,
  PasswordFailedSchema,
  PasswordSuccessSchema,
  SavePasswordFormDTO,
  SavePasswordFormSchema,
  PasswordSuccessDTO,
  DeletePasswordSchema,
} from "@/features/passwords/passwords.schemas";
import { api } from "./config";
import { getAccessToken } from "@/helpers/helpers";

export async function getPasswords(): Promise<PasswordListDTO> {
  const { data } = await api.get("/passwords");

  const success = PasswordListSchema.safeParse(data);
  if (success.success) return success.data;

  const failed = PasswordFailedSchema.safeParse(data);
  if (failed.success) throw new Error(failed.data.detail);

  throw new Error("Unexpected get-passwords response");
}

export async function savePassword(
  values: SavePasswordFormDTO,
): Promise<PasswordSuccessDTO> {
  const parsedValues = SavePasswordFormSchema.parse(values);
  const token = getAccessToken();

  const formData = new FormData();
  formData.append("website", parsedValues.website);
  formData.append("username", parsedValues.username);
  formData.append("password", parsedValues.password);

  const { data } = await api.post("/passwords", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    skipAuthRefresh: true
  });

  const success = PasswordSuccessSchema.safeParse(data);
  if (success.success) return success.data;

  const failed = PasswordFailedSchema.safeParse(data);
  if (failed.success) throw new Error(failed.data.detail);

  throw new Error("Unexpected save-password response");
}

export async function deletePassword(
  value: DeletePasswordDTO,
): Promise<PasswordSuccessDTO> {
  const id = DeletePasswordSchema.parse(value);
  const token = getAccessToken();

  const { data } = await api.delete(`/passwords/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    skipAuthRefresh: true
  });

  const success = PasswordSuccessSchema.safeParse(data);
  if (success.success) return success.data;

  const failed = PasswordFailedSchema.safeParse(data);
  if (failed.success) throw new Error(failed.data.detail);

  throw new Error("Unexpected delete-password response");
}
