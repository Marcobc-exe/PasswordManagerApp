import {
  LoginFailedSchema,
  LoginFormDTO,
  LoginFormSchema,
  LoginSuccessDTO,
  LoginSuccessSchema,
} from "@/features/login/login.schemas";
import { api } from "./config";
import { saveTokens } from "../helpers/helpers";
import { setAuthCookie } from "@/helpers/cookies";

export async function loginUser(
  values: LoginFormDTO,
): Promise<LoginSuccessDTO> {
  const parsedValues = LoginFormSchema.parse(values);

  const { data } = await api.post(
    "/auth/login",
    new URLSearchParams({
      username: parsedValues.email,
      password: parsedValues.password,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      validateStatus: () => true,
      skipAuthRefresh: true,
    },
  );

  const successResult = LoginSuccessSchema.safeParse(data);
  if (successResult.success) {
    saveTokens(
      successResult.data.access_token,
      successResult.data.refresh_token,
    );
    setAuthCookie();
    return successResult.data;
  }

  const failedResult = LoginFailedSchema.safeParse(data);
  if (failedResult.success) throw new Error(failedResult.data.detail);

  throw new Error("Unexpected login response");
}
