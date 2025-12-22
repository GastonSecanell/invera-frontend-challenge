import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

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
    <div className="mt-4 flex items-center justify-end gap-6 text-sm text-[#BABABA]">
      {/* Rows per page */}
      <div className="flex items-center gap-2">
        <span>Rows per page</span>
        <select
          className="
        bg-[#1A1A1A]
        border border-[#5F5F5F]
        rounded-md
        px-2 py-1
        text-[#BABABA]
        focus:outline-none focus:border-[#7B99FF]
      "
          value={perPage}
          onChange={(e) => {
            onPageChange(1);
            onPerPageChange(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n} className="bg-[#121212]">
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Range */}
      <span>
        <span className="text-[#7B99FF]">
          {start}–{end}
        </span>
        <span className="text-[#BABABA]"> of {total}</span>
      </span>

      {/* Arrows */}
      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="
        h-8 w-8 flex items-center justify-center
        rounded-md
        border border-[#7B99FF]
        text-[#7B99FF]
        hover:bg-[#7B99FF]/10
        disabled:opacity-40
      "
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="
        h-8 w-8 flex items-center justify-center
        rounded-md
        border border-[#7B99FF]
        text-[#7B99FF]
        hover:bg-[#7B99FF]/10
        disabled:opacity-40
      "
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
