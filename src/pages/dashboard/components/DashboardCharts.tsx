import { motion } from "motion/react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";

import { CHART_COLORS } from "../constants";

interface DashboardChartsProps {
  reservationStatusData: any[];
  monthlyData: any[];
  hourlyData: any[];
}

export default function DashboardCharts({
  reservationStatusData,
  monthlyData,
  hourlyData,
}: DashboardChartsProps) {
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* Reservation Status */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">
            Reservation Status
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
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
        </motion.div>

        {/* Monthly */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.10 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6">
            Monthly Reservations
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
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
        </motion.div>
      </div>

      {/* Hourly */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.20 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-white mb-6">
          Busy Reservation Hours
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
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
      </motion.div>
    </>
  );
}