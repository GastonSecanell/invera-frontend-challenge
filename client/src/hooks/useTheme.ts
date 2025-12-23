"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const preferred = stored ?? "dark";

    document.documentElement.dataset.theme =
      preferred === "light" ? "light" : "";
    setTheme(preferred);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme =
      next === "light" ? "light" : "";
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  return { theme, toggleTheme };
}
