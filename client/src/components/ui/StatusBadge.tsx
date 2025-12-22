interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const isOnline = status === "Online";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
        ${
          isOnline
            ? "bg-green-500/10 text-green-400"
            : "bg-gray-500/10 text-gray-400"
        }`}
    >
      {status}
    </span>
  );
}
