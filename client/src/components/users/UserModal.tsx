import Modal from "@/components/ui/Modal";
import UserForm from "./UserForm";
import { User } from "@/types/user";

interface Props {
  open: boolean;
  mode: "create" | "edit";
  user: User | null;
  loading: boolean;
  error: string | null;
  success?: string | null;
  onClose: () => void;
  onSubmit: (data: Omit<User, "id">) => void;
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
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "create" ? "Add user" : "Edit user"}
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

      <UserForm
        initialData={user}
        onSubmit={onSubmit}
        submitLabel={mode === "create" ? "Create user" : "Save changes"}
        loading={loading}
      />
    </Modal>
  );
}
