export const ErrorNavbar = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center gap-3 p-3 border-b border-white/10">
      <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-sm font-semibold">
        !
      </div>

      <div className="flex flex-col min-w-0">
        <p className="font-medium truncate">Profile unavailable</p>
        <p className="text-sm text-zinc-400 truncate">{message}</p>
      </div>
    </div>
  );
};
