"use client";

import { useEffect, useMemo, useState } from "react";
import type { User, UserPayload, UserStatus } from "@/types/user";

function deepEqual<T>(a: T, b: T) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function useUserForm(initialData: User | null) {
  const isCreate = !initialData;

  const emptyForm: UserPayload = {
    name: "",
    email: "",
    phone: "",
    location: "",
    company: "",
    status: "Offline" as UserStatus,
  };

  const [initialForm, setInitialForm] = useState<UserPayload>(emptyForm);
  const [form, setForm] = useState<UserPayload>(emptyForm);

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setInitialForm(rest);
      setForm(rest);
    } else {
      setInitialForm(emptyForm);
      setForm(emptyForm);
    }
  }, [initialData]);

  const isDirty = useMemo(() => {
    if (isCreate) return true;
    return !deepEqual(form, initialForm);
  }, [form, initialForm, isCreate]);

  return {
    form,
    setForm,
    isDirty,
    isCreate,
  };
}
