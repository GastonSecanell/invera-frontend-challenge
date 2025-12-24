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

const TRACK = "var(--chart-track)";

const COLORS: Record<string, string> = {
  Organic: "var(--chart-organic)",
  Social: "var(--chart-social)",
  Direct: "var(--chart-direct)",
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
    color: COLORS[d.type],
  }));

  const rings = [
    { inner: 93, outer: 100 },
    { inner: 81, outer: 88 },
    { inner: 70, outer: 76 },
  ];

  return (
    <div className="w-full flex justify-center">
      {/* ================= CONTAINER ================= */}
      <div
        className="
          flex flex-col items-center gap-8
          sm:flex-row sm:items-center sm:justify-between
          lg:gap-28
          w-full max-w-full lg:max-w-[960px]
        "
      >
        {/* ================= CHART ================= */}
        <div className="relative flex-shrink-0 sm:ml-2 lg:ml-4">
          <PieChart width={200} height={200}>
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
                  isAnimationActive
                  animationDuration={900}
                  animationEasing="ease-out"
                >
                  <Cell fill={item.color} />
                  <Cell fill={TRACK} />
                </Pie>
              );
            })}
          </PieChart>

          {/* ================= CENTER ================= */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="leading-none">
              <div className="text-3xl font-semibold text-[var(--text-primary)]">
                {formatCompactNumber(data.totalUsers)}
              </div>
              <div className="text-xl font-semibold text-[var(--text-primary)] -mt-1">
                users
              </div>
            </div>
          </div>
        </div>

        {/* ================= LEGEND ================= */}
        <div className="w-full sm:w-[500px] space-y-5">
          {items.map((item) => (
            <div
              key={item.name}
              className="
                grid grid-cols-[20px_1fr_56px]
                items-center
                text-sm
              "
            >
              {/* DOT */}
              <span
                className="h-2.5 w-2.5 rounded-full justify-self-start"
                style={{ backgroundColor: item.color }}
              />

              {/* NAME (CENTERED) */}
              <span className="justify-self-start text-[var(--text-primary)]">
                {item.name}
              </span>

              {/* VALUE (RIGHT) */}
              <span className="text-right font-medium text-[var(--text-primary)]">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
