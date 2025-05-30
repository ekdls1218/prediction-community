"use client";
import { PieChart, Pie, Cell } from "recharts";

interface CategoryStat {
  name: string;
  value: number;
}

interface CategoryStatProps {
  categoryStat : CategoryStat
}

export default function CategoryPieChart({categoryStat} : CategoryStatProps) {
  const data = [
    { name: "progress", value: categoryStat.value },
    { name: "rest", value: 100 - categoryStat.value },
  ];
  const COLORS = ["url(#gradient)", "#E5E7EB"]; // 보라-파랑 그라데이션 + 회색 배경
  return (
    <PieChart width={100} height={100}>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B82F6" /> {/* blue-500 */}
          <stop offset="100%" stopColor="#8B5FBF" /> {/* violet-500 */}
        </linearGradient>
      </defs>

      <Pie
        data={data}
        cx="50%"
        cy="50%"
        startAngle={90}
        endAngle={-270}
        innerRadius={30}
        outerRadius={45}
        dataKey="value"
        stroke="none"
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>

      {/* 중앙 텍스트 */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-sm font-semibold fill-gray-700"
      >
        {categoryStat.value}%
        <span />
      </text>
    </PieChart>
  );
}
