import { User } from "@/types/user";
import StatusBadge from "@/components/ui/StatusBadge";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  users?: User[];
}

export default function UsersTable({ users = [] }: Props) {
  if (!users.length) {
    return (
      <div className="mt-6 text-sm text-gray-400">
        No hay usuarios para mostrar
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-gray-800 bg-[#121212]">
      <table className="w-full text-sm">
        <thead className="bg-[#1b1b1b] text-gray-400">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Nombre</th>
            <th className="px-4 py-3 text-left font-medium">Empresa</th>
            <th className="px-4 py-3 text-left font-medium">Email</th>
            <th className="px-4 py-3 text-left font-medium">Estado</th>
            <th className="px-4 py-3 text-right font-medium"></th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="border-t border-gray-800 hover:bg-[#1a1a1a] transition"
            >
              {/* Usuario */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white">
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-white">{u.name}</div>
                    <div className="text-xs text-gray-400">{u.location}</div>
                  </div>
                </div>
              </td>

              {/* Empresa */}
              <td className="px-4 py-3 text-gray-300">{u.company}</td>

              {/* Email */}
              <td className="px-4 py-3 text-gray-400">{u.email}</td>

              {/* Estado */}
              <td className="px-4 py-3">
                <StatusBadge status={u.status} />
              </td>

              {/* Acciones */}
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3">
                  <button
                    className="text-gray-400 hover:text-white transition"
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="text-gray-400 hover:text-red-400 transition"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
