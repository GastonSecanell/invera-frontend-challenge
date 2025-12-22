import UsersDonutChart from "./UsersDonutChart";

export default function UsersStatisticsCard() {
  return (
    <div className="mt-6 rounded-xl border border-[#5F5F5F] bg-[#1A1A1A] p-6">
      <h2 className="mb-4 text-sm font-medium text-white">
        Statistics
      </h2>

      <UsersDonutChart />
    </div>
  );
}
