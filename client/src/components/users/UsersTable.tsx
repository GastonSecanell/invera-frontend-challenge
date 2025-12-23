"use client";

import { useState } from "react";
import { User, UserFilters } from "@/types/user";
import StatusBadge from "@/components/ui/StatusBadge";
import StatusSelect from "@/components/ui/StatusSelect";
import Checkbox from "@/components/ui/Checkbox";
import Spinner from "@/components/ui/Spinner";

import {
  UserIcon as UserSolid,
  PhoneIcon as PhoneSolid,
  MapPinIcon as MapPinSolid,
  CheckCircleIcon as CheckCircleSolid,
  MagnifyingGlassIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  TrashIcon,
  PencilIcon,
  BriefcaseIcon as BackspaceSolid,
} from "@heroicons/react/24/solid";

/* ================= TYPES ================= */
interface Props {
  users: User[];
  loading?: boolean;
  page: number;
  perPage: number;
  total: number;

  search: string;
  onSearchChange: (value: string) => void;

  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;

  sortKey?: keyof User;
  sortDir?: "asc" | "desc";
  onSortChange: (key: keyof User) => void;

  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

/* ================= COMPONENT ================= */
export default function UsersTable({
  users,
  loading = false,
  page,
  perPage,
  total,
  sortKey,
  sortDir,
  onSortChange,
  search,
  onSearchChange,
  onEdit,
  onDelete,
  filters,
  onFiltersChange,
}: Props) {
  const [selected, setSelected] = useState<number[]>([]);

  const allSelected = users.length > 0 && selected.length === users.length;

  const [showFilters, setShowFilters] = useState(false);

  const toggleAll = (checked: boolean) =>
    setSelected(checked ? users.map((u) => u.id) : []);

  const toggleOne = (id: number, checked: boolean) =>
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );

  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  function IconAction({
    children,
    hoverClass,
    label,
    onClick,
  }: {
    children: React.ReactNode;
    hoverClass: string;
    label: string;
    onClick?: () => void;
  }) {
    return (
      <button
        aria-label={label}
        onClick={onClick}
        className={`
        text-[#8A8A8A]
        ${hoverClass}
        transition-colors
      `}
      >
        {children}
      </button>
    );
  }

  const Header = ({
    label,
    icon,
    columnKey,
  }: {
    label: string;
    icon: React.ReactNode;
    columnKey: keyof User;
  }) => {
    const active = sortKey === columnKey;

    return (
      <button
        type="button"
        onClick={() => onSortChange(columnKey)}
        className={`
          flex items-center gap-2 group select-none
          ${active ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}
        `}
      >
        <span className="h-4 w-4 opacity-90 group-hover:opacity-100">
          {icon}
        </span>

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
  };

  return (
    <div className="mt-6 rounded-xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-surface)]">
      {/* ================= TOP BAR ================= */}
      <div className="px-4 py-3 border-b border-[var(--border-default)]">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Título */}
          <h1 className="text-xl font-bold text-[var(--text-primary)] whitespace-nowrap">
            All Users
          </h1>

          {/* Search */}
          <div className="relative w-[260px]">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for..."
              className="
          h-9 w-full rounded-md
          pl-9 pr-3 text-sm
          bg-[var(--bg-surface)]
          border border-[var(--border-default)]
          text-[var(--text-primary)]
          placeholder-[var(--text-muted)]
          focus:outline-none focus:border-[var(--accent)]
        "
            />
            <MagnifyingGlassIcon
              className="
          absolute left-3 top-1/2 -translate-y-1/2
          h-4 w-4 text-[var(--text-secondary)]
        "
            />
          </div>

          {/* Toggle filtros */}
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="
        h-9 px-3
        flex items-center
        rounded-md
        border border-[var(--border-default)]
        text-sm
        text-[var(--text-secondary)]
        hover:text-[var(--text-primary)]
        hover:bg-[var(--bg-hover)]
        transition
        whitespace-nowrap
      "
          >
            {showFilters ? "−" : "+ More filters"}
          </button>

          {/* FILTROS (AL COSTADO) */}
          {showFilters && (
            <>
              <input
                placeholder="Filter by name"
                value={filters.name}
                onChange={(e) =>
                  onFiltersChange({ ...filters, name: e.target.value })
                }
                className="h-9 w-[160px] rounded-md px-3 text-sm border border-[var(--border-default)]"
              />

              <input
                placeholder="Company"
                value={filters.company}
                onChange={(e) =>
                  onFiltersChange({ ...filters, company: e.target.value })
                }
                className="h-9 w-[160px] rounded-md px-3 text-sm border border-[var(--border-default)]"
              />

              <StatusSelect
                allowAll
                value={filters.status}
                onChange={(status) => onFiltersChange({ ...filters, status })}
                className="w-[150px]"
              />
            </>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Rango */}
          <span className="text-sm text-[var(--text-secondary)] whitespace-nowrap">
            <span className="text-[var(--accent)]">
              {start}–{end}
            </span>{" "}
            of {total}
          </span>
        </div>
      </div>

      {/* ================= TABLE WRAPPER ================= */}
      <div className="relative max-h-[520px] overflow-auto dark-scroll">
        <table className="min-w-[900px] w-full text-sm border-collapse">
          {/* ===== HEADER ===== */}
          <thead className="sticky top-0 z-20 bg-[var(--bg-surface)] text-xs">
            <tr className="border-t border-[var(--border-default)]">
              <th className="px-4 py-3 w-8">
                <Checkbox checked={allSelected} onChange={toggleAll} />
              </th>
              <th className="px-4 py-3">
                <Header label="Name" icon={<UserSolid />} columnKey="name" />
              </th>
              <th className="px-4 py-3">
                <Header label="Phone" icon={<PhoneSolid />} columnKey="phone" />
              </th>
              <th className="px-4 py-3">
                <Header
                  label="Location"
                  icon={<MapPinSolid />}
                  columnKey="location"
                />
              </th>
              <th className="px-4 py-3">
                <Header
                  label="Company"
                  icon={<BackspaceSolid />}
                  columnKey="company"
                />
              </th>
              <th className="px-4 py-3">
                <Header
                  label="Status"
                  icon={<CheckCircleSolid />}
                  columnKey="status"
                />
              </th>
              <th className="px-4 py-3 w-[96px]" />
            </tr>
          </thead>

          {/* ===== BODY ===== */}
          <tbody className={loading ? "pointer-events-none opacity-70" : ""}>
            {!loading && users.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-16 text-center text-sm text-[var(--text-secondary)]"
                >
                  <div className="flex flex-col items-center gap-3">
                    <MagnifyingGlassIcon className="h-6 w-6 text-[var(--text-muted)]" />

                    <span className="font-medium text-[var(--text-primary)]">
                      No se encontraron registros
                    </span>

                    {search && (
                      <span className="text-xs text-[var(--text-muted)]">
                        Probá con otro término de búsqueda
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            )}

            {users.map((u, index) => {
              const isChecked = selected.includes(u.id);

              return (
                <tr
                  key={u.id}
                  className={`
                    border-t border-[var(--border-default)]
                    ${
                      isChecked
                        ? "bg-[var(--bg-selected)]"
                        : index % 2 === 0
                        ? "bg-[var(--bg-row-odd)]"
                        : "bg-[var(--bg-row-even)]"
                    }
                    hover:bg-[var(--bg-hover)]
                  `}
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={isChecked}
                      onChange={(c) => toggleOne(u.id, c)}
                    />
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium text-white">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-[var(--text-primary)]">
                          {u.name}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          {u.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">
                    {u.phone}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">
                    {u.location}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">
                    {u.company}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={u.status} />
                  </td>

                  <td className="px-2 py-3 text-center">
                    <div className="flex justify-center gap-2 -translate-x-4">
                      <IconAction
                        hoverClass="hover:text-[var(--accent)]"
                        label="Edit user"
                        onClick={() => onEdit(u)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconAction>

                      <IconAction
                        hoverClass="hover:text-[var(--danger)]"
                        label="Delete user"
                        onClick={() => onDelete(u)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconAction>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* ===== LOADING OVERLAY ===== */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <Spinner size={32} />
          </div>
        )}
      </div>
    </div>
  );
}
