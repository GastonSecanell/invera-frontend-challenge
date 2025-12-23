import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

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
    <div className="mt-4 w-full flex items-center justify-between text-[var(--text-secondary)]">
      {/* Range LEFT */}
      <div className="flex items-center gap-2 text-lg">
        <span>
          <span className="text-[var(--accent)]">
            {start}–{end}
          </span>
          <span className="text-[var(--text-secondary)]"> of {total}</span>
        </span>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>

          <div className="relative">
            <select
              value={perPage}
              onChange={(e) => {
                onPageChange(1);
                onPerPageChange(Number(e.target.value));
              }}
              className="
                h-8 rounded-md pl-2 pr-8
                bg-[var(--bg-surface)]
                border border-[var(--border-default)]
                text-[var(--text-primary)]
                appearance-none
                focus:outline-none
                focus:border-[var(--accent)]
              "
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            {/* Flecha custom */}
            <ChevronDownIcon
              className="
                pointer-events-none
                absolute right-2 top-1/2 -translate-y-1/2
                h-4 w-4
                text-[var(--chart-organic)]
              "
            />
          </div>
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2 ml-9">
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="
              h-7 w-7 flex items-center justify-center
              rounded-md
              bg-[var(--bg-surface)]
              border border-[var(--border-default)]
              text-[var(--chart-organic)]
              hover:border-[var(--accent)]
              hover:text-[var(--accent)]
              transition
            "
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="
              h-7 w-7 flex items-center justify-center
              rounded-md
              bg-[var(--bg-surface)]
              border border-[var(--border-default)]
              text-[var(--chart-organic)]
              hover:border-[var(--accent)]
              hover:text-[var(--accent)]
              transition
            "
          >
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
