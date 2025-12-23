"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export default function SelectBase({
  children,
  className,
  error,
  ...props
}: Props) {
  return (
    <div className="relative w-full">
      <select
        {...props}
        className={clsx(
          `
            w-full h-10 rounded-md pl-3 pr-9 text-sm
            bg-[var(--bg-surface)]
            border
            ${error ? "border-red-500" : "border-[var(--border-default)]"}
            text-[var(--text-primary)]
            appearance-none
            focus:outline-none
            focus:border-[var(--accent)]
            focus:ring-1 focus:ring-[var(--accent)]/30
            transition-colors
          `,
          className
        )}
      >
        {children}
      </select>

      <ChevronDownIcon
        className="
          pointer-events-none
          absolute right-3 top-1/2 -translate-y-1/2
          h-4 w-4
          text-[var(--chart-organic)]
        "
      />
    </div>
  );
}
