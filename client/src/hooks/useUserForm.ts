"use client";

import { useEffect, useMemo, useState } from "react";
import { User } from "@/types/user";

type UserFormData = Omit<User, "id">;

function deepEqual(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function useUserForm(initialData: User | null) {
  const isCreate = !initialData;


  const emptyForm: UserFormData = {
    name: "",
    email: "",
    phone: "",
    location: "",
    company: "",
    status: "Offline",
  };

  const [initialForm, setInitialForm] = useState<UserFormData>(emptyForm);
  const [form, setForm] = useState<UserFormData>(emptyForm);

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

