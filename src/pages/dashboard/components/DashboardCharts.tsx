import React, { memo, lazy, Suspense } from "react";
import { LazyMotion, domAnimation } from "motion/react";

const StatusPieChart = lazy(() => import("./charts/StatusPieChart"));
const MonthlyBarChart = lazy(() => import("./charts/MonthlyBarChart"));
const HourlyLineChart = lazy(() => import("./charts/HourlyLineChart"));

interface DashboardChartsProps {
  reservationStatusData: any[];
  monthlyData: any[];
  hourlyData: any[];
}

function DashboardCharts({
  reservationStatusData,
  monthlyData,
  hourlyData,
}: DashboardChartsProps) {
  return (
    <LazyMotion features={domAnimation}>
      <Suspense
        fallback={
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-white">
            Loading charts...
          </div>
        }
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <StatusPieChart
            reservationStatusData={reservationStatusData}
          />

          <MonthlyBarChart
            monthlyData={monthlyData}
          />
        </div>

        <HourlyLineChart
          hourlyData={hourlyData}
        />
      </Suspense>
    </LazyMotion>
  );
}

export default memo(DashboardCharts);