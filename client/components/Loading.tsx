import { useThemeStore } from "@/app/store/themeStore";
import { Spinner } from "@/components/Spinner";

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

export const UserNavbarLoading = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-full bg-zinc-500/30 animate-pulse" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-28 rounded bg-zinc-500/30 animate-pulse" />
          <div className="h-3 w-20 rounded bg-zinc-500/20 animate-pulse" />
        </div>
      </div>
    );
  }
};
