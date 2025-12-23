"use client";

import { USER_STATUS_OPTIONS, UserStatus } from "@/constants/userStatus";

interface Props {
  value?: UserStatus;
  onChange: (value?: UserStatus) => void;
  allowAll?: boolean;
  className?: string;
}

export default function StatusSelect({
  value,
  onChange,
  allowAll = false,
  className = "",
}: Props) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => {
        const v = e.target.value;
        onChange(v ? (v as UserStatus) : undefined);
      }}
      className={`
        h-10 rounded-md px-3 text-sm
        bg-[var(--bg-surface)]
        border border-[var(--border-default)]
        text-[var(--text-primary)]
        focus:outline-none focus:border-[var(--accent)]
        ${className}
      `}
    >
      {allowAll && <option value="">All status</option>}

      {USER_STATUS_OPTIONS.map((status) => (
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  );
}
