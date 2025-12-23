"use client";

import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/solid";

import { UserFilters, UserStatus } from "@/types/user";
import { useUserFilters } from "@/hooks/useUserFilters";
import SelectBase from "@/components/ui/SelectBase";

type Props = {
  search: string;
  onSearchChange: (v: string) => void;

  filters: UserFilters;
  onFiltersChange: (f: UserFilters) => void;
  onResetFilters: () => void;

  showFilters: boolean;
  setShowFilters: (v: boolean) => void;

  hasActiveFilters: boolean;

  start: number;
  end: number;
  total: number;

  t: {
    moreFilters: string;
    closeFilters: string;
    clearFilters: string;
  };
};

export default function UsersTableToolbar({
  search,
  onSearchChange,
  filters,
  onFiltersChange,
  onResetFilters,
  showFilters,
  setShowFilters,
  hasActiveFilters,
  start,
  end,
  total,
  t,
}: Props) {
  const inputBase =
    "h-9 rounded-md px-3 text-sm bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 transition-colors";

  const selectBase = `
    h-9 rounded-md pl-3 pr-8 text-sm
    bg-[var(--bg-surface)]
    border border-[var(--border-default)]
    text-[var(--text-primary)]
    appearance-none
    focus:outline-none
    focus:border-[var(--accent)]
    focus:ring-1 focus:ring-[var(--accent)]/30
    transition-colors
  `;

  const { companies, statuses, loading } = useUserFilters();

  return (
    <div className="px-4 lg:px-8 py-6 border-b border-[var(--border-default)]">
      {/* GRID PRINCIPAL */}
      <div
        className="
          grid gap-4
          grid-cols-1
          lg:grid-cols-[auto_260px_auto_1fr_auto_auto]
          items-center
        "
      >
        {/* TITLE */}
        <h1 className="text-xl font-bold text-[var(--text-primary)] whitespace-nowrap">
          All Users
        </h1>

        {/* SEARCH */}
        <div className="relative w-full">
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for..."
            className={`${inputBase} pl-9 w-full`}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)]" />
        </div>

        {/* TOGGLE FILTERS */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          title={showFilters ? t.closeFilters : t.moreFilters}
          className="
            h-9 px-3
            rounded-md
            border border-[var(--border-default)]
            text-sm
            text-[var(--text-secondary)]
            hover:bg-[var(--bg-hover)]
            transition
          "
        >
          {showFilters ? "<" : "+"}
        </button>

        {/* FILTERS */}
        <div
          className={`
            flex flex-col gap-3
            lg:flex-row lg:items-center lg:gap-4
            overflow-hidden
            transition-[max-height,opacity] duration-300
            ${
              showFilters
                ? "max-h-40 lg:max-h-none opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          {" "}
          <input
            placeholder="Filter by name"
            value={filters.name}
            onChange={(e) =>
              onFiltersChange({ ...filters, name: e.target.value })
            }
            className={`${inputBase} w-full lg:w-[160px]`}
          />
          <input
            placeholder="Filter by email"
            value={filters.email ?? ""}
            onChange={(e) =>
              onFiltersChange({ ...filters, email: e.target.value })
            }
            className={`${inputBase} w-full lg:w-[160px]`}
          />
          <div className="relative">
            <SelectBase
              value={filters.company}
              onChange={(e) =>
                onFiltersChange({ ...filters, company: e.target.value })
              }
            >
              <option value="">All companies</option>
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectBase>
          </div>
          <div className="relative">
            <SelectBase
              value={filters.status ?? ""}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  status: e.target.value
                    ? (e.target.value as UserStatus)
                    : undefined,
                })
              }
            >
              <option value="">All statuses</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </SelectBase>
          </div>
        </div>

        {/* CLEAR FILTERS (MISMA FILA) */}
        {hasActiveFilters ? (
          <div className="flex justify-start lg:justify-start mx-4">
            <button
              onClick={onResetFilters}
              title={t.clearFilters}
              className="
                h-9 px-3
                rounded-md
                border border-[var(--border-default)]
                text-[var(--danger)]
                hover:bg-red-500/10
                transition
              "
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div />
        )}

        {/* RANGE */}
        <div className="flex justify-start lg:justify-end whitespace-nowrap">
          <span className="text-sm text-[var(--text-secondary)]">
            <span className="text-[var(--accent)]">
              {start}–{end}
            </span>{" "}
            of {total}
          </span>
        </div>
      </div>
    </div>
  );
}
