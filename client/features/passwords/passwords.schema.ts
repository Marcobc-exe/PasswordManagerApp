import z from "zod";

export const PasswordsItemSchema = z.object({
  id: z.number(),
  website: z.string(),
  username: z.string(),
  password: z.string(),
})

export const PasswordListSchema = z.array(PasswordsItemSchema)

export const PasswordsFailedSchema = z.object({
  detail: z.string()
})

export type PasswordItemDTO = z.infer<typeof PasswordsItemSchema>
export type PasswordListDTO = z.infer<typeof PasswordListSchema>
export type PasswordFailedDTO = z.infer<typeof PasswordsFailedSchema>