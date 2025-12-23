"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        h-9 w-9 rounded-md
        flex items-center justify-center
        border border-[var(--border-default)]
        bg-[var(--bg-surface)]
        hover:bg-[var(--bg-hover)]
        transition
      "
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <SunIcon className="h-4 w-4 text-[var(--text-primary)]" />
      ) : (
        <MoonIcon className="h-4 w-4 text-[var(--text-primary)]" />
      )}
    </button>
  );
}
