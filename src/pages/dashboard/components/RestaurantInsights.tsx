import { memo } from "react";

import {
  TrendingUp,
  TrendingDown,
  Brain,
  Flame,
  Activity,
  Gauge,
  Target,
  DollarSign,
  BrainCircuit,
  ShieldAlert,
  Users,
  Sparkles,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

interface Props {
  insights: any;
  executiveBrain: any;
}

function RestaurantInsights({
  insights,
  executiveBrain,
}: Props) {

const healthScore =
  Math.min(
    100,
    Math.max(
      0,
      70 +
      insights.weeklyGrowth -
      insights.cancellationRate
    )
  );

const revenueProjection =
  insights.forecastNextWeek.map(
    (day) => ({
      day: day.day,
      revenue:
        day.predicted * 45,
    })
  );

const staffProjection =
  insights.forecastNextWeek.map(
    (day) => ({
      day: day.day,
      staff:
        Math.max(
          2,
          Math.ceil(
            day.predicted / 25
          )
        ),
    })
  );

const occupancyData = [
  {
    name: "Occupancy",
    value:
      insights.utilizationRate,
  },
];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

      <div className="mb-6 flex items-center gap-2">
        <Brain className="h-5 w-5 text-cyan-400" />

        <h2 className="text-lg font-semibold text-white">
          Restaurant Intelligence
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Weekly Growth */}

        <div className="rounded-xl border border-white/10 bg-slate-800 p-4 sm:p-5">

          <div className="mb-2 text-sm text-white/50">
            Weekly Growth
          </div>

          <div className="flex items-center gap-3">

            {insights.trendDirection === "up" ? (

              <TrendingUp className="h-7 w-7 text-green-400" />

            ) : (

              <TrendingDown className="h-7 w-7 text-red-400" />

            )}

            <div>

              <div className="text-xl font-bold text-white sm:text-2xl">
                {insights.weeklyGrowth}%
              </div>

              <div className="text-sm text-cyan-400">
                {insights.growthLabel}
              </div>

            </div>

          </div>

        </div>

        {/* Busiest Day */}

        <div className="rounded-xl border border-white/10 bg-slate-800 p-5">

          <div className="mb-2 text-sm text-white/50">
            Busiest Day
          </div>

          <div className="flex items-center gap-3">

            <Flame className="h-7 w-7 text-orange-400" />

            <div>

              <div className="text-xl font-bold text-white">
                {insights.busiestWeekDay.day}
              </div>

              <div className="text-sm text-orange-400">
                {insights.busiestWeekDay.count} reservations
              </div>

            </div>

          </div>

        </div>

        {/* AI Recommendation */}

        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">

          <div className="mb-2 text-sm text-cyan-300">
            AI Recommendation
          </div>

          <div className="text-sm leading-6 text-white/80">
            {insights.weeklyRecommendation}
          </div>

        </div>

        <div className="rounded-xl border border-white/10 bg-slate-800 p-5">

          <div className="mb-2 flex items-center gap-2">

            <Target className="h-5 w-5 text-green-400" />

            <span className="text-sm text-white/50">
              Health Score
            </span>

          </div>

          <div className="text-4xl font-bold text-white">

            {healthScore}

          </div>

          <div className="mt-2 text-sm text-green-400">

            Overall Restaurant Performance

          </div>

        </div>

      </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-slate-800 p-6">

          <div className="mb-5 flex items-center gap-2">

            <Activity className="h-5 w-5 text-cyan-400" />

            <h3 className="font-semibold text-white">

              Weekly Reservation Trend

            </h3>

          </div>

          <div className="h-72">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={insights.last7Days}
              >

                <CartesianGrid
                  stroke="#334155"
                />

                <XAxis
                  dataKey="day"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          {/* Revenue Forecast */}

          <div className="rounded-xl border border-white/10 bg-slate-800 p-6">

            <div className="mb-3 flex items-center gap-2">

              <DollarSign className="h-5 w-5 text-green-400" />

              <span className="text-sm text-white/50">
                Expected Revenue
              </span>

            </div>

            <div className="text-3xl font-bold text-white">

              $
              {insights.expectedRevenue.toLocaleString()}

            </div>

            <div className="mt-2 text-xs text-green-400">

              Next 7 days prediction

            </div>

          </div>

          {/* Staff */}

          <div className="rounded-xl border border-white/10 bg-slate-800 p-6">

            <div className="mb-3 flex items-center gap-2">

              <Users className="h-5 w-5 text-cyan-400" />

              <span className="text-sm text-white/50">

                Recommended Staff

              </span>

            </div>

            <div className="text-3xl font-bold text-white">

              {insights.recommendedStaff}

            </div>

            <div className="mt-2 text-xs text-cyan-400">

              Employees required

            </div>

          </div>

          {/* AI Forecast */}

          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">

            <div className="mb-3 flex items-center gap-2">

              <Sparkles className="h-5 w-5 text-cyan-400" />

              <span className="text-sm text-cyan-300">

                AI Forecast

              </span>

            </div>

            <div className="text-sm leading-6 text-white/80">

              {insights.forecastMessage}

            </div>

          </div>

        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-slate-800 p-6">

          <h3 className="mb-5 text-lg font-semibold text-white">

            Next 7 Days Forecast

          </h3>

          <div className="space-y-3">

            {insights.forecastNextWeek.map((day) => (

              <div

                key={day.day}

                className="flex items-center justify-between rounded-lg bg-slate-900 px-4 py-3"

              >

                <span className="text-white">

                  {day.day}

                </span>

                <span className="font-semibold text-cyan-400">

                  {day.predicted} Reservations

                </span>

              </div>

            ))}

          </div>

        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-slate-800 p-6">

          <div className="mb-6 flex items-center gap-3">

            <Activity className="h-6 w-6 text-cyan-400" />

            <h3 className="text-xl font-semibold text-white">

              Executive Analytics

            </h3>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* Capacity */}

            <div className="rounded-lg bg-slate-900 p-5">

              <div className="text-sm text-white/50">

                Capacity Utilization

              </div>

              <div className="mt-2 text-4xl font-bold text-cyan-400">

                {insights.utilizationRate}%

              </div>

            </div>

            {/* Confirmation */}

            <div className="rounded-lg bg-slate-900 p-5">

              <div className="text-sm text-white/50">

                Confirmation Rate

              </div>

              <div className="mt-2 text-4xl font-bold text-green-400">

                {insights.confirmationRate}%

              </div>

            </div>

            {/* Cancellation */}

            <div className="rounded-lg bg-slate-900 p-5">

              <div className="text-sm text-white/50">

                Cancellation Rate

              </div>

              <div className="mt-2 text-4xl font-bold text-red-400">

                {insights.cancellationRate}%

              </div>

            </div>

          </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* Peak */}

          <div className="rounded-xl border border-white/10 bg-slate-800 p-6">

            <div className="mb-4 text-lg font-semibold text-white">

              Peak Reservation Day

            </div>

            <div className="text-3xl font-bold text-orange-400">

              {insights.peakReservationDay.day}

            </div>

            <div className="mt-2 text-sm text-white/50">

              {insights.peakReservationDay.count} reservations

            </div>

          </div>

          {/* Weakest */}

          <div className="rounded-xl border border-white/10 bg-slate-800 p-6">

            <div className="mb-4 text-lg font-semibold text-white">

              Lowest Reservation Day

            </div>

            <div className="text-3xl font-bold text-red-400">

              {insights.weakestReservationDay.day}

            </div>

            <div className="mt-2 text-sm text-white/50">

              {insights.weakestReservationDay.count} reservations

            </div>

          </div>

        </div>

        <div className="mt-8 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">

          <div className="mb-3 flex items-center gap-2">

            <Brain className="h-6 w-6 text-cyan-400" />

            <span className="text-lg font-semibold text-cyan-300">

              Executive AI Recommendation

            </span>

          </div>

          <p className="leading-7 text-white/80">

            {insights.executiveInsight}

          </p>

        </div>

{/* ==========================================
EXECUTIVE DECISION CENTER
========================================== */}

<div className="mt-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 to-slate-800 p-6">

  <div className="mb-5 flex items-center gap-3">

    <BrainCircuit className="h-7 w-7 text-cyan-400" />

    <div>

      <h2 className="text-xl font-semibold text-white">
        Executive Decision Center
      </h2>

      <p className="text-sm text-white/40">
        AI-generated operational recommendation
      </p>

    </div>

  </div>

  <div className="grid gap-5 md:grid-cols-4">

    <div>

      <div className="text-xs uppercase text-white/40">
        Priority
      </div>

      <div className="mt-2 text-lg font-bold text-cyan-300">
        <span
        className={`
        inline-flex
        rounded-full
        px-3
        py-1
        text-sm
        font-bold

        ${
        insights.executiveDecision.color==="red"

        ?"bg-red-500/20 text-red-400"

        :insights.executiveDecision.color==="orange"

        ?"bg-orange-500/20 text-orange-400"

        :insights.executiveDecision.color==="emerald"

        ?"bg-emerald-500/20 text-emerald-400"

        :"bg-cyan-500/20 text-cyan-400"
        }
        `}
        >

        {insights.executiveDecision.priority}

        </span>
      </div>

    </div>

    <div>

      <div className="text-xs uppercase text-white/40">
        Recommended Action

        </div>

      </div>

      <div className="mt-2 font-semibold text-white">
        {insights.executiveDecision.action}
      </div>
      
      <div className="mt-2 flex items-center gap-2">

      <div
      className={`
      h-2
      w-2
      rounded-full
      animate-pulse

      ${
      insights.executiveDecision.color==="red"

      ?"bg-red-400"

      :insights.executiveDecision.color==="orange"

      ?"bg-orange-400"

      :insights.executiveDecision.color==="emerald"

      ?"bg-emerald-400"

      :"bg-cyan-400"
      }
      `}
      />

      <span className="text-xs text-white/40">

      {insights.executiveDecision.status}

      </span>

      </div>

    </div>

    <div>

      <div className="text-xs uppercase text-white/40">
        Confidence
      </div>

      <div className="mt-2 text-lg font-bold text-emerald-400">
        {insights.executiveDecision.confidence}%
      </div>
      <div className="mt-3 h-2 rounded-full bg-white/10">

      <div

      className="h-2 rounded-full bg-emerald-400 transition-all duration-700"

      style={{

      width:`${insights.executiveDecision.confidence}%`

      }}

       />

      </div>

    </div>

    <div>

      <div className="text-xs uppercase text-white/40">
        Expected Impact
      </div>

      <div className="mt-2 text-lg font-bold text-orange-400">
        {insights.executiveDecision.impact}
      </div>

      <div className="mt-2 flex items-center gap-2">

        <Sparkles className="h-4 w-4 text-yellow-400"/>

        <span className="text-xs text-white/40">

          AI Optimized

        </span>

       </div>

    </div>

  </div>

</div>

{/* ==========================================
AI ACTION PLANNER
========================================== */}

<div className="mt-8 rounded-2xl border border-white/10 bg-slate-800 p-4 md:p-6">

  <div className="mb-5 flex items-start gap-3 md:items-center">

    <Activity className="h-6 w-6 text-cyan-400" />

    <div>

      <h2 className="text-lg md:text-xl font-semibold text-white">
        AI Action Planner
      </h2>

      <p className="text-sm text-white/40">
        Today's recommended operational timeline
      </p>

    </div>

  </div>

  <div className="space-y-4">

    {insights.actionTimeline.map((item, index) => (

      <div
        key={index}
        className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-lg border border-white/10 bg-slate-900 px-4 py-3"
      >

        <div>

          <div className="text-sm text-cyan-400">
            {item.time}
          </div>

          <div className="font-medium text-white">
            {item.title}
          </div>

        </div>

        <div className="flex flex-wrap items-center gap-2">

          <input
            type="checkbox"
            checked={item.status === "completed"}
            readOnly
            className="h-4 w-4 accent-cyan-400"
          />

          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold

              ${
                item.status === "completed"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : item.status === "active"
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "bg-white/10 text-white/50"
              }
            `}
          >
            {item.status}
          </span>

         </div>

        </div>

       ))}

  </div>

</div>

{/* ==========================================
WORKFLOW PROGRESS
========================================== */}

<div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

<div className="flex items-center justify-between">

<div>

<h2 className="text-lg font-semibold text-white">

Manager Workflow

</h2>

<p className="text-sm text-white/40">

Today's completion status

</p>

</div>

<div className="text-right">

<div className="text-3xl font-bold text-cyan-300">

{insights.workflowProgress}%

</div>

<div className="text-xs text-white/40">

Completed

</div>

</div>

</div>

<div className="mt-5 h-3 rounded-full bg-white/10">

<div

className="h-3 rounded-full bg-cyan-400 transition-all duration-700"

style={{

width:`${insights.workflowProgress}%`

}}

 />

</div>

<div className="mt-5 flex justify-between">

<div>

<div className="text-sm text-white/40">

Tasks

</div>

<div className="font-semibold text-white">

{insights.completedTasks} / {insights.totalTasks}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Manager Productivity

</div>

<div className="font-semibold text-emerald-400">

{Math.round(insights.managerProductivity)}%

</div>

</div>

</div>

</div>

{/* ==========================================
EXECUTIVE AI BRAIN
========================================== */}

<div className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-900 p-4 md:p-6">

  <h2 className="mb-6 text-lg md:text-xl font-semibold text-cyan-300">
    Executive AI Brain
  </h2>

  {/* Health Score */}

  <div className="mb-6">

    <div className="text-xs md:text-sm text-white/40">
      Restaurant Health
    </div>

    <div className="mt-2 text-3xl md:text-4xl font-bold text-cyan-300">
      {executiveBrain.healthScore}%
    </div>

  </div>

  {/* Executive Priority */}

  <div className="mb-8 rounded-xl border border-cyan-500/20 bg-slate-800 p-4 md:p-5">

    <div className="text-sm text-white/40">
      Executive Priority
    </div>

    <div className="mt-2 text-xl md:text-2xl font-bold text-orange-400">
      {executiveBrain.executivePriority}
    </div>

  </div>

  {/* Insights / Risks / Opportunities */}

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

    <div>

      <div className="mb-3 font-semibold text-emerald-400">
        Insights
      </div>

      {executiveBrain.insights.map(
        (item: string, index: number) => (
          <div
            key={index}
            className="mb-2 text-sm text-white"
          >
            • {item}
          </div>
        )
      )}

    </div>

    <div>

      <div className="mb-3 font-semibold text-red-400">
        Risks
      </div>

      {executiveBrain.risks.map(
        (item: string, index: number) => (
          <div
            key={index}
            className="mb-2 text-sm text-white"
          >
            • {item}
          </div>
        )
      )}

    </div>

    <div>

      <div className="mb-3 font-semibold text-cyan-400">
        Opportunities
      </div>

      {executiveBrain.opportunities.map(
        (item: string, index: number) => (
          <div
            key={index}
            className="mb-2 text-sm text-white"
          >
            • {item}
          </div>
        )
      )}

    </div>

  </div>

  {/* Executive Actions / Warnings */}

  <div className="mt-8 grid gap-6 lg:grid-cols-2">

    <div>

      <div className="mb-3 font-semibold text-cyan-300">
        Executive Actions
      </div>

      {executiveBrain.executiveActions.map(
        (item: string, index: number) => (
          <div
            key={index}
            className="mb-2 rounded-lg bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200"
          >
            ✓ {item}
          </div>
        )
      )}

    </div>

    <div>

      <div className="mb-3 font-semibold text-red-400">
        Executive Warnings
      </div>

<div className="mt-8 grid gap-6 lg:grid-cols-2">

<div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">

<h3 className="mb-4 font-semibold text-emerald-300">

Revenue Strategy

</h3>

{executiveBrain.revenueStrategy.map(

(item:string,index:number)=>(

<div key={index}

className="mb-2 text-sm text-white">

• {item}

</div>

)

)}

</div>

<div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">

<h3 className="mb-4 font-semibold text-cyan-300">

Marketing Strategy

</h3>

{executiveBrain.marketingStrategy.map(

(item:string,index:number)=>(

<div key={index}

className="mb-2 text-sm text-white">

• {item}

</div>

)

)}

</div>

</div>

<div className="mt-6 grid gap-6 lg:grid-cols-3">

<div>

<h3 className="mb-3 font-semibold text-orange-300">

Staff Strategy

</h3>

{executiveBrain.staffingStrategy.map(

(item:string,index:number)=>(

<div key={index}

className="mb-2 text-sm text-white">

• {item}

</div>

)

)}

</div>

<div>

<h3 className="mb-3 font-semibold text-pink-300">

Customer Strategy

</h3>

{executiveBrain.customerStrategy.map(

(item:string,index:number)=>(

<div key={index}

className="mb-2 text-sm text-white">

• {item}

</div>

)

)}

</div>

<div>

<h3 className="mb-3 font-semibold text-cyan-300">

Growth Strategy

</h3>

{executiveBrain.growthStrategy.map(

(item:string,index:number)=>(

<div key={index}

className="mb-2 text-sm text-white">

• {item}

</div>

)

)}

</div>

</div>

<div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-yellow-300">

CEO Weekly AI Report

</h2>

<div className="grid gap-6 lg:grid-cols-3">

<div>

<div className="text-sm text-white/40">

AI Summary

</div>

<div className="mt-2 text-white">

{executiveBrain.ceoSummary}

</div>

</div>

<div>

<div className="text-sm text-white/40">

CEO Decision

</div>

<div className="mt-2 text-cyan-300">

{executiveBrain.ceoDecision}

</div>

</div>

<div>

<div className="mt-10 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-purple-300">

AI Autonomous Optimization

</h2>

<div className="grid gap-6 lg:grid-cols-2">

<div>

<h3 className="mb-4 font-semibold text-cyan-300">

Optimization Tasks

</h3>

{executiveBrain.optimizationTasks.map(

(item:string,index:number)=>(

<div
key={index}
className="mb-2 rounded-lg bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200"
>

⚙ {item}

</div>

)

)}

</div>

<div>

<div className="mt-10 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-indigo-300">

Restaurant Digital Twin

</h2>

<div className="grid gap-6 lg:grid-cols-3">

<div>

<h3 className="mb-3 font-semibold text-cyan-300">

Future Simulation

</h3>

{executiveBrain.simulations.map(

(item:string,index:number)=>(

<div
key={index}
className="mb-2 text-sm text-white"
>

🔮 {item}

</div>

)

)}

</div>

<div>

<div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-emerald-300">

Business Intelligence Scorecard

</h2>

<div className="grid gap-6 lg:grid-cols-5">

<div>

<div className="text-sm text-white/40">
Profitability
</div>

<div className="mt-2 text-3xl font-bold text-emerald-400">
{executiveBrain.profitabilityScore}%
</div>

</div>

<div>

<div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-yellow-300">

Executive KPI Benchmark

</h2>

<div className="space-y-3">

{executiveBrain.benchmarkResults.map(

(item:string,index:number)=>(

<div
key={index}
className="flex items-center justify-between rounded-lg bg-slate-800 px-4 py-3"
>

<span className="text-white">

{item}

</span>

<span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">

{executiveBrain.benchmarkStatus[index]}

</span>

</div>

)

)}

</div>

</div>

<div className="mt-10 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-indigo-300">

Multi-Branch Comparison

</h2>

<div className="overflow-x-auto">

<table className="min-w-[720px] w-full text-left">

<thead>

<tr className="border-b border-white/10">

<th className="px-2 pb-3 text-xs md:text-sm text-white/50">

Branch

</th>

<th className="px-2 pb-3 text-xs md:text-sm text-white/50">

Revenue

</th>

<th className="px-2 pb-3 text-xs md:text-sm text-white/50">

Occupancy

</th>

<th className="px-2 pb-3 text-xs md:text-sm text-white/50">

Growth

</th>

<th className="px-2 pb-3 text-xs md:text-sm text-white/50">

Status

</th>

</tr>

</thead>

<tbody>

{executiveBrain.branchComparison.map(

(branch:any,index:number)=>(

<tr
key={index}
className="border-b border-white/5"
>

<td className="px-2 py-3 text-xs md:text-sm text-white">

{branch.branch}

</td>

<td className="px-2 py-3 text-xs md:text-sm text-emerald-300">

${branch.revenue}

</td>

<td className="px-2 py-3 text-xs md:text-sm text-cyan-300">

{branch.occupancy}%

</td>

<td className="px-2 py-3 text-xs md:text-sm text-yellow-300">

{branch.growth}%

</td>

<td className="px-2 py-3 text-xs md:text-sm text-pink-300">

{branch.status}

</td>

</tr>

)

)}

</tbody>

</table>

</div>

</div>

<div className="mt-10 rounded-2xl border border-emerald-500/20 bg-slate-900 p-6">

<h2 className="mb-6 text-xl font-semibold text-emerald-300">

Executive Daily Brief

</h2>

<div className="space-y-5">

<div>

<div className="text-sm text-white/40">

Headline

</div>

<div className="mt-2 text-2xl font-bold text-emerald-300">

{executiveBrain.executiveHeadline}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Summary

</div>

<div className="mt-2 text-white">

{executiveBrain.executiveSummary}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Today's Focus

</div>

<div className="mt-2 font-semibold text-cyan-300">

{executiveBrain.todayFocus}

</div>

</div>

<div>

<div className="mb-2 text-sm text-white/40">

Executive Alerts

</div>

{executiveBrain.executiveAlerts.length===0?

<div className="text-emerald-400">

No critical alerts.

</div>

:

executiveBrain.executiveAlerts.map(

(alert:string,index:number)=>(

<div
key={index}
className="mb-2 rounded-lg bg-red-500/10 px-3 py-2 text-red-300"
>

⚠ {alert}

</div>

)

)

}

</div>

</div>

</div>

<div className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-cyan-300">

AI Revenue Forecast

</h2>

<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

<div>

<div className="text-sm text-white/40">

Next Week

</div>

<div className="mt-2 text-3xl font-bold text-emerald-300">

${executiveBrain.nextWeekRevenue}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Next Month

</div>

<div className="mt-2 text-3xl font-bold text-cyan-300">

${executiveBrain.nextMonthRevenue}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Confidence

</div>

<div className="mt-2 text-3xl font-bold text-yellow-300">

{executiveBrain.revenueConfidence}%

</div>

</div>

<div>

<div className="text-sm text-white/40">

Trend

</div>

<div className="mt-2 text-3xl font-bold text-pink-300">

{executiveBrain.revenueTrend}

</div>

</div>

</div>

</div>

<div className="mt-10 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-purple-300">

AI Reservation Forecast

</h2>

<div className="grid gap-6 lg:grid-cols-3">

<div>

<div className="text-sm text-white/40">

Tomorrow

</div>

<div className="mt-2 text-3xl font-bold text-cyan-300">

{executiveBrain.tomorrowReservations}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Next Week

</div>

<div className="mt-2 text-3xl font-bold text-emerald-300">

{executiveBrain.nextWeekReservations}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Next Month

</div>

<div className="mt-2 text-3xl font-bold text-yellow-300">

{executiveBrain.nextMonthReservations}

</div>

</div>

</div>

<div className="mt-8 grid gap-6 lg:grid-cols-3">

<div>

<div className="text-sm text-white/40">

Trend

</div>

<div className="mt-2 text-xl font-bold text-pink-300">

{executiveBrain.reservationTrend}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Confidence

</div>

<div className="mt-2 text-xl font-bold text-cyan-300">

{executiveBrain.reservationConfidence}%

</div>

</div>

<div>

<div className="text-sm text-white/40">

Risk

</div>

<div className="mt-2 text-xl font-bold text-red-300">

{executiveBrain.reservationRisk}

</div>

</div>

</div>

</div>

<div className="mt-10 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-orange-300">

AI Occupancy Prediction

</h2>

<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

<div>

<div className="text-sm text-white/40">

Predicted Occupancy

</div>

<div className="mt-2 text-3xl font-bold text-orange-300">

{executiveBrain.predictedOccupancy}%

</div>

</div>

<div>

<div className="text-sm text-white/40">

Trend

</div>

<div className="mt-2 text-2xl font-bold text-cyan-300">

{executiveBrain.occupancyTrend}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Confidence

</div>

<div className="mt-2 text-2xl font-bold text-emerald-300">

{executiveBrain.occupancyConfidence}%

</div>

</div>

<div>

<div className="text-sm text-white/40">

Recommendation

</div>

<div className="mt-2 text-sm text-white">

{executiveBrain.occupancyRecommendation}

</div>

</div>

</div>

</div>

<div className="mt-10 rounded-2xl border border-pink-500/20 bg-pink-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-pink-300">

AI Seasonal Trend

</h2>

<div className="grid gap-6 lg:grid-cols-3">

<div>

<div className="text-sm text-white/40">

Current Season

</div>

<div className="mt-2 text-3xl font-bold text-pink-300">

{executiveBrain.currentSeason}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Growth

</div>

<div className="mt-2 text-3xl font-bold text-cyan-300">

{executiveBrain.seasonalGrowth}%

</div>

</div>

<div>

<div className="text-sm text-white/40">

Predicted Revenue

</div>

<div className="mt-2 text-3xl font-bold text-emerald-300">

${executiveBrain.seasonalRevenue}

</div>

</div>

</div>

<div className="mt-8 grid gap-6 lg:grid-cols-3">

<div>

<div className="text-sm text-white/40">

Reservations

</div>

<div className="mt-2 text-2xl font-bold text-yellow-300">

{executiveBrain.seasonalReservations}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Occupancy

</div>

<div className="mt-2 text-2xl font-bold text-orange-300">

{executiveBrain.seasonalOccupancy}%

</div>

</div>

<div>

<div className="text-sm text-white/40">

Recommendation

</div>

<div className="mt-2 text-white">

{executiveBrain.seasonalRecommendation}

</div>

</div>

</div>

</div>

<div className="mt-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-yellow-300">

AI Event & Holiday Impact

</h2>

<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

<div>

<div className="text-sm text-white/40">

Event

</div>

<div className="mt-2 text-2xl font-bold text-yellow-300">

{executiveBrain.eventName}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Demand

</div>

<div className="mt-2 text-2xl font-bold text-orange-300">

{executiveBrain.demandLevel}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Business Boost

</div>

<div className="mt-2 text-2xl font-bold text-emerald-300">

{executiveBrain.businessBoost}%

</div>

</div>

<div>

<div className="text-sm text-white/40">

Revenue

</div>

<div className="mt-2 text-2xl font-bold text-cyan-300">

${executiveBrain.holidayRevenue}

</div>

</div>

</div>

<div className="mt-8">

<div className="text-sm text-white/40">

Recommendation

</div>

<div className="mt-2 text-white">

{executiveBrain.holidayRecommendation}

</div>

</div>

</div>

<div className="mt-10 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-indigo-300">

AI Demand Forecast

</h2>

<div className="grid gap-6 lg:grid-cols-5">

<div>

<div className="text-sm text-white/40">

Forecast

</div>

<div className="mt-2 text-3xl font-bold text-cyan-300">

{executiveBrain.demandForecast}%

</div>

</div>

<div>

<div className="text-sm text-white/40">

Level

</div>

<div className="mt-2 text-2xl font-bold text-orange-300">

{executiveBrain.demandLevelAI}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Confidence

</div>

<div className="mt-2 text-2xl font-bold text-emerald-300">

{executiveBrain.demandConfidence}%

</div>

</div>

<div>

<div className="text-sm text-white/40">

Profit

</div>

<div className="mt-2 text-2xl font-bold text-yellow-300">

${executiveBrain.expectedProfit}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Recommendation

</div>

<div className="mt-2 text-white text-sm">

{executiveBrain.demandRecommendation}

</div>

</div>

</div>

</div>

<div className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-red-300">

AI Executive Decision Center

</h2>

<div className="grid gap-6 lg:grid-cols-3">

<div>

<div className="text-sm text-white/40">

Priority

</div>

<div className="mt-2 text-3xl font-bold text-red-300">

{executiveBrain.executivePriorityLevel}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Confidence

</div>

<div className="mt-2 text-3xl font-bold text-cyan-300">

{executiveBrain.executiveDecisionConfidence}%

</div>

</div>

<div>

<div className="text-sm text-white/40">

Decision

</div>

<div className="mt-2 text-white">

{executiveBrain.executiveDecision}

</div>

</div>

</div>

<div className="mt-8">

<div className="mb-3 font-semibold text-orange-300">

Executive Queue

</div>

{executiveBrain.executiveQueue.map(

(item:string,index:number)=>(

<div

key={index}

className="mb-2 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-white"

>

• {item}

</div>

)

)}

</div>

</div>

<div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-emerald-300">

AI Autonomous Task Generator

</h2>

<div className="grid gap-6 lg:grid-cols-3">

<div>

<div className="text-sm text-white/40">

Task Priority

</div>

<div className="mt-2 text-3xl font-bold text-orange-300">

{executiveBrain.taskPriority}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Business Impact

</div>

<div className="mt-2 text-3xl font-bold text-cyan-300">

{executiveBrain.estimatedBusinessImpact}%

</div>

</div>

<div>

<div className="text-sm text-white/40">

Completion Time

</div>

<div className="mt-2 text-3xl font-bold text-purple-300">

{executiveBrain.estimatedCompletionHours}h

</div>

</div>

</div>

<div className="mt-8">

<div className="mb-3 font-semibold text-cyan-300">

Generated Tasks

</div>

{executiveBrain.autonomousTasks.map(

(task:string,index:number)=>(

<div

key={index}

className="mb-2 rounded-lg bg-cyan-500/10 px-3 py-2 text-sm text-white"

>

✓ {task}

</div>

)

)}

</div>

</div>

<div className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-red-300">

AI Smart Alert Engine

</h2>

<div className="grid gap-6 lg:grid-cols-3">

<div>

<div className="text-sm text-white/40">

Alert Level

</div>

<div className="mt-2 text-3xl font-bold text-red-300">

{executiveBrain.alertLevel}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Active Alerts

</div>

<div className="mt-2 text-3xl font-bold text-orange-300">

{executiveBrain.alertCount}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Emergency Action

</div>

<div className="mt-2 text-sm text-white">

{executiveBrain.emergencyAction}

</div>

</div>

</div>

<div className="mt-8">

<div className="mb-3 font-semibold text-orange-300">

Generated Alerts

</div>

{executiveBrain.smartAlerts.map(

(alert:string,index:number)=>(

<div

key={index}

className="mb-2 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-white"

>

⚠ {alert}

</div>

)

)}

</div>

</div>

<div className="mt-10 rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6">

  <h2 className="mb-6 text-xl font-semibold text-sky-300">

    Executive Daily Briefing

  </h2>

  <div className="mb-6">

    <div className="text-sm text-white/40">

      Current Briefing

    </div>

    <div className="mt-2 text-3xl font-bold text-sky-300">

      {executiveBrain.briefingPeriod}

    </div>

  </div>

  <div className="space-y-3">

    {executiveBrain.executiveBriefing.map(

      (item:string,index:number)=>(

        <div

          key={index}

          className="rounded-lg bg-sky-500/10 px-4 py-3 text-sm text-white"

        >

          • {item}

        </div>

      )

    )}

  </div>

  <div className="mt-8 grid gap-6 lg:grid-cols-2">

    <div>

      <div className="text-sm text-white/40">

        Tomorrow Focus

      </div>

      <div className="mt-2 text-white">

        {executiveBrain.tomorrowFocus}

      </div>

    </div>

    <div>

      <div className="text-sm text-white/40">

        Daily Summary

      </div>

      <div className="mt-2 text-white">

        {executiveBrain.dailySummary}

      </div>

    </div>

  </div>

</div>

{/* ==========================================
RESTAURANT CEO DASHBOARD
========================================== */}

<div className="mt-10 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-violet-300">

Restaurant CEO Dashboard

</h2>

<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

<div>

<div className="text-sm text-white/40">

CEO Score

</div>

<div className="mt-2 text-4xl font-bold text-violet-300">

{executiveBrain.ceoScore}%

</div>

</div>

<div>

<div className="text-sm text-white/40">

Business Status

</div>

<div className="mt-2 text-2xl font-bold text-cyan-300">

{executiveBrain.executiveStatus}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Expected Revenue

</div>

<div className="mt-2 text-2xl font-bold text-emerald-300">

${executiveBrain.holidayRevenue}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Expected Profit

</div>

<div className="mt-2 text-2xl font-bold text-yellow-300">

${executiveBrain.expectedProfit}

</div>

</div>

</div>

<div className="mt-8 grid gap-6 lg:grid-cols-3">

<div>

<div className="text-sm text-white/40">

Demand

</div>

<div className="mt-2 text-xl font-bold text-orange-300">

{executiveBrain.demandLevelAI}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Alert Level

</div>

<div className="mt-2 text-xl font-bold text-red-300">

{executiveBrain.alertLevel}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Priority

</div>

<div className="mt-2 text-xl font-bold text-cyan-300">

{executiveBrain.executivePriorityLevel}

</div>

</div>

</div>

<div className="mt-8 rounded-xl bg-violet-500/10 p-5">

<div className="text-sm text-white/40">

CEO Recommendation

</div>

<div className="mt-2 text-white">

{executiveBrain.ceoRecommendation}

</div>

</div>

</div>

{/* ==========================================
AUTONOMOUS RESTAURANT MANAGER
========================================== */}

<div className="mt-10 rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-fuchsia-300">

Autonomous Restaurant Manager

</h2>

<div className="grid gap-6 lg:grid-cols-3">

<div>

<div className="text-sm text-white/40">

Manager Status

</div>

<div className="mt-2 text-3xl font-bold text-emerald-300">

{executiveBrain.autonomousManagerStatus}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Confidence

</div>

<div className="mt-2 text-3xl font-bold text-cyan-300">

{executiveBrain.autonomousConfidence}%

</div>

</div>

<div>

<div className="text-sm text-white/40">

Decision

</div>

<div className="mt-2 text-white">

{executiveBrain.autonomousDecision}

</div>

</div>

</div>

<div className="mt-8">

<div className="mb-3 font-semibold text-cyan-300">

Autonomous Actions

</div>

{executiveBrain.autonomousActions.map(

(action:string,index:number)=>(

<div

key={index}

className="mb-2 rounded-lg bg-fuchsia-500/10 px-3 py-2 text-sm text-white"

>

✓ {action}

</div>

)

)}

</div>

<div className="mt-8 rounded-xl bg-fuchsia-500/10 p-5">

<div className="text-sm text-white/40">

Manager Summary

</div>

<div className="mt-2 text-white">

{executiveBrain.managerSummary}

</div>

</div>

</div>

{/* ==========================================
CUSTOMER INTELLIGENCE
========================================== */}

<div className="mt-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-emerald-300">

Customer Intelligence

</h2>

<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

<div>

<div className="text-sm text-white/40">

VIP Customers

</div>

<div className="mt-2 text-3xl font-bold text-yellow-300">

{insights.vipCustomers}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Returning

</div>

<div className="mt-2 text-3xl font-bold text-cyan-300">

{insights.returningCustomers}

</div>

</div>

<div>

<div className="text-sm text-white/40">

At Risk

</div>

<div className="mt-2 text-3xl font-bold text-red-300">

{insights.atRiskCustomers}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Satisfaction

</div>

<div className="mt-2 text-3xl font-bold text-emerald-300">

{insights.customerSatisfaction}%

</div>

</div>

</div>

</div>

{/* ==========================================
LOYALTY & VIP INSIGHTS
========================================== */}

<div className="mt-10 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">

<h2 className="mb-6 text-xl font-semibold text-amber-300">

Loyalty & VIP Insights

</h2>

<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

<div>

<div className="text-sm text-white/40">

Loyalty Score

</div>

<div className="mt-2 text-3xl font-bold text-amber-300">

{insights.loyaltyScore}

</div>

</div>

<div>

<div className="text-sm text-white/40">

VIP Status

</div>

<div className="mt-2 text-2xl font-bold text-cyan-300">

{insights.vipStatus}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Premium Customers

</div>

<div className="mt-2 text-3xl font-bold text-purple-300">

{insights.premiumCustomers}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Retention Priority

</div>

<div className="mt-2 text-2xl font-bold text-red-300">

{insights.retentionPriority}

</div>

</div>

</div>

</div>

<div className="text-sm text-white/40">
Business
</div>

<div className="mt-2 text-3xl font-bold text-cyan-400">
{executiveBrain.businessScore}%
</div>

</div>

<div>

<div className="text-sm text-white/40">
Customers
</div>

<div className="mt-2 text-3xl font-bold text-pink-400">
{executiveBrain.customerHealth}%
</div>

</div>

<div>

<div className="text-sm text-white/40">
Operations
</div>

<div className="mt-2 text-3xl font-bold text-orange-400">
{executiveBrain.operationalEfficiency}%
</div>

</div>

<div>

<div className="text-sm text-white/40">
Revenue
</div>

<div className="mt-2 text-3xl font-bold text-yellow-400">
{executiveBrain.revenueStability}%
</div>

</div>

</div>

</div>

<h3 className="mb-3 font-semibold text-red-300">

Future Risks

</h3>

{executiveBrain.simulationRisks.map(

(item:string,index:number)=>(

<div
key={index}
className="mb-2 text-sm text-red-200"
>

⚠ {item}

</div>

)

)}

</div>

<div>

<h3 className="mb-3 font-semibold text-emerald-300">

Revenue Forecast

</h3>

{executiveBrain.simulationRevenue.map(

(item:string,index:number)=>(

<div
key={index}
className="mb-2 text-sm text-emerald-200"
>

💰 {item}

</div>

)

)}

</div>

</div>

</div>

<h3 className="mb-4 font-semibold text-emerald-300">

Expected Benefits

</h3>

{executiveBrain.optimizationBenefits.map(

(item:string,index:number)=>(

<div
key={index}
className="mb-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200"
>

✓ {item}

</div>

)

)}

</div>

</div>

</div>

<div className="text-sm text-white/40">

Business Outlook

</div>

<div className="mt-2 text-2xl font-bold text-emerald-400">

{executiveBrain.ceoOutlook}

</div>

</div>

</div>

</div>

      {executiveBrain.executiveWarnings.map(
        (item: string, index: number) => (
          <div
            key={index}
            className="mb-2 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300"
          >
            ⚠ {item}
          </div>
        )
      )}

    </div>

  </div>

</div>

{/* ==========================================
    AI BUSINESS INTELLIGENCE
========================================== */}

<div className="mt-8">

<h2 className="mb-5 text-xl font-semibold text-cyan-300">

AI Predictive Business Intelligence

</h2>

<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

<div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">

<div className="flex items-center gap-3">

<DollarSign className="h-8 w-8 text-emerald-400"/>

<div>

<div className="text-sm text-white/50">

Predicted Revenue

</div>

<div className="text-2xl font-bold text-white">

${insights.predictedRevenue}

</div>

</div>

</div>

</div>

<div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">

<div className="flex items-center gap-3">

<Users className="h-8 w-8 text-cyan-400"/>

<div>

<div className="text-sm text-white/50">

Predicted Reservations

</div>

<div className="text-2xl font-bold text-white">

{insights.predictedReservations}

</div>

</div>

</div>

</div>

<div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">

<div className="flex items-center gap-3">

<ShieldAlert className="h-8 w-8 text-orange-400"/>

<div>

<div className="text-sm text-white/50">

Cancellation Risk

</div>

<div className="text-2xl font-bold text-white">

{insights.cancellationRisk}

</div>

</div>

</div>

</div>

<div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">

<div className="flex items-center gap-3">

<BrainCircuit className="h-8 w-8 text-violet-400"/>

<div>

<div className="text-sm text-white/50">

AI Confidence

</div>

<div className="text-2xl font-bold text-white">

{insights.aiConfidence}%

</div>

</div>

</div>

</div>

</div>

</div>

<div className="mt-8 rounded-xl border border-cyan-500/20 bg-slate-800 p-6">

<h2 className="mb-5 text-xl font-semibold text-cyan-300">

Executive Recommendations

</h2>

<div className="space-y-4">

<div>

<div className="text-sm text-white/40">

Priority

</div>

<div className="font-semibold text-cyan-300">

{insights.executivePriority}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Promotion Strategy

</div>

<div className="font-semibold text-emerald-300">

{insights.promotionRecommendation}

</div>

</div>

<div>

<div className="text-sm text-white/40">

Staff Recommendation

</div>

<div className="font-semibold text-orange-300">

{insights.staffRecommendation}

</div>

</div>

</div>

</div>

<div className="mt-8 grid gap-6 lg:grid-cols-2">

{/* Revenue Projection */}

<div className="rounded-xl border border-white/10 bg-slate-800 p-6">

<h2 className="mb-5 text-lg font-semibold text-cyan-300">

Revenue Projection

</h2>

<div className="h-72">

<ResponsiveContainer>

<AreaChart data={insights.forecastNextWeek}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="day" />

<YAxis />

<Tooltip />

<Area

type="monotone"

dataKey="predicted"

stroke="#10b981"

fill="#10b98144"

/>

</AreaChart>

</ResponsiveContainer>

</div>

</div>

{/* Occupancy Forecast */}

<div className="rounded-xl border border-white/10 bg-slate-800 p-6">

<h2 className="mb-5 text-lg font-semibold text-cyan-300">

Occupancy Forecast

</h2>

<div className="h-72">

<ResponsiveContainer>

<BarChart data={insights.forecastNextWeek}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="day" />

<YAxis />

<Tooltip />

<Bar

dataKey="predicted"

radius={[8,8,0,0]}

/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

</div>

{/* ==========================================
KPI GAUGES
========================================== */}

<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

{/* Restaurant Health */}

<div className="rounded-xl border border-emerald-500/20 bg-slate-800 p-5">

<div className="mb-4 flex items-center gap-2">

<Activity className="h-5 w-5 text-emerald-400"/>

<span className="text-white">

Restaurant Health

</span>

</div>

<div className="flex justify-center">

<ResponsiveContainer width={160} height={160}>

<RadialBarChart

cx="50%"

cy="50%"

innerRadius="70%"

outerRadius="100%"

barSize={14}

data={[

{

value: insights.restaurantHealth,

fill:"#10b981",

},

]}

>

<PolarAngleAxis

type="number"

domain={[0,100]}

angleAxisId={0}

tick={false}

/>

<RadialBar

dataKey="value"

cornerRadius={12}

/>

</RadialBarChart>

</ResponsiveContainer>

</div>

<div className="text-center text-2xl font-bold text-white">

{insights.restaurantHealth}%

</div>

</div>

{/* AI Confidence */}

<div className="rounded-xl border border-violet-500/20 bg-slate-800 p-5">

<div className="mb-4 flex items-center gap-2">

<BrainCircuit className="h-5 w-5 text-violet-400"/>

<span className="text-white">

AI Confidence

</span>

</div>

<div className="flex justify-center">

<ResponsiveContainer width={160} height={160}>

<RadialBarChart

cx="50%"

cy="50%"

innerRadius="70%"

outerRadius="100%"

barSize={14}

data={[

{

value: insights.aiConfidence,

fill:"#8b5cf6",

},

]}

>

<PolarAngleAxis

type="number"

domain={[0,100]}

tick={false}

/>

<RadialBar

dataKey="value"

cornerRadius={12}

/>

</RadialBarChart>

</ResponsiveContainer>

</div>

<div className="text-center text-2xl font-bold text-white">

{insights.aiConfidence}%

</div>

</div>

{/* Occupancy */}

<div className="rounded-xl border border-cyan-500/20 bg-slate-800 p-5">

<div className="mb-4 flex items-center gap-2">

<Gauge className="h-5 w-5 text-cyan-400"/>

<span className="text-white">

Occupancy

</span>

</div>

<div className="text-center">

<div className="text-3xl font-bold text-cyan-300">

{insights.occupancyForecast}%

</div>

</div>

</div>

{/* Revenue Confidence */}

<div className="rounded-xl border border-orange-500/20 bg-slate-800 p-5">

<div className="mb-4 flex items-center gap-2">

<DollarSign className="h-5 w-5 text-orange-400"/>

<span className="text-white">

Revenue Confidence

</span>

</div>

<div className="text-center">

<div className="text-3xl font-bold text-orange-300">

{insights.revenueConfidence}%

</div>

</div>

</div>

</div>

        <div className="mt-8 rounded-xl border border-white/10 bg-slate-800 p-6">

          <h3 className="mb-5 text-lg font-semibold text-white">

            Reservation Trend

          </h3>

          <div className="h-72">

            <ResponsiveContainer>

              <LineChart
                data={insights.forecastNextWeek}
              >
       
                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#06b6d4"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-slate-800 p-6">

          <h3 className="mb-5 text-lg font-semibold text-white">

            Revenue Projection

          </h3>

          <div className="h-72">

            <ResponsiveContainer>

              <AreaChart
                data={revenueProjection}
              >

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22c55e"
                  fill="#22c55e33"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-slate-800 p-6">

          <h3 className="mb-5 text-lg font-semibold text-white">

            Staff Forecast

          </h3>

          <div className="h-72">

            <ResponsiveContainer>

              <BarChart
                data={staffProjection}
              >

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="staff"
                  fill="#3b82f6"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-slate-800 p-6">

          <h3 className="mb-5 text-lg font-semibold text-white">

            Occupancy Score

          </h3>

          <div className="flex justify-center">

            <RadialBarChart
              width={250}
              height={250}
              innerRadius="70%"
              outerRadius="100%"
              data={occupancyData}
              startAngle={180}
              endAngle={0}
            >

              <RadialBar
                dataKey="value"
                fill="#06b6d4"
              />

            </RadialBarChart>

          </div>

          <div className="text-center text-4xl font-bold text-cyan-400">

            {insights.utilizationRate}%

          </div>

        </div>

      </div>

  );

}

export default memo(RestaurantInsights);