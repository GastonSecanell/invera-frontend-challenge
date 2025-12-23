import UsersDonutChart from "./UsersDonutChart";

export default function UsersStatisticsCard() {
  return (
    <div
      className="
        mt-6 rounded-xl p-6
        bg-[var(--bg-surface)]
        border border-[var(--border-default)]
      "
    >
      <h1 className="font-bold text-[var(--text-primary)] mb-4">
        Statistics
      </h1>

      <UsersDonutChart />
    </div>
  );
}
