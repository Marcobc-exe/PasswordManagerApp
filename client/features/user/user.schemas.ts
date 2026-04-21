import z from "zod";

export const UserProfileSuccessSchema  = z.object({
  email: z.email(),
  username: z.string().nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
});

export const UserProfileFailedSchema = z.object({
  detail: z.string(),
});

export type UserProfileSuccessDTO = z.infer<typeof UserProfileSuccessSchema >;
export type UserProfileFailedDTP = z.infer<typeof UserProfileFailedSchema>;
