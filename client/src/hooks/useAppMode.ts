"use client";

import { useEffect, useState } from "react";

export type AppMode = "demo" | "real";

const STORAGE_KEY = "app_mode";

export function useAppMode() {
  const [mode, setMode] = useState<AppMode>("real");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as AppMode | null;
    setMode(stored ?? "real");
    setReady(true);
  }, []);

  const setAppMode = (value: AppMode) => {
    localStorage.setItem(STORAGE_KEY, value);
    setMode(value);
  };

  return {
    mode,
    isDemo: mode === "demo",
    isReal: mode === "real",
    setAppMode,
    ready,
  };
}
