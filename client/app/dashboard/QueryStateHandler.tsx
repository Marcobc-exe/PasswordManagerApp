import { ReactNode } from "react";

type Props<T> = {
  isLoading: boolean;
  error: unknown;
  data: T[];
  loadingFallback: ReactNode;
  errorFallback: (message: string) => ReactNode;
  emptyFallback: ReactNode;
  children: ReactNode;
};

export function QueryStateHandler<T>({
  isLoading,
  error,
  data,
  loadingFallback,
  errorFallback,
  emptyFallback,
  children,
}: Props<T>) {
  if (isLoading) return <>{loadingFallback}</>;

  if (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return <>{errorFallback(message)}</>;
  }

  if (data.length === 0) return <>{emptyFallback}</>;

  return <>{children}</>;
}
