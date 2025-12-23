interface Props {
  status: "Online" | "Offline";
}

export default function StatusBadge({ status }: Props) {
  const isOnline = status === "Online";

  return (
    <span
      className={`
        inline-flex items-center gap-2
        px-3 py-1
        text-xs font-medium
        border rounded-md
        ${
          isOnline
            ? "bg-[var(--status-online-bg)] text-[var(--status-online-text)] border-[var(--status-online-border)]"
            : "bg-[var(--status-offline-bg)] text-[var(--status-offline-text)] border-[var(--status-offline-border)]"
        }
      `}
    >
      <span
        className={`
          h-1.5 w-1.5 rounded-full
          ${
            isOnline
              ? "bg-[var(--status-online-text)]"
              : "bg-[var(--status-offline-text)]"
          }
        `}
      />
      {status}
    </span>
  );
}
