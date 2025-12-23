import { useState } from "react";

interface ConfirmState<T = any> {
  open: boolean;
  payload: T | null;
}

export function useConfirm<T = any>() {
  const [state, setState] = useState<ConfirmState<T>>({
    open: false,
    payload: null,
  });

  const openConfirm = (payload: T) => {
    setState({ open: true, payload });
  };

  const closeConfirm = () => {
    setState({ open: false, payload: null });
  };

  return {
    ...state,
    openConfirm,
    closeConfirm,
  };
}
