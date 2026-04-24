import Link from "next/link";
import { Lock, ShieldCheck, KeyRound } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#071318] text-white overflow-hidden">
      <section className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <div className="mx-auto lg:mx-0 w-fit flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              <ShieldCheck size={16} />
              Secure password manager
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Keep your passwords safe, organized, and always within reach.
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Lockerpass helps you store, manage, and protect your credentials
              with a clean and simple dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/register"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 transition"
              >
                Get started
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-white/15 px-6 py-3 font-semibold hover:bg-white/10 transition"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-blue-600 p-3">
                    <Lock size={24} />
                  </div>
                  <div>
                    <p className="font-semibold">Lockerpass</p>
                    <p className="text-sm text-zinc-400">Vault secured</p>
                  </div>
                </div>

                <KeyRound className="text-blue-400" />
              </div>

              <div className="flex flex-col gap-4">
                {["Netflix", "GitHub", "Spotify"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-[#0f2027] p-4 border border-white/10"
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">{item}</p>
                      <p className="text-yellow-300">★</p>
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">james_ktl</p>
                    <p className="mt-3 font-mono text-lg tracking-widest">
                      ************
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
