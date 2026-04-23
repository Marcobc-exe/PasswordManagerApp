import {
  ChangePasswordFormDTO,
  ChangePasswordSuccessSchema,
  DeleteAccountFailedSchema,
  DeleteAccountSuccessSchema,
  UpdateUserProfileFormDTO,
  UpdateUserProfileSuccessSchema,
  UserProfileFailedSchema,
  UserProfileSuccessSchema,
} from "@/features/user/user.schemas";
import { api } from "./config";

export async function getCurrentUserProfile() {
  const { data } = await api.get("/users/me", {
    validateStatus: () => true,
  });

  const success = UserProfileSuccessSchema.safeParse(data);
  if (success.success) return success.data;

  const failed = UserProfileFailedSchema.safeParse(data);
  if (failed.success) throw new Error(failed.data.detail);

  throw new Error("Invalid user profile response");
}

export async function updateCurrentUserProfile(
  payload: UpdateUserProfileFormDTO,
) {
  const { data } = await api.patch("/users/me", payload, {
    validateStatus: () => true,
  });

  const success = UpdateUserProfileSuccessSchema.safeParse(data);
  if (success.success) return success.data;

  const failed = UserProfileFailedSchema.safeParse(data);
  if (failed.success) throw new Error(failed.data.detail);

  throw new Error("Invalid update profile response");
}

export async function changeCurrentUserPassword(
  payload: ChangePasswordFormDTO,
) {
  const { data } = await api.patch("/users/me/password", payload, {
    validateStatus: () => true,
  });

  const success = ChangePasswordSuccessSchema.safeParse(data);
  if (success.success) return success.data;

  const failed = UserProfileFailedSchema.safeParse(data);
  if (failed.success) throw new Error(failed.data.detail);

  throw new Error("Invalid change password response");
}

export async function deleteCurrentUserAccount(current_password: string) {
  const { data } = await api.delete("/users/me", {
    data: { current_password },
    validateStatus: () => true,
  });

  const success = DeleteAccountSuccessSchema.safeParse(data);
  if (success.success) return success.data;

  const failed = DeleteAccountFailedSchema.safeParse(data);
  if (failed.success) throw new Error(failed.data.detail);

  throw new Error("Invalid delete account response");
}
