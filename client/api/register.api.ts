import {
  RegisterFailedSchema,
  RegisterFormDTO,
  RegisterFormSchema,
  RegisterSuccessDTO,
  RegisterSuccessSchema,
} from "@/features/register/register.shema";
import { api } from "./config";

export async function registerUser(
  values: RegisterFormDTO,
): Promise<RegisterSuccessDTO> {
  const parsedValues = RegisterFormSchema.parse(values);

  const { data } = await api.post(
    "/register",
    new URLSearchParams({
      email: parsedValues.email,
      password: parsedValues.password,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      validateStatus: () => true,
    },
  );

  const success = RegisterSuccessSchema.safeParse(data);
  if (success.success) return success.data;

  const failed = RegisterFailedSchema.safeParse(data);
  if (failed.success) throw new Error(failed.data.detail);

  throw new Error("Unexpected register response");
}
