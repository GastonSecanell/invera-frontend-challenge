"use client";

import { PieChart, Pie, Cell } from "recharts";
import { useUserTypes } from "@/hooks/useUserTypes";
import { formatCompactNumber } from "@/utils/formatNumber";
import Spinner from "@/components/ui/Spinner";

type Item = {
  name: string;
  value: number;
  color: string;
};

const TRACK = "rgba(255,255,255,0.08)";

const COLORS: Record<string, string> = {
  Organic: "#7B99FF",
  Social: "#C9D7FD",
  Direct: "#28E384",
};

export default function UsersDonutChart() {
  const { data, loading, error } = useUserTypes();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[220px]">
        <Spinner size={32} />
      </div>
    );
  }

  if (error || !data) return null;

  const items: Item[] = data.distribution.map((d) => ({
    name: d.type,
    value: d.percentage,
    color: COLORS[d.type] ?? "#999999",
  }));

  const rings = [
    { inner: 74, outer: 86 },
    { inner: 62, outer: 72 },
    { inner: 50, outer: 60 },
  ];

  return (
    <div className="w-full flex justify-center">
      {/* BLOQUE CENTRAL */}
      <div
        className="
          flex flex-col items-center gap-8
          sm:flex-row sm:items-center sm:gap-14
          max-w-[640px] w-full
        "
      >
        {/* ================= CHART ================= */}
        <div className="relative flex-shrink-0">
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
                  startAngle={180}
                  endAngle={-180}
                  innerRadius={r.inner}
                  outerRadius={r.outer}
                  stroke="none"
                  isAnimationActive={false}
                >
                  <Cell fill={item.color} />
                  <Cell fill={TRACK} />
                </Pie>
              );
            })}
          </PieChart>

          {/* CENTER */}
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

        {/* ================= LEGEND ================= */}
        <div className="w-full sm:w-[260px] space-y-5">
          {items.map((item) => (
            <div
              key={item.name}
              className="
                grid grid-cols-[auto_1fr_auto]
                items-center gap-4
                text-sm text-white
              "
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
              <span className="font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
