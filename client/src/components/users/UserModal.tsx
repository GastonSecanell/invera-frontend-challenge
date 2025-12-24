"use client";

import Modal from "@/components/ui/Modal";
import UserForm from "./UserForm";
import { User } from "@/types/user";
import { Lang, useI18n } from "@/i18n/useI18n";

interface Props {
  open: boolean;
  mode: "create" | "edit";
  user: User | null;
  loading: boolean;
  error: string | null;
  success?: string | null;
  onClose: () => void;
  onSubmit: (data: Omit<User, "id">) => void;
  lang: Lang;
}

export default function UserModal({
  open,
  mode,
  user,
  loading,
  error,
  success,
  onClose,
  onSubmit,
  lang,
}: Props) {
  const t = useI18n(lang);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "create" ? t.addUser : t.editUser}
      size="lg"
    >
      {success && (
        <div
          className="
            mb-3 rounded-md
            bg-green-500/10
            border border-green-500/30
            px-3 py-2
            text-sm text-green-400
          "
        >
          {success}
        </div>
      )}

      {error && (
        <div
          className="
            mb-3 rounded-md
            bg-red-500/10
            border border-red-500/30
            px-3 py-2
            text-sm text-red-400
          "
        >
          {error}
        </div>
      )}

      <UserForm
        initialData={user}
        onSubmit={onSubmit}
        submitLabel={mode === "create" ? t.addUser : t.editUser}
        loading={loading}
        lang={lang}
      />
    </Modal>
  );
}
