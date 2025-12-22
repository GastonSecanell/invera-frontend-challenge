import { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  icon: ReactNode;
}

export default function UserStatCard({ title, value, icon }: Props) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-800 bg-[#121212] p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 text-blue-500">
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-400">{title}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
