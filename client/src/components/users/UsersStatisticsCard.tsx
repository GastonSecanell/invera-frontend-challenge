"use client";

import UsersDonutChart from "./UsersDonutChart";

interface Props {
  title: string;
}

export default function UsersStatisticsCard({ title }: Props) {
  return (
    <div
      className="
        mt-6 rounded-xl p-6
        bg-[var(--bg-surface)]
        border border-[var(--border-default)]
      "
    >
      <h2 className="mb-4 font-bold text-[var(--text-primary)]">
        {title}
      </h2>

      <UsersDonutChart />
    </div>
  );
}
