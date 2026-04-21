import { UserNavbarLoading } from "@/components/Loading";
import { ReactNode } from "react";

type Props = {
  isLoading: boolean;
  error: unknown;
  errorFallback: (message: string) => ReactNode;
  children: ReactNode;
};

export function NavbarQueryStateHandler({
  isLoading,
  error,
  errorFallback,
  children,
}: Props) {
  if (isLoading) return <UserNavbarLoading isLoading={isLoading} />;

  if (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return <>{errorFallback(message)}</>;
  }

  return <>{children}</>;
}
