"use client";

import { User } from "@/types/user";
import Checkbox from "@/components/ui/Checkbox";
import StatusBadge from "@/components/ui/StatusBadge";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import UserAvatar from "@/components/ui/UserAvatar";
import CompanyAvatar from "@/components/ui/CompanyAvatar";

type Props = {
  user: User;
  index: number;
  selected: boolean;
  onToggle: (checked: boolean) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  t: {
    editUser: string;
    deleteUser: string;
  };
};

export default function UsersTableRow({
  user,
  index,
  selected,
  onToggle,
  onEdit,
  onDelete,
  t,
}: Props) {
  return (
    <tr
      className={`
        animate-row-enter
        border-t border-[var(--border-default)]
        ${
          selected
            ? "bg-[var(--bg-selected)]"
            : index % 2 === 0
            ? "bg-[var(--bg-row-odd)]"
            : "bg-[var(--bg-row-even)]"
        }
        hover:bg-[var(--bg-hover)]
        transition-colors
      `}
    >
      {/* Checkbox */}
      <td className="px-4 py-3">
        <Checkbox checked={selected} onChange={onToggle} />
      </td>

      {/* User */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full flex items-center justify-center overflow-hidden">
            <UserAvatar name={user.name} userId={user.id} />
          </div>
          <div>
            <div className="font-medium text-[var(--text-primary)]">
              {user.name}
            </div>
            <div className="text-xs text-[var(--text-secondary)]">
              {user.email}
            </div>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-[var(--text-secondary)]">{user.phone}</td>

      <td className="px-4 py-3 text-[var(--text-secondary)]">
        {user.location}
      </td>

      <td className="px-4 py-3 text-[var(--text-secondary)]">
        <div className="flex items-center gap-2">
          <CompanyAvatar company={user.company} />
          <span className="text-sm text-[var(--text-primary)]">
            {user.company}
          </span>
        </div>
      </td>

      <td className="px-4 py-3">
        <StatusBadge status={user.status} />
      </td>

      {/* Actions */}
      <td className="px-2 py-3 text-center">
        <div className="flex justify-center gap-2 -translate-x-4">
          <button
            title={t.editUser}
            aria-label={t.editUser}
            onClick={() => onEdit(user)}
            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <PencilIcon className="h-4 w-4" />
          </button>

          <button
            title={t.deleteUser}
            aria-label={t.deleteUser}
            onClick={() => onDelete(user)}
            className="text-[var(--text-secondary)] hover:text-[var(--danger)] transition-colors"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
