import { useState } from "react";
import { User } from "@/types/user";
import { createUser, updateUser } from "@/services/users.service";
import { useToast } from "@/hooks/useToast";

export function useUserModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { showToast } = useToast();

  const openCreate = () => {
    setMode("create");
    setUser(null);
    setError(null);
    setSuccess(null);
    setOpen(true);
  };

  const openEdit = (u: User) => {
    setMode("edit");
    setUser(u);
    setError(null);
    setSuccess(null);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setUser(null);
    setError(null);
  };

  const submit = async (data: Omit<User, "id">) => {
    try {
      setLoading(true);

      await new Promise((r) => setTimeout(r, 800));

      if (mode === "create") {
        await createUser(data);
        showToast("User created successfully");
      } else {
        await updateUser(user!.id, data);
        showToast("User updated successfully");
      }

      setOpen(false);
    } catch {
      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    open,
    mode,
    user,
    loading,
    error,
    success,
    openCreate,
    openEdit,
    close,
    submit,
  };
}
