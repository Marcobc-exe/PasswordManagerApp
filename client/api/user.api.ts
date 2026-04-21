import {
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
