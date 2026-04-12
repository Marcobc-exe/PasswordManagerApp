import { z } from "zod";

export const PasswordItemSchema = z.object({
  id: z.number(),
  website: z.string(),
  username: z.string(),
  password: z.string(),
  favorite: z.boolean(),
});

export const PasswordListSchema = z.array(PasswordItemSchema);

export const PasswordFailedSchema = z.object({
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

export const ToggleFavoriteSchema = z.object({
  message: z.string(),
  favorite: z.boolean(),
});

export const DeletePasswordSchema = z.number();

export type PasswordItemDTO = z.infer<typeof PasswordItemSchema>;
export type PasswordListDTO = z.infer<typeof PasswordListSchema>;
export type PasswordFailedDTO = z.infer<typeof PasswordFailedSchema>;
export type SavePasswordFormDTO = z.infer<typeof SavePasswordFormSchema>;
export type PasswordSuccessDTO = z.infer<typeof PasswordSuccessSchema>;
export type DeletePasswordDTO = z.infer<typeof DeletePasswordSchema>;
