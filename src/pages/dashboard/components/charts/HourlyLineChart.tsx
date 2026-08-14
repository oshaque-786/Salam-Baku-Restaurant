import { LazyMotion, domAnimation, m } from "motion/react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  hourlyData: any[];
}

export default function HourlyLineChart({
  hourlyData,
}: Props) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">
        Busy Reservation Hours
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          minHeight={0}
        >
          <LineChart data={hourlyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#333"
            />

            <XAxis
              dataKey="hour"
              stroke="#ffffff"
            />

            <YAxis stroke="#ffffff" />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="reservations"
              stroke="#00E5FF"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#00E5FF",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </m.div>
  );
}