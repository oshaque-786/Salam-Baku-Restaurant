import { LazyMotion, domAnimation, m } from "motion/react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { CHART_COLORS } from "../../constants";

interface Props {
  reservationStatusData: any[];
}

export default function StatusPieChart({
  reservationStatusData,
}: Props) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">
        Reservation Status
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          minHeight={0}
        >
          <PieChart>
            <Pie
              data={reservationStatusData}
              cx="50%"
              cy="50%"
              outerRadius={95}
              dataKey="value"
              label
            >
              {reservationStatusData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    CHART_COLORS[
                      index % CHART_COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </m.div>
  );
}