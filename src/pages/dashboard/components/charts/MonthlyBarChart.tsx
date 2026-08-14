import { LazyMotion, domAnimation, m } from "motion/react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  monthlyData: any[];
}

export default function MonthlyBarChart({
  monthlyData,
}: Props) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">
        Monthly Reservations
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          minHeight={0}
        >
          <BarChart data={monthlyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#333"
            />

            <XAxis
              dataKey="month"
              stroke="#ffffff"
            />

            <YAxis stroke="#ffffff" />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="reservations"
              fill="#00E5FF"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </m.div>
  );
}