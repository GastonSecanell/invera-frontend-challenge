"use client";

import { useEffect, useState } from "react";
import { User, UserPayload } from "@/types/user";
import { USER_STATUS_OPTIONS } from "@/constants/userStatus";

interface Props {
  initialData?: User | null;
  onSubmit: (data: UserPayload) => void;
  submitLabel: string;
  loading?: boolean;
}

export default function UserForm({
  initialData,
  onSubmit,
  submitLabel,
  loading = false,
}: Props) {
  const [form, setForm] = useState<UserPayload>({
    name: "",
    email: "",
    phone: "",
    location: "",
    company: "",
    status: "Offline",
  });

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setForm(rest);
    } else {
      setForm({
        name: "",
        email: "",
        phone: "",
        location: "",
        company: "",
        status: "Offline",
      });
    }
  }, [initialData]);

  return (
    <form
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      {/* Name */}
      <input
        value={form.name}
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="
      h-10 rounded-md px-3
      bg-[var(--bg-surface)]
      border border-[var(--border-default)]
      text-[var(--text-primary)]
      placeholder-[var(--text-muted)]
      focus:outline-none focus:border-[var(--accent)]
    "
      />

      {/* Email */}
      <input
        value={form.email}
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="
      h-10 rounded-md px-3
      bg-[var(--bg-surface)]
      border border-[var(--border-default)]
      text-[var(--text-primary)]
      placeholder-[var(--text-muted)]
      focus:outline-none focus:border-[var(--accent)]
    "
      />

      {/* Phone */}
      <input
        value={form.phone}
        placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="
      h-10 rounded-md px-3
      bg-[var(--bg-surface)]
      border border-[var(--border-default)]
      text-[var(--text-primary)]
      placeholder-[var(--text-muted)]
      focus:outline-none focus:border-[var(--accent)]
    "
      />

      {/* Location */}
      <input
        value={form.location}
        placeholder="Location"
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        className="
      h-10 rounded-md px-3
      bg-[var(--bg-surface)]
      border border-[var(--border-default)]
      text-[var(--text-primary)]
      placeholder-[var(--text-muted)]
      focus:outline-none focus:border-[var(--accent)]
    "
      />

      {/* Company */}
      <input
        value={form.company}
        placeholder="Company"
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="
      h-10 rounded-md px-3
      bg-[var(--bg-surface)]
      border border-[var(--border-default)]
      text-[var(--text-primary)]
      placeholder-[var(--text-muted)]
      focus:outline-none focus:border-[var(--accent)]
    "
      />

      {/* Status */}
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value as any })}
        className="
      h-10 rounded-md px-3
      bg-[var(--bg-surface)]
      border border-[var(--border-default)]
      text-[var(--text-primary)]
      focus:outline-none focus:border-[var(--accent)]
    "
      >
        {USER_STATUS_OPTIONS.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>

      {/* Submit */}
      <div className="sm:col-span-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="
                w-full h-10
                flex items-center justify-center gap-2
                rounded-md
                bg-[var(--accent)]
                text-white font-medium
                disabled:opacity-60
            "
        >
          {loading && (
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}

          {submitLabel}
        </button>
      </div>
    </form>
  );
}
