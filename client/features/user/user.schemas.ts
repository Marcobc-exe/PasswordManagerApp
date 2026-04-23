import z from "zod";

export const UserProfileSuccessSchema = z.object({
  email: z.email(),
  username: z.string().nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  avatar_color: z.string().nullable(),
});

export const UserProfileFailedSchema = z.object({
  detail: z.string(),
});

export const UpdateUserProfileFormSchema = z.object({
  email: z.email("Invalid email"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  avatar_color: z.string().min(1, "Avatar color is required"),
});

export const UpdateUserProfileSuccessSchema = z.object({
  message: z.string(),
  user: UserProfileSuccessSchema,
});

export const ChangePasswordFormSchema = z.object({
  current_password: z.string().min(1, "Current password is required"),
  new_password: z.string().min(8, "New password must be at least 8 characters"),
});

export const ChangePasswordSuccessSchema = z.object({
  message: z.string(),
});

export const DeleteAccountFormSchema = z.object({
  current_password: z.string().min(1, "Current password is required"),
  confirmation_text: z.literal("DELETE", {
    error: () => ({ message: 'You must type "DELETE"' }),
  }),
});

export const DeleteAccountSuccessSchema = z.object({
  message: z.string(),
});

export const DeleteAccountFailedSchema = z.object({
  detail: z.string(),
});

export type UserProfileSuccessDTO = z.infer<typeof UserProfileSuccessSchema>;
export type UserProfileFailedDTO = z.infer<typeof UserProfileFailedSchema>;
export type UpdateUserProfileFormDTO = z.infer<
  typeof UpdateUserProfileFormSchema
>;
export type UpdateUserProfileSuccessDTO = z.infer<
  typeof UpdateUserProfileSuccessSchema
>;
export type ChangePasswordFormDTO = z.infer<typeof ChangePasswordFormSchema>;
export type ChangePasswordSuccessDTO = z.infer<
  typeof ChangePasswordSuccessSchema
>;
export type DeleteAccountFormDTO = z.infer<typeof DeleteAccountFormSchema>;
export type DeleteAccountSuccessDTO = z.infer<
  typeof DeleteAccountSuccessSchema
>;
export type DeleteAccountFailedDTO = z.infer<typeof DeleteAccountFailedSchema>;
