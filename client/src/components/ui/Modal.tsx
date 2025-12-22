"use client";

import { ReactNode, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({
  open,
  title,
  children,
  onClose,
  size = "xl",
}: Props) {
  // Cerrar con ESC
  useEffect(() => {
    if (!open || !onClose) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className={`
          relative z-10 w-full ${sizeClasses[size]}
          rounded-xl
          border border-[var(--border-default)]
          bg-[var(--bg-surface)]
          shadow-xl
          animate-fadeIn
        `}
      >
        {/* HEADER */}
        {(title || onClose) && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-default)]">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">
              {title}
            </h2>

            {onClose && (
              <button
                onClick={onClose}
                className="
                  rounded-md p-1
                  text-[var(--text-secondary)]
                  hover:text-[var(--text-primary)]
                  hover:bg-[var(--bg-hover)]
                  transition
                "
                aria-label="Close modal"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* BODY */}
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
