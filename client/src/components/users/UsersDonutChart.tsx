"use client";

import { PieChart, Pie, Cell } from "recharts";
import { useUserTypes } from "@/hooks/useUserTypes";
import { formatCompactNumber } from "@/utils/formatNumber";

type Item = {
  name: string;
  value: number;
  color: string;
};

const TRACK = "rgba(255,255,255,0.18)";

const COLORS: Record<string, string> = {
  Organic: "#7B99FF",
  Social: "#C9D7FD",
  Direct: "#28E384",
};

export default function UsersDonutChart() {
  const { data, loading, error } = useUserTypes();

  if (loading) {
    return <div className="text-sm text-[#BABABA]">Loading...</div>;
  }

  if (error || !data) {
    return null;
  }

  const items: Item[] = data.distribution.map((d) => ({
    name: d.type,
    value: d.percentage,
    color: COLORS[d.type] ?? "#999999",
  }));

  // Radios (outer → inner) para los anillos
  const rings = [
    { inner: 74, outer: 86 },
    { inner: 62, outer: 72 },
    { inner: 50, outer: 60 },
  ];

  return (
    <div className="flex items-center gap-10">
      {/* Chart */}
      <div className="relative">
        <PieChart width={190} height={190}>
          {items.slice(0, rings.length).map((item, i) => {
            const r = rings[i];
            const ringData = [
              { name: item.name, value: item.value },
              { name: "rest", value: Math.max(0, 100 - item.value) },
            ];

            return (
              <Pie
                key={item.name}
                data={ringData}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                innerRadius={r.inner}
                outerRadius={r.outer}
                paddingAngle={0}
                stroke="none"
                isAnimationActive={false}
              >
                <Cell fill={item.color} />
                <Cell fill={TRACK} />
              </Pie>
            );
          })}
        </PieChart>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="leading-none">
            <div className="text-4xl font-extrabold text-white">
              {formatCompactNumber(data.totalUsers)}
            </div>
            <div className="text-2xl font-extrabold text-white -mt-1">
              users
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="w-[320px] space-y-6">
        {items.map((item) => (
          <div key={item.name} className="flex items-center text-sm">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="ml-3 text-white">{item.name}</span>
            <span className="ml-auto text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
