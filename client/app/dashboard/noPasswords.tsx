import { Lock } from "lucide-react";

export const NoPasswordsYet = () => {
  return (
    <main className="min-h-screen bg-transparent text-white flex flex-col items-center justify-center gap-6">
      <div className="bg-zinc-900 p-6 rounded-2xl">
        <Lock size={40} />
      </div>

      <h1 className="text-2xl font-bold">No passwords yet</h1>

      <p className="text-zinc-400 text-center max-w-sm">
        Start by adding your first password. It will appear here once saved.
      </p>

      <button className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer">
        Add your first password
      </button>
    </main>
  );
};
