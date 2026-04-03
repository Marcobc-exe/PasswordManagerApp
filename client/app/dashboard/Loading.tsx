import { Spinner } from "@/components/Spinner";
import { useThemeStore } from "../store/themeStore";

export const Loading = () => {
  const darkMode = useThemeStore((state) => state.darkMode);
  const fontColor = darkMode ? "text-white" : "text-black";
  const spinnerColor = darkMode ? "border-white" : "border-black";

  return (
    <main
      className={`min-h-screen flex items-center justify-center gap-3 ${fontColor}`}
    >
      <Spinner color={spinnerColor} />
      <p className="text-xl">Loading passwords</p>
    </main>
  );
};
