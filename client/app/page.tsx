"use client";

import { useRouter } from "next/navigation";
import { useAppMode } from "@/hooks/useAppMode";

export default function HomePage() {
  const router = useRouter();
  const { setAppMode } = useAppMode();

  const go = (mode: "demo" | "real") => {
    setAppMode(mode);
    router.push("/users");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[340px] flex flex-col gap-6">
        <button
          onClick={() => go("demo")}
          className="p-6 rounded-lg border bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] transition"
        >
          <h2 className="font-semibold text-lg">Demo mode</h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            UI completa con imágenes y datos simulados
          </p>
        </button>

        <button
          onClick={() => go("real")}
          className="p-6 rounded-lg border bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] transition"
        >
          <h2 className="font-semibold text-lg">Challenge mode</h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            UI real consumiendo backend
          </p>
        </button>
      </div>
    </div>
  );
}
