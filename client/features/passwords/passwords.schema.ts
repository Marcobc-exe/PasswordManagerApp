import z from "zod";

export const PasswordsItemSchema = z.object({
  id: z.number(),
  website: z.string(),
  username: z.string(),
  password: z.string(),
});

export const PasswordListSchema = z.array(PasswordsItemSchema);

export const PasswordsFailedSchema = z.object({
  detail: z.string(),
});

export const SavePasswordFormSchema = z.object({
  website: z.string().min(1, "Website is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const PasswordSuccessSchema = z.object({
  message: z.string(),
});

export type PasswordItemDTO = z.infer<typeof PasswordsItemSchema>;
export type PasswordListDTO = z.infer<typeof PasswordListSchema>;
export type PasswordFailedDTO = z.infer<typeof PasswordsFailedSchema>;
export type SavePasswordFormDTO = z.infer<typeof SavePasswordFormSchema>;
export type SavePasswordSuccessDTO = z.infer<typeof PasswordSuccessSchema>;
