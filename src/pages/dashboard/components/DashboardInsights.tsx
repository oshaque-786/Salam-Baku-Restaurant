import { memo } from "react";
import { Lightbulb } from "lucide-react";

interface Props {

  busiestDay: string;

  peakHour: string;

  cancellationRate: number;

  recommendation: string;

}

function DashboardInsights({

  busiestDay,

  peakHour,

  cancellationRate,

  recommendation,

}: Props) {

  return (

    <div
      className="
      rounded-2xl
      border
      border-cyan-500/20
      bg-gradient-to-br
      from-slate-900
      to-slate-800
      p-6
      shadow-xl
      "
    >

      <div className="mb-5 flex items-center gap-3">

        <Lightbulb className="h-6 w-6 text-cyan-400"/>

        <h2 className="text-xl font-semibold text-white">

          AI Insights

        </h2>

      </div>

      <div className="grid gap-5 md:grid-cols-3">

        <div>

          <div className="text-xs text-white/40">

            Busiest Day

          </div>

          <div className="text-lg font-semibold text-cyan-400">

            {busiestDay}

          </div>

        </div>

        <div>

          <div className="text-xs text-white/40">

            Peak Hour

          </div>

          <div className="text-lg font-semibold text-cyan-400">

            {peakHour}:00

          </div>

        </div>

        <div>

          <div className="text-xs text-white/40">

            Cancellation Rate

          </div>

          <div className="text-lg font-semibold text-red-400">

            {cancellationRate}%

          </div>

        </div>

      </div>

      <div
        className="
        mt-6
        rounded-xl
        bg-cyan-500/10
        p-4
        text-sm
        text-white/80
        "
      >

        💡 {recommendation}

      </div>

    </div>

  );

}

export default memo(DashboardInsights);