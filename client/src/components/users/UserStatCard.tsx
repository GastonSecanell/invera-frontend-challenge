import { ReactNode } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
  value: number;
  icon: ReactNode;
}

export default function UserStatCard({ title, value, icon }: Props) {
  return (
    <div className="
      flex items-center justify-between
      bg-[#1A1A1A]
      border border-[#5F5F5F]
      rounded-[8px]
      px-5 py-5
      min-h-[80px]
    ">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 text-blue-500">
          {icon}
        </div>

        <div>
          <p className="text-sm text-[#BABABA]">{title}</p>
          <p className="text-xl font-semibold text-white">{value}</p>
        </div>
      </div>

      <EllipsisVerticalIcon className="h-5 w-5 text-[#BABABA] cursor-pointer" />
    </div>
  );
}
