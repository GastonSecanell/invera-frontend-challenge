"use client";

import { useState } from "react";
import { User, UserFilters } from "@/types/user";
import Checkbox from "@/components/ui/Checkbox";
import Spinner from "@/components/ui/Spinner";
import { messages } from "@/i18n/messages";

import UsersTableToolbar from "./UsersTableToolbar";
import UsersTableHeader from "./UsersTableHeader";
import UsersTableRow from "./UsersTableRow";

import {
  UserIcon as UserSolid,
  PhoneIcon as PhoneSolid,
  MapPinIcon as MapPinSolid,
  CheckCircleIcon as CheckCircleSolid,
  BriefcaseIcon as BackspaceSolid,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

/* ================= TYPES ================= */
type Translations = typeof messages.en;

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
  onResetFilters: () => void;

  sortKey?: keyof User;
  sortDir?: "asc" | "desc";
  onSortChange: (key: keyof User) => void;

  onEdit: (user: User) => void;
  onDelete: (user: User) => void;

  t: Translations;
}

/* ================= COMPONENT ================= */
export default function UsersTable({
  t,
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
  filters,
  onFiltersChange,
  onResetFilters,
  onEdit,
  onDelete,
}: Props) {
  /* ================= STATE ================= */
  const [selected, setSelected] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  /* ================= SELECTION ================= */
  const allSelected = users.length > 0 && selected.length === users.length;

  const toggleAll = (checked: boolean) =>
    setSelected(checked ? users.map((u) => u.id) : []);

  const toggleOne = (id: number, checked: boolean) =>
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );

  /* ================= FILTER STATE ================= */
  const hasActiveFilters =
    Boolean(search) ||
    Boolean(filters.name) ||
    Boolean(filters.email) ||
    Boolean(filters.company) ||
    Boolean(filters.status);

  /* ================= PAGINATION INFO ================= */
  const effectiveTotal = total > 0 ? total : users.length;
  const start = users.length === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(start + users.length - 1, effectiveTotal);

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    { key: "name", label: "Name", icon: <UserSolid /> },
    { key: "phone", label: "Phone", icon: <PhoneSolid /> },
    { key: "location", label: "Location", icon: <MapPinSolid /> },
    { key: "company", label: "Company", icon: <BackspaceSolid /> },
    { key: "status", label: "Status", icon: <CheckCircleSolid /> },
  ] as const;

  return (
    <div className="mt-6 rounded-xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-surface)]">
      {/* ================= TOOLBAR ================= */}
      <UsersTableToolbar
        search={search}
        onSearchChange={onSearchChange}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onResetFilters={onResetFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        hasActiveFilters={hasActiveFilters}
        start={start}
        end={end}
        total={total}
        t={{
          moreFilters: t.moreFilters,
          closeFilters: t.closeFilters,
          clearFilters: t.clearFilters,
        }}
      />

      {/* ================= TABLE ================= */}
      <div className="relative max-h-[520px] overflow-auto dark-scroll">
        <table className="min-w-[900px] w-full text-sm border-collapse">
          {/* ===== HEADER ===== */}
          <UsersTableHeader
            columns={[...columns]}
            sortKey={sortKey}
            sortDir={sortDir}
            onSortChange={onSortChange}
            renderSelectAll={() => (
              <Checkbox checked={allSelected} onChange={toggleAll} />
            )}
          />

          {/* ===== BODY ===== */}
          <tbody className={loading ? "pointer-events-none opacity-70" : ""}>
            {!loading && users.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 2}
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

            {users.map((user, index) => (
              <UsersTableRow
                key={user.id}
                user={user}
                index={index}
                selected={selected.includes(user.id)}
                onToggle={(checked) => toggleOne(user.id, checked)}
                onEdit={onEdit}
                onDelete={onDelete}
                t={{
                  editUser: t.editUser,
                  deleteUser: t.deleteUser,
                }}
              />
            ))}
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
