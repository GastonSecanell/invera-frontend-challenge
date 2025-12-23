"use client";

import { useEffect, useState } from "react";
import { User, UserPayload } from "@/types/user";
import StatusSelect from "@/components/ui/StatusSelect";

/* ================= TYPES ================= */
interface Props {
  initialData?: User | null;
  onSubmit: (data: UserPayload) => void;
  submitLabel: string;
  loading?: boolean;
}

type FormErrors = Partial<Record<keyof UserPayload, string>>;

/* ================= COMPONENT ================= */
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

  const [errors, setErrors] = useState<FormErrors>({});

  /* ================= INIT FORM ================= */
  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setForm(rest);
      setErrors({});
    } else {
      setForm({
        name: "",
        email: "",
        phone: "",
        location: "",
        company: "",
        status: "Offline",
      });
      setErrors({});
    }
  }, [initialData]);

  /* ================= VALIDATION ================= */

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.company.trim()) newErrors.company = "Company is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= HELPERS ================= */
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

  /* ================= RENDER ================= */
  return (
    <form
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit(form);
      }}
    >
      {/* Name */}
      <div className="flex flex-col gap-1">
        <input
          value={form.name}
          placeholder="Name"
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
            setErrors({ ...errors, name: undefined });
          }}
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
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
            setErrors({ ...errors, email: undefined });
          }}
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
          onChange={(e) => {
            setForm({ ...form, phone: e.target.value });
            setErrors({ ...errors, phone: undefined });
          }}
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
          onChange={(e) => {
            setForm({ ...form, location: e.target.value });
            setErrors({ ...errors, location: undefined });
          }}
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
          onChange={(e) => {
            setForm({ ...form, company: e.target.value });
            setErrors({ ...errors, company: undefined });
          }}
          className={inputClass(errors.company)}
        />
        {errors.company && (
          <span className="text-xs text-red-400">{errors.company}</span>
        )}
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1">
        <StatusSelect
          value={form.status}
          onChange={(status) =>
            setForm({
              ...form,
              status: status ?? "Offline",
            })
          }
        />
      </div>

      {/* Submit */}
      <div className="sm:col-span-2 pt-3">
        <button
          type="submit"
          disabled={loading}
          className="
            w-full h-11
            flex items-center justify-center gap-2
            rounded-md
            bg-[var(--accent)]
            text-white font-medium
            disabled:opacity-60
            transition
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
