import { useThemeStore } from "@/app/store/themeStore";
import { Spinner } from "@/components/Spinner";
import { ReactNode } from "react";

type Props = {
  isLoading: boolean;
  error: unknown;
  errorFallback: (message: string) => ReactNode;
  children: ReactNode;
};

export function ProfileQueryStateHandler({
  isLoading,
  error,
  errorFallback,
  children,
}: Props) {
  const darkMode = useThemeStore((state) => state.darkMode);
  const spinnerColor = darkMode ? "border-white" : "border-black";

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner color={spinnerColor} />
      </div>
    );

  if (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    return <>{errorFallback(message)}</>;
  }

  return <>{children}</>;
}
