import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (value: number) => void;
}

export default function UsersPagination({
  page,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
}: Props) {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="mt-4 flex items-center justify-end gap-6 text-sm text-gray-400">
      {/* Rows per page */}
      <div className="flex items-center gap-2">
        <span>Rows per page</span>
        <select
          className="bg-transparent border border-gray-700 rounded px-2 py-1 text-gray-300"
          value={perPage}
          onChange={(e) => {
            onPageChange(1);
            onPerPageChange(Number(e.target.value));
          }}
        >
          {[5, 10, 20].map((n) => (
            <option key={n} value={n} className="bg-[#121212]">
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Range */}
      <span>
        {start}–{end} of {total}
      </span>

      {/* Arrows */}
      <div className="flex items-center gap-1">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="p-1 rounded hover:bg-gray-800 disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="p-1 rounded hover:bg-gray-800 disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
