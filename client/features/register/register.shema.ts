import z from "zod";

export const RegisterFormSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RegisterSuccessSchema = z.object({
  message: z.string(),
});

export const RegisterFailedSchema = z.object({
  detail: z.string(),
});

export type RegisterFormDTO = z.infer<typeof RegisterFormSchema>;
export type RegisterSuccessDTO = z.infer<typeof RegisterSuccessSchema>;
export type RegisterFailedDTO = z.infer<typeof RegisterFailedSchema>;