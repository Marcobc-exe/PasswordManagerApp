import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginSuccessSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
});

export const LoginFailedSchema = z.object({
  error: z.string(),
});

export type LoginFormDTO = z.infer<typeof LoginFormSchema>;
export type LoginSuccessDTO = z.infer<typeof LoginSuccessSchema>;
export type LoginFailedDTO = z.infer<typeof LoginFailedSchema>;