"use client";

import Modal from "./Modal";
import Spinner from "./Spinner";

interface Props {
  open: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  open,
  title = "Confirm action",
  description = "Are you sure you want to continue?",
  loading = false,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="text-sm text-[var(--text-secondary)] mb-4">
        {description}
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          disabled={loading}
          className="
            px-4 py-2 rounded-md
            border border-[var(--border-default)]
            text-sm
            hover:bg-[var(--bg-hover)]
          "
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          className="
            px-4 py-2 rounded-md
            bg-[var(--danger)]
            text-sm text-white
            hover:bg-[color-mix(in_srgb,var(--danger)_85%,#000)]
            flex items-center gap-2
          "
        >
          {loading && <Spinner size={14} />}
          Confirm
        </button>
      </div>
    </Modal>
  );
}
