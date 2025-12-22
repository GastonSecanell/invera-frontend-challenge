import {
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export type SortDir = "asc" | "desc";

interface Props {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  dir?: SortDir;
  onClick: () => void;
}

export default function SortableHeader({
  label,
  icon,
  active,
  dir,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 group select-none"
    >
      {/* Icon + label */}
      <span className="flex items-center gap-2">
        <span
          className={`
            h-4 w-4
            ${active ? "text-[#7B99FF]" : "text-[#BABABA]"}
          `}
        >
          {icon}
        </span>

        <span
          className={`
            font-medium
            ${active ? "text-[#7B99FF]" : "text-[#BABABA]"}
          `}
        >
          {label}
        </span>
      </span>

      {/* Sort arrows */}
      <span className="flex flex-col -gap-1">
        <ChevronUpIcon
          className={`
            h-3 w-3
            ${
              active && dir === "asc"
                ? "text-[#7B99FF]"
                : "text-[#5F5F5F] group-hover:text-[#BABABA]"
            }
          `}
        />
        <ChevronDownIcon
          className={`
            h-3 w-3 -mt-1
            ${
              active && dir === "desc"
                ? "text-[#7B99FF]"
                : "text-[#5F5F5F] group-hover:text-[#BABABA]"
            }
          `}
        />
      </span>
    </button>
  );
}
