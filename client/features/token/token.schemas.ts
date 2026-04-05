import z from "zod";

export const RefreshTokenSuccessSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string(),
});

export const RefreshTokenFailedSchema = z.object({
  detail: z.string(),
});

export type RefreshTokenSuccessDTO = z.infer<typeof RefreshTokenSuccessSchema>;
export type RefreshTokenFailedDTO = z.infer<typeof RefreshTokenFailedSchema>;
