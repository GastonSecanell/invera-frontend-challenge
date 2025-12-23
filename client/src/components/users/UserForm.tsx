"use client";

import { useState } from "react";
import { User } from "@/types/user";
import { useUserForm } from "@/hooks/useUserForm";
import { validateUser } from "@/hooks/useUserValidation";
import { Button } from "@/components/ui/button";
import { useUserFilters } from "@/hooks/useUserFilters";
import type { UserStatus } from "@/types/user";
import SelectBase from "@/components/ui/SelectBase";

interface Props {
  initialData: User | null;
  onSubmit: (data: Omit<User, "id">) => void;
  submitLabel: string;
  loading?: boolean;
}

type FormErrors = Partial<Record<keyof Omit<User, "id">, string>>;

export default function UserForm({
  initialData,
  onSubmit,
  submitLabel,
  loading = false,
}: Props) {
  const { form, setForm, isDirty, isCreate } = useUserForm(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const { statuses, loading: loadingStatuses } = useUserFilters();

  const handleSubmit = () => {
    const { valid, errors } = validateUser(form);
    setErrors(errors);
    if (!valid) return;
    onSubmit(form);
  };

  const inputClass = (error?: string) => `
    h-10 rounded-md px-3
    bg-[var(--bg-surface)]
    border
    ${error ? "border-red-500" : "border-[var(--border-default)]"}
    text-[var(--text-primary)]
    placeholder-[var(--text-muted)]
    focus:outline-none
    focus:border-[var(--accent)]
  `;

  return (
    <form
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!isDirty && !isCreate) return;
        handleSubmit();
      }}
    >
      {/* Name */}
      <div className="flex flex-col gap-1">
        <input
          value={form.name}
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass(errors.name)}
        />
        {errors.name && (
          <span className="text-xs text-red-400">{errors.name}</span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <input
          value={form.email}
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass(errors.email)}
        />
        {errors.email && (
          <span className="text-xs text-red-400">{errors.email}</span>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1">
        <input
          value={form.phone}
          placeholder="Phone"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputClass(errors.phone)}
        />
        {errors.phone && (
          <span className="text-xs text-red-400">{errors.phone}</span>
        )}
      </div>

      {/* Location */}
      <div className="flex flex-col gap-1">
        <input
          value={form.location}
          placeholder="Location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className={inputClass(errors.location)}
        />
        {errors.location && (
          <span className="text-xs text-red-400">{errors.location}</span>
        )}
      </div>

      {/* Company */}
      <div className="flex flex-col gap-1">
        <input
          value={form.company}
          placeholder="Company"
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className={inputClass(errors.company)}
        />
        {errors.company && (
          <span className="text-xs text-red-400">{errors.company}</span>
        )}
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1">
        <SelectBase
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value as UserStatus,
            })
          }
          error={!!errors.status}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </SelectBase>

        {errors.status && (
          <span className="text-xs text-red-400">{errors.status}</span>
        )}
      </div>

      {/* Submit */}
      <div className="sm:col-span-2 pt-3">
        <Button
          type="submit"
          size="lg"
          className="w-full font-bold"
          disabled={loading || (!isDirty && !isCreate)}
        >
          {loading && (
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {submitLabel}
        </Button>

        {!isDirty && !isCreate && (
          <p className="mt-2 text-xs text-[var(--text-muted)] text-center">
            No changes to save
          </p>
        )}
      </div>
    </form>
  );
}
