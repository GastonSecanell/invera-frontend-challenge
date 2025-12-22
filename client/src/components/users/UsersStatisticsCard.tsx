import UsersDonutChart from "./UsersDonutChart";

export default function UsersStatisticsCard() {
  return (
    <div className="mt-6 rounded-xl border border-[#5F5F5F] bg-[#1A1A1A] p-6">
      <h1 className="text-xl font-bold text-white mb-4">Statistics</h1>

      <UsersDonutChart />
    </div>
  );
}
