"use client";

import { useState, useCallback } from "react";
import { User } from "@/types/user";
import { useUserForm } from "@/hooks/useUserForm";
import { validateUser } from "@/hooks/useUserValidation";
import { Button } from "@/components/ui/button";
import { useUserFilters } from "@/hooks/useUserFilters";
import type { UserStatus } from "@/types/user";
import SelectBase from "@/components/ui/SelectBase";
import { useI18n, Lang } from "@/i18n/useI18n";

interface Props {
  initialData: User | null;
  onSubmit: (data: Omit<User, "id">) => void;
  submitLabel: string;
  loading?: boolean;
  lang: Lang;
}

type FormData = Omit<User, "id">;
type FormErrors = Partial<Record<keyof FormData, string>>;

interface InputFieldProps {
  value: string;
  placeholder: string;
  error?: string;
  onChange: (value: string) => void;
}

function InputField({ value, placeholder, error, onChange }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`
          h-10 rounded-md px-3
          bg-[var(--bg-surface)]
          border
          ${error ? "border-red-500" : "border-[var(--border-default)]"}
          text-[var(--text-primary)]
          placeholder-[var(--text-muted)]
          focus:outline-none
          focus:border-[var(--accent)]
        `}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}

export default function UserForm({
  initialData,
  onSubmit,
  submitLabel,
  loading = false,
  lang,
}: Props) {
  const t = useI18n(lang);
  const { form, setForm, isDirty, isCreate } = useUserForm(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const { statuses } = useUserFilters();

  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [setForm]
  );

  const handleSubmit = useCallback(() => {
    const { valid, errors } = validateUser(form, t);
    setErrors(errors);
    if (!valid) return;
    onSubmit(form);
  }, [form, onSubmit, t]);

  return (
    <form
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!isDirty && !isCreate) return;
        handleSubmit();
      }}
    >
      <InputField
        value={form.name}
        placeholder={t.form.name}
        error={errors.name}
        onChange={(v) => updateField("name", v)}
      />

      <InputField
        value={form.email}
        placeholder={t.form.email}
        error={errors.email}
        onChange={(v) => updateField("email", v)}
      />

      <InputField
        value={form.phone}
        placeholder={t.form.phone}
        error={errors.phone}
        onChange={(v) => updateField("phone", v)}
      />

      <InputField
        value={form.location}
        placeholder={t.form.location}
        error={errors.location}
        onChange={(v) => updateField("location", v)}
      />

      <InputField
        value={form.company}
        placeholder={t.form.company}
        error={errors.company}
        onChange={(v) => updateField("company", v)}
      />

      <div className="flex flex-col gap-1">
        <SelectBase
          value={form.status}
          onChange={(e) => updateField("status", e.target.value as UserStatus)}
          error={!!errors.status}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </SelectBase>

        {errors.status && (
          <span className="text-xs text-red-400">{errors.status}</span>
        )}
      </div>

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
            {t.form.noChanges}
          </p>
        )}
      </div>
    </form>
  );
}
