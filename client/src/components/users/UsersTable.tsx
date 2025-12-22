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

/* Types */
type SortDir = "asc" | "desc";
type SortKey = "name" | "location" | "phone" | "company" | "status";

interface Props {
  users?: User[];
  page: number;
  perPage: number;
  total: number;
}

/* Component */
export default function UsersTable({
  users = [],
  page,
  perPage,
  total,
}: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir } | null>(null);

  const allSelected = users.length > 0 && selected.length === users.length;

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? users.map((u) => u.id) : []);
  };

  const toggleOne = (id: number, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const toggleSort = (key: SortKey) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: "asc" };
      return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
    });
  };

  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  /* Header cell reusable */
  const Header = ({
    label,
    icon,
    sortKey,
  }: {
    label: string;
    icon: React.ReactNode;
    sortKey: SortKey;
  }) => {
    const active = sort?.key === sortKey;
    const dir = sort?.dir;

    return (
      <button
        onClick={() => toggleSort(sortKey)}
        className="flex items-center gap-2 group select-none"
      >
        <span
          className={`
            h-4 w-4
            ${active ? "text-[#7B99FF]" : "text-[#BABABA]"}
          `}
        >
          {icon}
        </span>

        <span
          className={`font-bold ${
            active ? "text-[#7B99FF]" : "text-[#BABABA]"
          }`}
        >
          {label}
        </span>

        <span className="flex flex-col">
          <ChevronUpIcon
            className={`h-3 w-3 ${
              active && dir === "asc"
                ? "text-[#7B99FF]"
                : "text-[#5F5F5F] group-hover:text-[#BABABA]"
            }`}
          />
          <ChevronDownIcon
            className={`h-3 w-3 -mt-1 ${
              active && dir === "desc"
                ? "text-[#7B99FF]"
                : "text-[#5F5F5F] group-hover:text-[#BABABA]"
            }`}
          />
        </span>
      </button>
    );
  };

  const sortUsers = (
    users: User[],
    sort: { key: SortKey; dir: "asc" | "desc" } | null
  ) => {
    if (!sort) return users;

    const { key, dir } = sort;
    const factor = dir === "asc" ? 1 : -1;

    return [...users].sort((a, b) => {
      const aVal = (a[key] ?? "").toString().toLowerCase();
      const bVal = (b[key] ?? "").toString().toLowerCase();

      if (aVal < bVal) return -1 * factor;
      if (aVal > bVal) return 1 * factor;
      return 0;
    });
  };

  const sortedUsers = sortUsers(users, sort);

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-[#5F5F5F] bg-[#1A1A1A]">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#5F5F5F]">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-white ms-5">All Users</h1>

          <div className="relative">
            <input
              type="text"
              placeholder="Search for..."
              className="
                h-9 w-[350px]
                rounded-md
                border border-[#5F5F5F]
                bg-[#1A1A1A]
                pl-9 pr-3
                text-sm text-[#BABABA]
                placeholder-[#6F6F6F]
                focus:outline-none focus:border-[#7B99FF]
              "
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#BABABA]" />
          </div>
        </div>

        <span className="text-xs">
          <span className="text-[#7B99FF]">
            {start}–{end}
          </span>
          <span className="text-[#BABABA]"> of {total}</span>
        </span>
      </div>

      {/* ================= TABLE ================= */}
      <table className="w-full text-sm">
        <thead className="bg-[#1A1A1A] text-xs">
          <tr className="border-t border-[#5F5F5F]">
            <th className="px-4 py-3 w-8">
              <Checkbox checked={allSelected} onChange={toggleAll} />
            </th>

            <th className="px-4 py-3">
              <Header label="Name" icon={<UserIcon />} sortKey="name" />
            </th>

            <th className="px-4 py-3">
              <Header
                label="Location"
                icon={<MapPinIcon />}
                sortKey="location"
              />
            </th>

            <th className="px-4 py-3">
              <Header label="Phone" icon={<PhoneIcon />} sortKey="phone" />
            </th>

            <th className="px-4 py-3">
              <Header
                label="Company"
                icon={<BuildingOfficeIcon />}
                sortKey="company"
              />
            </th>

            <th className="px-4 py-3">
              <Header
                label="Status"
                icon={<CheckCircleIcon />}
                sortKey="status"
              />
            </th>

            <th className="px-4 py-3 text-right" />
          </tr>
        </thead>

        <tbody>
          {sortedUsers.map((u) => {
            const isChecked = selected.includes(u.id);

            return (
              <tr
                key={u.id}
                className={`border-t border-[#5F5F5F] transition ${
                  isChecked ? "bg-[#181818]" : "hover:bg-[#1a1a1a]"
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
                      <div className="text-xs text-gray-400">{u.email}</div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-gray-300">{u.location}</td>
                <td className="px-4 py-3 text-gray-300">{u.phone}</td>
                <td className="px-4 py-3 text-gray-300">{u.company}</td>

                <td className="px-4 py-3">
                  <StatusBadge status={u.status as "Online" | "Offline"} />
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <button className="text-gray-400 hover:text-white">
                      <PencilSquareIcon className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-400">
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
  );
}
