"use client";

import type { Lang } from "@/i18n/useI18n";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface Props {
  value: Lang;
  onChange: (lang: Lang) => void;
}

export function LanguageToggle({ value, onChange }: Props) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Lang)}
        className="
          h-9 rounded-md pl-2 pr-8
          bg-[var(--bg-surface)]
          border border-[var(--border-default)]
          text-[var(--text-primary)]
          text-sm
          appearance-none
          cursor-pointer
          hover:bg-[var(--bg-hover)]
          focus:outline-none
          focus:border-[var(--accent)]
        "
        title="Language"
      >
        <option value="es">🇦🇷 ES</option>
        <option value="en">🇺🇸 EN</option>
      </select>

      <ChevronDownIcon
        className="
          pointer-events-none
          absolute right-2 top-1/2 -translate-y-1/2
          h-4 w-4
          text-[var(--chart-organic)]
        "
      />
    </div>
  );
}
