"use client";

import { User } from "@/types/user";
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

type SortDir = "asc" | "desc";

type HeaderCol = {
  key: keyof User;
  label: string;
  icon: React.ReactNode;
  className?: string;
};

type Props = {
  columns: HeaderCol[];
  sortKey?: keyof User;
  sortDir?: SortDir;
  onSortChange: (key: keyof User) => void;

  renderSelectAll?: () => React.ReactNode;

  actionsColClassName?: string;
};

function SortableHeaderButton({
  label,
  icon,
  columnKey,
  sortKey,
  sortDir,
  onSortChange,
}: {
  label: string;
  icon: React.ReactNode;
  columnKey: keyof User;
  sortKey?: keyof User;
  sortDir?: SortDir;
  onSortChange: (key: keyof User) => void;
}) {
  const active = sortKey === columnKey;

  return (
    <button
      type="button"
      onClick={() => onSortChange(columnKey)}
      className={`
        flex items-center gap-2 group select-none
        ${active ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}
      `}
      title={`Sort by ${label}`}
      aria-label={`Sort by ${label}`}
    >
      <span className="h-4 w-4 opacity-90 group-hover:opacity-100">{icon}</span>

      <span className="font-medium">{label}</span>

      <span className="flex flex-col">
        <ChevronUpIcon
          className={`h-3 w-3 ${
            active && sortDir === "asc"
              ? "text-[var(--accent)]"
              : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
          }`}
        />
        <ChevronDownIcon
          className={`h-3 w-3 -mt-1 ${
            active && sortDir === "desc"
              ? "text-[var(--accent)]"
              : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
          }`}
        />
      </span>
    </button>
  );
}

export default function UsersTableHeader({
  columns,
  sortKey,
  sortDir,
  onSortChange,
  renderSelectAll,
  actionsColClassName = "px-4 py-3 w-[96px]",
}: Props) {
  return (
    <thead className="sticky top-0 z-20 bg-[var(--bg-surface)] text-xs">
      <tr className="border-t border-[var(--border-default)]">
        {/* Checkbox col */}
        <th className="px-4 py-3 w-8">
          {renderSelectAll ? renderSelectAll() : null}
        </th>

        {/* Sortable cols */}
        {columns.map((c) => (
          <th key={String(c.key)} className={c.className ?? "px-4 py-3"}>
            <SortableHeaderButton
              label={c.label}
              icon={c.icon}
              columnKey={c.key}
              sortKey={sortKey}
              sortDir={sortDir}
              onSortChange={onSortChange}
            />
          </th>
        ))}

        {/* Actions col */}
        <th className={actionsColClassName} />
      </tr>
    </thead>
  );
}
