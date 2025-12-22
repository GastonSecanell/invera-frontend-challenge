"use client";

import { PieChart, Pie, Cell } from "recharts";
import { userTypeData } from "./usersStatsData";

export default function UsersDonutChart() {
  return (
    <div className="flex items-center gap-8">
      {/* Donut */}
      <div className="relative">
        <PieChart width={180} height={180}>
          <Pie
            data={userTypeData}
            dataKey="value"
            innerRadius={65}
            outerRadius={85}
            paddingAngle={3}
          >
            {userTypeData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>

        {/* Texto central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold text-white">150k</span>
          <span className="text-xs text-gray-400">users</span>
        </div>
      </div>

      {/* Leyenda */}
      <div className="space-y-2">
        {userTypeData.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-300">{item.name}</span>
            <span className="ml-auto text-gray-400">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
