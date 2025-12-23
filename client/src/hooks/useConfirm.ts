import { useState } from "react";

export function useConfirm<T = any>() {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<T | null>(null);

  const openConfirm = (data?: T) => {
    setPayload(data ?? null);
    setOpen(true);
  };

  const closeConfirm = () => {
    setOpen(false);
    setPayload(null);
  };

  return {
    open,
    payload,
    openConfirm,
    closeConfirm,
  };
}
