import { ReactNode } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
  value: number;
  icon: ReactNode;
}

export default function UserStatCard({ title, value, icon }: Props) {
  return (
    <div
      className="
        flex items-center justify-between
        rounded-[8px]
        px-5 py-5
        min-h-[80px]
        bg-[var(--bg-surface)]
        border border-[var(--border-default)]
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex h-10 w-10 items-center justify-center rounded-full
            bg-[var(--accent-soft)]
            text-[var(--chart-organic)]
          "
        >
          {icon}
        </div>

        <div>
          <p className="font-bold text-[var(--text-secondary)]">
            {title}
          </p>
          <p className="text-xl text-[var(--text-primary)]">
            {value}
          </p>
        </div>
      </div>

      <EllipsisVerticalIcon
        className="
          h-5 w-5 cursor-pointer
          text-[var(--text-secondary)]
          hover:text-[var(--text-primary)]
        "
      />
    </div>
  );
}
