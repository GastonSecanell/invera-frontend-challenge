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
        border
        ${
          isOnline
            ? "bg-[#0f2a17] text-[#4ade80] border-[#1f7a3a]"
            : "bg-[#2a2a2a] text-[#9ca3af] border-[#3a3a3a]"
        }
      `}
    >
      <span
        className={`
          h-1.5 w-1.5 rounded-full
          ${isOnline ? "bg-[#4ade80]" : "bg-[#9ca3af]"}
        `}
      />
      {status}
    </span>
  );
}
