import {
  LoginFailedSchema,
  LoginFormDTO,
  LoginFormSchema,
  LoginSuccessDTO,
  LoginSuccessSchema,
} from "@/features/login/login.schemas";
import { api } from "./config";

export async function loginUser(
  values: LoginFormDTO,
): Promise<LoginSuccessDTO> {
  const parsedValues = LoginFormSchema.parse(values);

  const { data } = await api.post(
    "login",
    new URLSearchParams({
      username: parsedValues.email,
      password: parsedValues.password,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      validateStatus: () => true,
    },
  );

  const successResult = LoginSuccessSchema.safeParse(data);
  if (successResult.success) return successResult.data;

  const failedResult = LoginFailedSchema.safeParse(data);
  if (failedResult.success) throw new Error(failedResult.data.detail);

  throw new Error("Unexpected login response");
}
