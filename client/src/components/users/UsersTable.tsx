"use client";

import { useState } from "react";
import { User } from "@/types/user";
import StatusBadge from "@/components/ui/StatusBadge";
import Checkbox from "@/components/ui/Checkbox";

import {
  ChevronUpIcon,
  ChevronDownIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

/* ================= TYPES ================= */
type SortDir = "asc" | "desc";

interface Props {
  users: User[];
  page: number;
  perPage: number;
  total: number;

  sortKey?: keyof User;
  sortDir?: "asc" | "desc";
  onSortChange: (key: keyof User) => void;

  search: string;
  onSearchChange: (value: string) => void;
}

/* ================= COMPONENT ================= */
export default function UsersTable({
  users,
  page,
  perPage,
  total,
  sortKey,
  sortDir,
  onSortChange,
  search,
  onSearchChange,
}: Props) {
  const [selected, setSelected] = useState<number[]>([]);

  const allSelected = users.length > 0 && selected.length === users.length;

  const toggleAll = (checked: boolean) =>
    setSelected(checked ? users.map((u) => u.id) : []);

  const toggleOne = (id: number, checked: boolean) =>
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );

  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  /* ================= HEADER CELL ================= */
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
        className="flex items-center gap-2 group select-none"
      >
        <span
          className={`h-4 w-4 ${active ? "text-[#7B99FF]" : "text-[#BABABA]"}`}
        >
          {icon}
        </span>

        <span
          className={`font-medium ${
            active ? "text-[#7B99FF]" : "text-[#BABABA]"
          }`}
        >
          {label}
        </span>

        <span className="flex flex-col">
          <ChevronUpIcon
            className={`h-3 w-3 ${
              active && sortDir === "asc"
                ? "text-[#7B99FF]"
                : "text-[#5F5F5F] group-hover:text-[#BABABA]"
            }`}
          />
          <ChevronDownIcon
            className={`h-3 w-3 -mt-1 ${
              active && sortDir === "desc"
                ? "text-[#7B99FF]"
                : "text-[#5F5F5F] group-hover:text-[#BABABA]"
            }`}
          />
        </span>
      </button>
    );
  };

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-[#5F5F5F] bg-[#1A1A1A]">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#5F5F5F]">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-white ms-5">All Users</h1>

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for..."
              className="
                h-9 w-[350px]
                rounded-md
                border border-[#5F5F5F]
                bg-[#1A1A1A]
                pl-9 pr-3
                text-sm text-[#BABABA]
                placeholder-[#7A7A7A]
                focus:outline-none focus:border-[#7B99FF]
              "
            />

            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#BABABA]" />
          </div>
        </div>

        <span className="text-xs text-[#BABABA]">
          <span className="text-[#7B99FF]">
            {start}–{end}
          </span>{" "}
          of {total}
        </span>
      </div>

      {/* ================= TABLE ================= */}
      <div className="relative max-h-[520px] overflow-y-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="sticky top-0 bg-[#1A1A1A] text-xs">
            <tr className="border-t border-[#5F5F5F]">
              <th className="px-4 py-3 w-8">
                <Checkbox checked={allSelected} onChange={toggleAll} />
              </th>

              <th className="px-4 py-3">
                <Header label="Name" icon={<UserIcon />} columnKey="name" />
              </th>
              <th className="px-4 py-3">
                <Header
                  label="Location"
                  icon={<MapPinIcon />}
                  columnKey="location"
                />
              </th>
              <th className="px-4 py-3">
                <Header label="Phone" icon={<PhoneIcon />} columnKey="phone" />
              </th>
              <th className="px-4 py-3">
                <Header
                  label="Company"
                  icon={<BuildingOfficeIcon />}
                  columnKey="company"
                />
              </th>
              <th className="px-4 py-3">
                <Header
                  label="Status"
                  icon={<CheckCircleIcon />}
                  columnKey="status"
                />
              </th>

              <th className="px-4 py-3 w-[96px]" />
            </tr>
          </thead>

          <tbody>
            {users.map((u) => {
              const isChecked = selected.includes(u.id);

              return (
                <tr
                  key={u.id}
                  className={`border-t border-[#5F5F5F] hover:bg-[#222] ${
                    isChecked ? "bg-[#242424]" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={isChecked}
                      onChange={(c) => toggleOne(u.id, c)}
                    />
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#1f2937] flex items-center justify-center text-sm font-medium text-white">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{u.name}</div>
                        <div className="text-xs text-[#BABABA]">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-[#BABABA]">{u.location}</td>
                  <td className="px-4 py-3 text-[#BABABA]">{u.phone}</td>
                  <td className="px-4 py-3 text-[#BABABA]">{u.company}</td>

                  <td className="px-4 py-3">
                    <StatusBadge status={u.status} />
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-3">
                      <button className="text-[#BABABA] hover:text-white">
                        <PencilSquareIcon className="h-4 w-4" />
                      </button>
                      <button className="text-[#BABABA] hover:text-red-500">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
