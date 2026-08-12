import { memo } from "react";

import {
  Activity,
  Brain,
  BrainCircuit,
  DollarSign,
  Flame,
  Gauge,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

interface Props {
  insights: any;
  executiveBrain: any;
}

interface MetricCardProps {
  label: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  accent?: string;
}

function MetricCard({
  label,
  value,
  description,
  icon,
  accent = "text-cyan-400",
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-800 p-4 transition-colors duration-200 hover:border-white/20 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm text-white/50">{label}</span>

        <span className={accent}>{icon}</span>
      </div>

      <div className="text-2xl font-bold text-white sm:text-3xl">
        {value}
      </div>

      {description && (
        <div className={`mt-2 text-xs ${accent}`}>
          {description}
        </div>
      )}
    </div>
  );
}

function RestaurantInsights({
  insights,
  executiveBrain,
}: Props) {
  /*
   * ------------------------------------------------------------
   * SAFE DATA NORMALIZATION
   * ------------------------------------------------------------
   *
   * The dashboard should remain stable even if one optional
   * intelligence value is temporarily unavailable.
   */

  const forecastNextWeek = Array.isArray(
    insights?.forecastNextWeek
  )
    ? insights.forecastNextWeek
    : [];

  const last7Days = Array.isArray(insights?.last7Days)
    ? insights.last7Days
    : [];

  const actionTimeline = Array.isArray(
    insights?.actionTimeline
  )
    ? insights.actionTimeline
    : [];

  const executiveInsights = Array.isArray(
    executiveBrain?.insights
  )
    ? executiveBrain.insights
    : [];

  const executiveRisks = Array.isArray(
    executiveBrain?.risks
  )
    ? executiveBrain.risks
    : [];

  const executiveOpportunities = Array.isArray(
    executiveBrain?.opportunities
  )
    ? executiveBrain.opportunities
    : [];

  const executiveActions = Array.isArray(
    executiveBrain?.executiveActions
  )
    ? executiveBrain.executiveActions
    : [];

  const executiveWarnings = Array.isArray(
    executiveBrain?.executiveWarnings
  )
    ? executiveBrain.executiveWarnings
    : [];

  /*
   * ------------------------------------------------------------
   * DERIVED VALUES
   * ------------------------------------------------------------
   */

  const weeklyGrowth = Number(
    insights?.weeklyGrowth ?? 0
  );

  const cancellationRate = Number(
    insights?.cancellationRate ?? 0
  );

  const utilizationRate = Number(
    insights?.utilizationRate ?? 0
  );

  const confirmationRate = Number(
    insights?.confirmationRate ?? 0
  );

  const healthScore = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        70 +
          weeklyGrowth -
          cancellationRate
      )
    )
  );

  const expectedRevenue = Number(
    insights?.expectedRevenue ?? 0
  );

  const recommendedStaff = Number(
    insights?.recommendedStaff ?? 0
  );

  const aiConfidence = Number(
    insights?.aiConfidence ??
      executiveBrain?.revenueConfidence ??
      0
  );

  /*
   * Revenue projection used by the chart.
   *
   * Existing forecast values represent reservation demand.
   * The multiplier is retained from the previous implementation
   * so the dashboard does not unexpectedly change its business
   * model during this UI refactor.
   */

  const revenueProjection = forecastNextWeek.map(
    (day: any) => ({
      day: day?.day ?? "",
      revenue:
        Number(day?.predicted ?? 0) * 45,
    })
  );

  /*
   * Staff projection.
   *
   * Keeps the previous business rule while moving the logic
   * into one controlled location.
   */

  const staffProjection = forecastNextWeek.map(
    (day: any) => ({
      day: day?.day ?? "",
      staff: Math.max(
        2,
        Math.ceil(
          Number(day?.predicted ?? 0) / 25
        )
      ),
    })
  );

  /*
   * ------------------------------------------------------------
   * EXECUTIVE DECISION
   * ------------------------------------------------------------
   */

  const executiveDecision =
    insights?.executiveDecision ?? {
      priority:
        insights?.executivePriority ??
        executiveBrain?.executivePriority ??
        "Monitor",
      action:
        insights?.promotionRecommendation ??
        "Continue monitoring restaurant performance.",
      confidence: aiConfidence,
      impact: "Moderate",
      status: "Monitoring",
      color: "cyan",
    };

  const decisionColor =
    executiveDecision?.color ?? "cyan";

  const decisionColorClasses =
    decisionColor === "red"
      ? {
          badge:
            "bg-red-500/20 text-red-400",
          dot: "bg-red-400",
        }
      : decisionColor === "orange"
      ? {
          badge:
            "bg-orange-500/20 text-orange-400",
          dot: "bg-orange-400",
        }
      : decisionColor === "emerald"
      ? {
          badge:
            "bg-emerald-500/20 text-emerald-400",
          dot: "bg-emerald-400",
        }
      : {
          badge:
            "bg-cyan-500/20 text-cyan-400",
          dot: "bg-cyan-400",
        };

  /*
   * ------------------------------------------------------------
   * COMPONENT
   * ------------------------------------------------------------
   */

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-4 text-white sm:p-6">

      {/* ======================================================
          EXECUTIVE OVERVIEW
      ====================================================== */}

      <section>
        <div className="mb-6 flex items-center gap-3">
          <Brain className="h-6 w-6 text-cyan-400" />

          <div>
            <h2 className="text-xl font-semibold text-white">
              Restaurant Intelligence
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Executive-level restaurant performance overview
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <MetricCard
            label="Weekly Growth"
            value={`${weeklyGrowth}%`}
            description={
              insights?.growthLabel ??
              "Compared with previous period"
            }
            icon={
              insights?.trendDirection === "up" ? (
                <TrendingUp className="h-6 w-6" />
              ) : (
                <TrendingDown className="h-6 w-6" />
              )
            }
            accent={
              insights?.trendDirection === "up"
                ? "text-emerald-400"
                : "text-red-400"
            }
          />

          <MetricCard
            label="Busiest Day"
            value={
              insights?.busiestWeekDay?.day ??
              insights?.peakReservationDay?.day ??
              "N/A"
            }
            description={
              insights?.busiestWeekDay?.count != null
                ? `${insights.busiestWeekDay.count} reservations`
                : "Reservation demand"
            }
            icon={
              <Flame className="h-6 w-6" />
            }
            accent="text-orange-400"
          />

          <MetricCard
            label="Health Score"
            value={`${healthScore}/100`}
            description="Overall restaurant performance"
            icon={
              <Target className="h-6 w-6" />
            }
            accent="text-emerald-400"
          />

          <MetricCard
            label="AI Confidence"
            value={`${aiConfidence}%`}
            description="Current intelligence confidence"
            icon={
              <BrainCircuit className="h-6 w-6" />
            }
            accent="text-violet-400"
          />

        </div>
      </section>

      {/* ======================================================
          AI RECOMMENDATION
      ====================================================== */}

      <section className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5 sm:p-6">

        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-cyan-400" />

          <h3 className="font-semibold text-cyan-300">
            AI Recommendation
          </h3>
        </div>

        <p className="text-sm leading-6 text-white/80 sm:text-base">
          {insights?.weeklyRecommendation ??
            executiveBrain?.executiveInsight ??
            "No recommendation is currently available."}
        </p>

      </section>

      {/* ======================================================
          CORE OPERATIONAL KPIs
      ====================================================== */}

      <section className="mt-8">

        <div className="mb-5 flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-400" />

          <h3 className="text-lg font-semibold text-white">
            Operational KPIs
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <MetricCard
            label="Capacity Utilization"
            value={`${utilizationRate}%`}
            description="Current occupancy"
            icon={
              <Gauge className="h-6 w-6" />
            }
            accent="text-cyan-400"
          />

          <MetricCard
            label="Confirmation Rate"
            value={`${confirmationRate}%`}
            description="Reservation confirmations"
            icon={
              <Target className="h-6 w-6" />
            }
            accent="text-emerald-400"
          />

          <MetricCard
            label="Cancellation Rate"
            value={`${cancellationRate}%`}
            description="Current cancellation level"
            icon={
              <ShieldAlert className="h-6 w-6" />
            }
            accent="text-red-400"
          />

          <MetricCard
            label="Recommended Staff"
            value={recommendedStaff}
            description="Employees required"
            icon={
              <Users className="h-6 w-6" />
            }
            accent="text-orange-400"
          />

        </div>

      </section>

      {/* ======================================================
          WEEKLY RESERVATION TREND
      ====================================================== */}

      <section className="mt-8 rounded-xl border border-white/10 bg-slate-800 p-4 sm:p-6">

        <div className="mb-5 flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-400" />

          <h3 className="font-semibold text-white">
            Weekly Reservation Trend
          </h3>
        </div>

        <div className="h-72 w-full">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={last7Days}>

              <CartesianGrid
                stroke="#334155"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="day"
                stroke="#94a3b8"
              />

              <YAxis
                stroke="#94a3b8"
                allowDecimals={false}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>

      </section>

      {/* ======================================================
          FORECAST SUMMARY
      ====================================================== */}

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">

        <MetricCard
          label="Expected Revenue"
          value={`$${expectedRevenue.toLocaleString()}`}
          description="Next 7 days prediction"
          icon={
            <DollarSign className="h-6 w-6" />
          }
          accent="text-emerald-400"
        />

        <MetricCard
          label="Recommended Staff"
          value={recommendedStaff}
          description="Expected staffing requirement"
          icon={
            <Users className="h-6 w-6" />
          }
          accent="text-cyan-400"
        />

        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 sm:p-5">

          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-400" />

            <span className="text-sm text-cyan-300">
              AI Forecast
            </span>
          </div>

          <p className="text-sm leading-6 text-white/80">
            {insights?.forecastMessage ??
              "Forecast information is currently unavailable."}
          </p>

        </div>

      </section>

      {/* ======================================================
          NEXT 7 DAYS RESERVATION FORECAST
      ====================================================== */}

      <section className="mt-8 rounded-xl border border-white/10 bg-slate-800 p-4 sm:p-6">

        <div className="mb-5 flex items-center justify-between gap-3">

          <div>
            <h3 className="text-lg font-semibold text-white">
              Next 7 Days Forecast
            </h3>

            <p className="mt-1 text-sm text-white/40">
              Predicted reservation demand
            </p>
          </div>

          <Gauge className="h-5 w-5 text-cyan-400" />

        </div>

        <div className="space-y-3">

          {forecastNextWeek.length === 0 ? (

            <div className="rounded-lg bg-slate-900 p-4 text-sm text-white/50">
              Forecast data is currently unavailable.
            </div>

          ) : (

            forecastNextWeek.map(
              (day: any, index: number) => (

                <div
                  key={`${day?.day ?? "day"}-${index}`}
                  className="flex items-center justify-between gap-4 rounded-lg bg-slate-900 px-4 py-3"
                >

                  <span className="text-sm text-white sm:text-base">
                    {day?.day ?? "N/A"}
                  </span>

                  <span className="font-semibold text-cyan-400">
                    {Number(
                      day?.predicted ?? 0
                    )} Reservations
                  </span>

                </div>

              )
            )

          )}

        </div>

      </section>

      {/* ======================================================
          EXECUTIVE DECISION CENTER
      ====================================================== */}

      <section className="mt-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 to-slate-800 p-5 sm:p-6">

        <div className="mb-6 flex items-start gap-3 sm:items-center">

          <BrainCircuit className="h-7 w-7 text-cyan-400" />

          <div>
            <h2 className="text-xl font-semibold text-white">
              Executive Decision Center
            </h2>

            <p className="mt-1 text-sm text-white/40">
              AI-generated operational recommendation
            </p>
          </div>

        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {/* Priority */}

          <div>
            <div className="text-xs uppercase tracking-wide text-white/40">
              Priority
            </div>

            <div className="mt-2">

              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${decisionColorClasses.badge}`}
              >
                {executiveDecision.priority}
              </span>

            </div>
          </div>

          {/* Action */}

          <div>
            <div className="text-xs uppercase tracking-wide text-white/40">
              Recommended Action
            </div>

            <div className="mt-2 font-semibold text-white">
              {executiveDecision.action}
            </div>

            <div className="mt-2 flex items-center gap-2">

              <span
                className={`h-2 w-2 rounded-full animate-pulse ${decisionColorClasses.dot}`}
              />

              <span className="text-xs text-white/40">
                {executiveDecision.status}
              </span>

            </div>
          </div>

          {/* Confidence */}

          <div>
            <div className="text-xs uppercase tracking-wide text-white/40">
              Confidence
            </div>

            <div className="mt-2 text-lg font-bold text-emerald-400">
              {Number(
                executiveDecision.confidence ?? 0
              )}%
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-700"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(
                      0,
                      Number(
                        executiveDecision.confidence ?? 0
                      )
                    )
                  )}%`,
                }}
              />

            </div>
          </div>

          {/* Impact */}

          <div>
            <div className="text-xs uppercase tracking-wide text-white/40">
              Expected Impact
            </div>

            <div className="mt-2 text-lg font-bold text-orange-400">
              {executiveDecision.impact}
            </div>

            <div className="mt-2 flex items-center gap-2">

              <Sparkles className="h-4 w-4 text-yellow-400" />

              <span className="text-xs text-white/40">
                AI Optimized
              </span>

            </div>
          </div>

        </div>

      </section>

      {/* ======================================================
          AI ACTION PLANNER
      ====================================================== */}

      <section className="mt-8 rounded-2xl border border-white/10 bg-slate-800 p-4 sm:p-6">

        <div className="mb-5 flex items-start gap-3 sm:items-center">

          <Activity className="h-6 w-6 text-cyan-400" />

          <div>
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              AI Action Planner
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Today's recommended operational timeline
            </p>
          </div>

        </div>

        <div className="space-y-3">

          {actionTimeline.length === 0 ? (

            <div className="rounded-lg bg-slate-900 px-4 py-3 text-sm text-white/50">
              No operational actions are currently scheduled.
            </div>

          ) : (

            actionTimeline.map(
              (item: any, index: number) => (

                <div
                  key={`${item?.time ?? "action"}-${index}`}
                  className="flex flex-col gap-3 rounded-lg border border-white/10 bg-slate-900 px-4 py-3 md:flex-row md:items-center md:justify-between"
                >

                  <div>

                    <div className="text-sm text-cyan-400">
                      {item?.time ?? "N/A"}
                    </div>

                    <div className="mt-1 font-medium text-white">
                      {item?.title ?? "Operational task"}
                    </div>

                  </div>

                  <div className="flex flex-wrap items-center gap-2">

                    <input
                      type="checkbox"
                      checked={
                        item?.status === "completed"
                      }
                      readOnly
                      aria-label={`Task ${index + 1} status`}
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
                          item?.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : item?.status === "active"
                            ? "bg-cyan-500/20 text-cyan-400"
                            : "bg-white/10 text-white/50"
                        }
                      `}
                    >
                      {item?.status ?? "pending"}
                    </span>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </section>      

      {/* ============================================================
          MANAGER WORKFLOW
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 md:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Manager Workflow
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Today's completion status
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-3xl font-bold text-cyan-300">
              {insights.workflowProgress}%
            </div>

            <div className="text-xs text-white/40">
              Completed
            </div>
          </div>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-cyan-400 transition-all duration-700"
            style={{
              width: `${Math.min(
                100,
                Math.max(0, insights.workflowProgress)
              )}%`,
            }}
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="text-sm text-white/40">
              Tasks
            </div>

            <div className="mt-1 font-semibold text-white">
              {insights.completedTasks} / {insights.totalTasks}
            </div>
          </div>

          <div>
            <div className="text-sm text-white/40">
              Manager Productivity
            </div>

            <div className="mt-1 font-semibold text-emerald-400">
              {Math.round(insights.managerProductivity)}%
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          EXECUTIVE AI BRAIN
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-900 p-4 md:p-6">
        <div className="mb-6 flex items-start gap-3">
          <BrainCircuit className="mt-0.5 h-7 w-7 shrink-0 text-cyan-400" />

          <div>
            <h2 className="text-lg font-semibold text-cyan-300 md:text-xl">
              Executive AI Brain
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Consolidated restaurant intelligence
            </p>
          </div>
        </div>

        {/* Health Score */}
        <div className="mb-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 md:p-5">
          <div className="text-xs uppercase tracking-wide text-white/40">
            Restaurant Health
          </div>

          <div className="mt-2 text-3xl font-bold text-cyan-300 md:text-4xl">
            {executiveBrain.healthScore}%
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all duration-700"
              style={{
                width: `${Math.min(
                  100,
                  Math.max(0, executiveBrain.healthScore)
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Executive Priority */}
        <div className="mb-6 rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 md:p-5">
          <div className="text-xs uppercase tracking-wide text-white/40">
            Executive Priority
          </div>

          <div className="mt-2 text-xl font-bold text-orange-400 md:text-2xl">
            {executiveBrain.executivePriority}
          </div>
        </div>

        {/* Insights / Risks / Opportunities */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Insights */}
          <div>
            <div className="mb-3 flex items-center gap-2 font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Insights
            </div>

            <div className="space-y-2">
              {executiveBrain.insights?.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg bg-emerald-500/5 px-3 py-2 text-xs leading-6 text-white/80 md:text-sm"
                  >
                    • {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Risks */}
          <div>
            <div className="mb-3 flex items-center gap-2 font-semibold text-red-400">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              Risks
            </div>

            <div className="space-y-2">
              {executiveBrain.risks?.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg bg-red-500/5 px-3 py-2 text-xs leading-6 text-white/80 md:text-sm"
                  >
                    • {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Opportunities */}
          <div>
            <div className="mb-3 flex items-center gap-2 font-semibold text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Opportunities
            </div>

            <div className="space-y-2">
              {executiveBrain.opportunities?.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg bg-cyan-500/5 px-3 py-2 text-xs leading-6 text-white/80 md:text-sm"
                  >
                    • {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Executive Actions */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-3 font-semibold text-cyan-300">
              Executive Actions
            </div>

            <div className="space-y-2">
              {executiveBrain.executiveActions?.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg bg-cyan-500/10 px-3 py-2 text-sm leading-6 text-cyan-100"
                  >
                    ✓ {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Executive Warnings */}
          <div>
            <div className="mb-3 font-semibold text-red-400">
              Executive Warnings
            </div>

            <div className="space-y-2">
              {executiveBrain.executiveWarnings?.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg bg-red-500/10 px-3 py-2 text-sm leading-6 text-red-200"
                  >
                    ⚠ {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Strategy Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Revenue Strategy */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 md:p-5">
            <h3 className="mb-3 font-semibold text-emerald-300">
              Revenue Strategy
            </h3>

            <div className="space-y-2">
              {executiveBrain.revenueStrategy?.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="text-sm leading-6 text-white/80"
                  >
                    • {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Marketing Strategy */}
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 md:p-5">
            <h3 className="mb-3 font-semibold text-cyan-300">
              Marketing Strategy
            </h3>

            <div className="space-y-2">
              {executiveBrain.marketingStrategy?.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="text-sm leading-6 text-white/80"
                  >
                    • {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Staffing Strategy */}
          <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 md:p-5">
            <h3 className="mb-3 font-semibold text-orange-300">
              Staff Strategy
            </h3>

            <div className="space-y-2">
              {executiveBrain.staffingStrategy?.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="text-sm leading-6 text-white/80"
                  >
                    • {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Customer Strategy */}
          <div className="rounded-xl border border-pink-500/20 bg-pink-500/5 p-4 md:p-5">
            <h3 className="mb-3 font-semibold text-pink-300">
              Customer Strategy
            </h3>

            <div className="space-y-2">
              {executiveBrain.customerStrategy?.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="text-sm leading-6 text-white/80"
                  >
                    • {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Growth Strategy */}
          <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 md:p-5 lg:col-span-2">
            <h3 className="mb-3 font-semibold text-violet-300">
              Growth Strategy
            </h3>

            <div className="grid gap-2 md:grid-cols-2">
              {executiveBrain.growthStrategy?.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="text-sm leading-6 text-white/80"
                  >
                    • {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CEO WEEKLY AI REPORT
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 md:p-6">
        <div className="mb-6 flex items-center gap-3">
          <BrainCircuit className="h-6 w-6 text-yellow-300" />

          <h2 className="text-lg font-semibold text-yellow-300 md:text-xl">
            CEO Weekly AI Report
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <div className="text-sm text-white/40">
              AI Summary
            </div>

            <div className="mt-2 text-sm leading-7 text-white/80">
              {executiveBrain.ceoSummary}
            </div>
          </div>

          <div>
            <div className="text-sm text-white/40">
              CEO Decision
            </div>

            <div className="mt-2 text-sm leading-7 text-cyan-300">
              {executiveBrain.ceoDecision}
            </div>
          </div>

          <div>
            <div className="text-sm text-white/40">
              Business Outlook
            </div>

            <div className="mt-2 text-sm leading-7 text-emerald-300">
              {executiveBrain.ceoOutlook}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          AI AUTONOMOUS OPTIMIZATION
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 md:p-6">
        <div className="mb-6 flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-purple-300" />

          <div>
            <h2 className="text-lg font-semibold text-purple-300 md:text-xl">
              AI Autonomous Optimization
            </h2>

            <p className="mt-1 text-sm text-white/40">
              AI-generated optimization opportunities
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 font-semibold text-cyan-300">
              Optimization Tasks
            </h3>

            <div className="space-y-2">
              {executiveBrain.optimizationTasks?.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg bg-cyan-500/10 px-3 py-2 text-sm leading-6 text-cyan-100"
                  >
                    ⚙ {item}
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-emerald-300">
              Expected Benefits
            </h3>

            <div className="space-y-2">
              {executiveBrain.optimizationBenefits?.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm leading-6 text-emerald-100"
                  >
                    ✓ {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          RESTAURANT DIGITAL TWIN
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5 md:p-6">
        <div className="mb-6 flex items-start gap-3">
          <BrainCircuit className="mt-0.5 h-6 w-6 shrink-0 text-indigo-300" />

          <div>
            <h2 className="text-lg font-semibold text-indigo-300 md:text-xl">
              Restaurant Digital Twin
            </h2>

            <p className="mt-1 text-sm text-white/40">
              AI simulation of future restaurant performance
            </p>
          </div>
        </div>

        {/* Future Simulation */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 md:p-5">
            <h3 className="mb-4 font-semibold text-cyan-300">
              Future Simulation
            </h3>

            <div className="space-y-2">
              {executiveBrain.simulations?.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg bg-indigo-500/10 px-3 py-2 text-sm leading-6 text-white/80"
                  >
                    🔮 {item}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Simulation Risks */}
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 md:p-5">
            <h3 className="mb-4 font-semibold text-red-300">
              Future Risks
            </h3>

            <div className="space-y-2">
              {executiveBrain.simulationRisks?.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg bg-red-500/10 px-3 py-2 text-sm leading-6 text-red-200"
                  >
                    ⚠ {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Simulation Revenue */}
        <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 md:p-5">
          <h3 className="mb-4 font-semibold text-emerald-300">
            Revenue Forecast
          </h3>

          <div className="space-y-2">
            {executiveBrain.simulationRevenue?.map(
              (item: string, index: number) => (
                <div
                  key={index}
                  className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm leading-6 text-emerald-100"
                >
                  💰 {item}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          BUSINESS INTELLIGENCE SCORECARD
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 md:p-6">
        <div className="mb-6 flex items-center gap-3">
          <Activity className="h-6 w-6 text-emerald-300" />

          <div>
            <h2 className="text-lg font-semibold text-emerald-300 md:text-xl">
              Business Intelligence Scorecard
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Executive-level restaurant performance indicators
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {/* Profitability */}
          <div className="rounded-xl border border-emerald-500/20 bg-slate-900/50 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Profitability
            </div>

            <div className="mt-2 text-2xl font-bold text-emerald-400 md:text-3xl">
              {executiveBrain.profitabilityScore}%
            </div>
          </div>

          {/* Business */}
          <div className="rounded-xl border border-cyan-500/20 bg-slate-900/50 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Business
            </div>

            <div className="mt-2 text-2xl font-bold text-cyan-400 md:text-3xl">
              {executiveBrain.businessScore}%
            </div>
          </div>

          {/* Customers */}
          <div className="rounded-xl border border-pink-500/20 bg-slate-900/50 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Customers
            </div>

            <div className="mt-2 text-2xl font-bold text-pink-400 md:text-3xl">
              {executiveBrain.customerHealth}%
            </div>
          </div>

          {/* Operations */}
          <div className="rounded-xl border border-orange-500/20 bg-slate-900/50 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Operations
            </div>

            <div className="mt-2 text-2xl font-bold text-orange-400 md:text-3xl">
              {executiveBrain.operationalEfficiency}%
            </div>
          </div>

          {/* Revenue */}
          <div className="rounded-xl border border-yellow-500/20 bg-slate-900/50 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Revenue
            </div>

            <div className="mt-2 text-2xl font-bold text-yellow-400 md:text-3xl">
              {executiveBrain.revenueStability}%
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          EXECUTIVE KPI BENCHMARK
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 md:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-yellow-300 md:text-xl">
            Executive KPI Benchmark
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Comparison of restaurant KPIs against executive targets
          </p>
        </div>

        <div className="space-y-3">
          {executiveBrain.benchmarkResults?.map(
            (item: string, index: number) => (
              <div
                key={index}
                className="flex flex-col gap-3 rounded-xl bg-slate-800 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm leading-6 text-white">
                  {item}
                </span>

                <span className="w-fit rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300">
                  {executiveBrain.benchmarkStatus?.[index] ?? "Monitoring"}
                </span>
              </div>
            )
          )}
        </div>
      </section>

      {/* ============================================================
          MULTI-BRANCH COMPARISON
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5 md:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-indigo-300 md:text-xl">
            Multi-Branch Comparison
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Comparative performance across restaurant branches
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-3 pb-3 text-xs font-semibold uppercase tracking-wide text-white/50">
                  Branch
                </th>

                <th className="px-3 pb-3 text-xs font-semibold uppercase tracking-wide text-white/50">
                  Revenue
                </th>

                <th className="px-3 pb-3 text-xs font-semibold uppercase tracking-wide text-white/50">
                  Occupancy
                </th>

                <th className="px-3 pb-3 text-xs font-semibold uppercase tracking-wide text-white/50">
                  Growth
                </th>

                <th className="px-3 pb-3 text-xs font-semibold uppercase tracking-wide text-white/50">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {executiveBrain.branchComparison?.map(
                (
                  branch: {
                    branch: string;
                    revenue: number | string;
                    occupancy: number;
                    growth: number;
                    status: string;
                  },
                  index: number
                ) => (
                  <tr
                    key={`${branch.branch}-${index}`}
                    className="border-b border-white/5"
                  >
                    <td className="px-3 py-3 text-sm text-white">
                      {branch.branch}
                    </td>

                    <td className="px-3 py-3 text-sm font-semibold text-emerald-300">
                      $
                      {typeof branch.revenue === "number"
                        ? branch.revenue.toLocaleString()
                        : branch.revenue}
                    </td>

                    <td className="px-3 py-3 text-sm font-semibold text-cyan-300">
                      {branch.occupancy}%
                    </td>

                    <td className="px-3 py-3 text-sm font-semibold text-yellow-300">
                      {branch.growth}%
                    </td>

                    <td className="px-3 py-3 text-sm font-semibold text-pink-300">
                      {branch.status}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ============================================================
          CEO DAILY BRIEF
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-emerald-500/20 bg-slate-900 p-5 md:p-6">
        <div className="mb-6 flex items-center gap-3">
          <BrainCircuit className="h-6 w-6 text-emerald-300" />

          <div>
            <h2 className="text-lg font-semibold text-emerald-300 md:text-xl">
              Executive Daily Brief
            </h2>

            <p className="mt-1 text-sm text-white/40">
              High-priority intelligence for today's management decisions
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Headline */}
          <div>
            <div className="text-xs uppercase tracking-wide text-white/40">
              Headline
            </div>

            <div className="mt-2 text-xl font-bold leading-8 text-emerald-300 md:text-2xl">
              {executiveBrain.executiveHeadline}
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="text-xs uppercase tracking-wide text-white/40">
              Summary
            </div>

            <div className="mt-2 text-sm leading-7 text-white/80 md:text-base">
              {executiveBrain.executiveSummary}
            </div>
          </div>

          {/* Today's Focus */}
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Today's Focus
            </div>

            <div className="mt-2 font-semibold leading-7 text-cyan-300">
              {executiveBrain.todayFocus}
            </div>
          </div>

          {/* Executive Alerts */}
          <div>
            <div className="mb-3 text-xs uppercase tracking-wide text-white/40">
              Executive Alerts
            </div>

            {executiveBrain.executiveAlerts?.length === 0 ? (
              <div className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
                No critical alerts.
              </div>
            ) : (
              <div className="space-y-2">
                {executiveBrain.executiveAlerts?.map(
                  (alert: string, index: number) => (
                    <div
                      key={index}
                      className="rounded-lg bg-red-500/10 px-3 py-2 text-sm leading-6 text-red-300"
                    >
                      ⚠ {alert}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          AI REVENUE FORECAST
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 md:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-cyan-300 md:text-xl">
            AI Revenue Forecast
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Predictive revenue outlook generated from restaurant performance
            signals
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Next Week */}
          <div className="rounded-xl border border-emerald-500/20 bg-slate-900/50 p-4">
            <div className="text-sm text-white/40">
              Next Week
            </div>

            <div className="mt-2 text-2xl font-bold text-emerald-300 md:text-3xl">
              $
              {typeof executiveBrain.nextWeekRevenue === "number"
                ? executiveBrain.nextWeekRevenue.toLocaleString()
                : executiveBrain.nextWeekRevenue}
            </div>
          </div>

          {/* Next Month */}
          <div className="rounded-xl border border-cyan-500/20 bg-slate-900/50 p-4">
            <div className="text-sm text-white/40">
              Next Month
            </div>

            <div className="mt-2 text-2xl font-bold text-cyan-300 md:text-3xl">
              $
              {typeof executiveBrain.nextMonthRevenue === "number"
                ? executiveBrain.nextMonthRevenue.toLocaleString()
                : executiveBrain.nextMonthRevenue}
            </div>
          </div>

          {/* Confidence */}
          <div className="rounded-xl border border-yellow-500/20 bg-slate-900/50 p-4">
            <div className="text-sm text-white/40">
              Confidence
            </div>

            <div className="mt-2 text-2xl font-bold text-yellow-300 md:text-3xl">
              {executiveBrain.revenueConfidence}%
            </div>
          </div>

          {/* Trend */}
          <div className="rounded-xl border border-pink-500/20 bg-slate-900/50 p-4">
            <div className="text-sm text-white/40">
              Trend
            </div>

            <div className="mt-2 text-2xl font-bold text-pink-300 md:text-3xl">
              {executiveBrain.revenueTrend}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          AI RESERVATION FORECAST
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 md:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-purple-300 md:text-xl">
            AI Reservation Forecast
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Expected reservation demand across upcoming periods
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-slate-900/40 p-4">
            <div className="text-sm text-white/40">
              Tomorrow
            </div>

            <div className="mt-2 text-2xl font-bold text-cyan-300 md:text-3xl">
              {executiveBrain.tomorrowReservations}
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/40 p-4">
            <div className="text-sm text-white/40">
              Next Week
            </div>

            <div className="mt-2 text-2xl font-bold text-emerald-300 md:text-3xl">
              {executiveBrain.nextWeekReservations}
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/40 p-4">
            <div className="text-sm text-white/40">
              Next Month
            </div>

            <div className="mt-2 text-2xl font-bold text-yellow-300 md:text-3xl">
              {executiveBrain.nextMonthReservations}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-slate-900/40 p-4">
            <div className="text-sm text-white/40">
              Trend
            </div>

            <div className="mt-2 text-xl font-bold text-pink-300">
              {executiveBrain.reservationTrend}
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/40 p-4">
            <div className="text-sm text-white/40">
              Confidence
            </div>

            <div className="mt-2 text-xl font-bold text-cyan-300">
              {executiveBrain.reservationConfidence}%
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/40 p-4">
            <div className="text-sm text-white/40">
              Risk
            </div>

            <div className="mt-2 text-xl font-bold text-red-300">
              {executiveBrain.reservationRisk}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          AI OCCUPANCY PREDICTION
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5 md:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-orange-300 md:text-xl">
            AI Occupancy Prediction
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Predicted utilization and operational recommendation
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
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

            <div className="mt-2 text-sm leading-6 text-white/80">
              {executiveBrain.occupancyRecommendation}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          AI SEASONAL TREND
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5 md:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-pink-300 md:text-xl">
            AI Seasonal Trend
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Seasonal demand, revenue and occupancy intelligence
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div>
            <div className="text-sm text-white/40">
              Current Season
            </div>

            <div className="mt-2 text-2xl font-bold text-pink-300 md:text-3xl">
              {executiveBrain.currentSeason}
            </div>
          </div>

          <div>
            <div className="text-sm text-white/40">
              Growth
            </div>

            <div className="mt-2 text-2xl font-bold text-cyan-300 md:text-3xl">
              {executiveBrain.seasonalGrowth}%
            </div>
          </div>

          <div>
            <div className="text-sm text-white/40">
              Predicted Revenue
            </div>

            <div className="mt-2 text-2xl font-bold text-emerald-300 md:text-3xl">
              $
              {typeof executiveBrain.seasonalRevenue === "number"
                ? executiveBrain.seasonalRevenue.toLocaleString()
                : executiveBrain.seasonalRevenue}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
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

            <div className="mt-2 text-sm leading-6 text-white/80">
              {executiveBrain.seasonalRecommendation}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          AI EVENT & HOLIDAY IMPACT
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 md:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-yellow-300 md:text-xl">
            AI Event &amp; Holiday Impact
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Expected effect of events and holidays on restaurant demand
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <div className="text-sm text-white/40">
              Event
            </div>

            <div className="mt-2 text-xl font-bold text-yellow-300">
              {executiveBrain.eventName}
            </div>
          </div>

          <div>
            <div className="text-sm text-white/40">
              Demand
            </div>

            <div className="mt-2 text-xl font-bold text-orange-300">
              {executiveBrain.demandLevel}
            </div>
          </div>

          <div>
            <div className="text-sm text-white/40">
              Business Boost
            </div>

            <div className="mt-2 text-xl font-bold text-emerald-300">
              {executiveBrain.businessBoost}%
            </div>
          </div>

          <div>
            <div className="text-sm text-white/40">
              Revenue
            </div>

            <div className="mt-2 text-xl font-bold text-cyan-300">
              $
              {typeof executiveBrain.holidayRevenue === "number"
                ? executiveBrain.holidayRevenue.toLocaleString()
                : executiveBrain.holidayRevenue}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-yellow-500/5 p-4">
          <div className="text-sm text-white/40">
            Recommendation
          </div>

          <div className="mt-2 text-sm leading-7 text-white/80">
            {executiveBrain.holidayRecommendation}
          </div>
        </div>
      </section>

      {/* ============================================================
          AI FORECAST & PERFORMANCE OUTLOOK
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5 md:p-6">
        <div className="mb-6 flex items-start gap-3">
          <TrendingUp className="mt-0.5 h-6 w-6 shrink-0 text-indigo-400" />

          <div>
            <h2 className="text-lg font-semibold text-indigo-300 md:text-xl">
              AI Forecast & Performance Outlook
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Predictive business performance for the coming period
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Predicted Revenue
            </div>

            <div className="mt-2 text-2xl font-bold text-emerald-300">
              $
              {Number(
                insights.predictedRevenue ?? executiveBrain.nextWeekRevenue ?? 0
              ).toLocaleString()}
            </div>
          </div>

          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Reservations
            </div>

            <div className="mt-2 text-2xl font-bold text-cyan-300">
              {insights.predictedReservations ??
                executiveBrain.nextWeekReservations ??
                0}
            </div>
          </div>

          <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Occupancy
            </div>

            <div className="mt-2 text-2xl font-bold text-orange-300">
              {insights.occupancyForecast ??
                executiveBrain.predictedOccupancy ??
                0}
              %
            </div>
          </div>

          <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              AI Confidence
            </div>

            <div className="mt-2 text-2xl font-bold text-violet-300">
              {insights.aiConfidence ??
                executiveBrain.revenueConfidence ??
                0}
              %
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CUSTOMER INTELLIGENCE
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 md:p-6">
        <div className="mb-6 flex items-start gap-3">
          <Users className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" />

          <div>
            <h2 className="text-lg font-semibold text-emerald-300 md:text-xl">
              Customer Intelligence
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Customer loyalty, retention and relationship health
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              VIP Customers
            </div>

            <div className="mt-2 text-2xl font-bold text-yellow-300">
              {insights.vipCustomers ?? 0}
            </div>
          </div>

          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Returning Customers
            </div>

            <div className="mt-2 text-2xl font-bold text-cyan-300">
              {insights.returningCustomers ?? 0}
            </div>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              At Risk
            </div>

            <div className="mt-2 text-2xl font-bold text-red-300">
              {insights.atRiskCustomers ?? 0}
            </div>
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Satisfaction
            </div>

            <div className="mt-2 text-2xl font-bold text-emerald-300">
              {insights.customerSatisfaction ?? 0}%
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Loyalty Score
            </div>

            <div className="mt-2 text-2xl font-bold text-amber-300">
              {insights.loyaltyScore ?? 0}
            </div>

            <div className="mt-3 text-sm text-white/70">
              VIP Status:{" "}
              <span className="font-semibold text-cyan-300">
                {insights.vipStatus ?? "Normal"}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-pink-500/20 bg-pink-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Retention Priority
            </div>

            <div className="mt-2 text-xl font-bold text-pink-300">
              {insights.retentionPriority ?? "Monitor"}
            </div>

            <div className="mt-3 text-sm text-white/70">
              Premium Customers:{" "}
              <span className="font-semibold text-purple-300">
                {insights.premiumCustomers ?? 0}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          KPI PERFORMANCE SUMMARY
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-white/10 bg-slate-800 p-5 md:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white md:text-xl">
            KPI Performance Summary
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Overall restaurant performance indicators
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Business Score
            </div>

            <div className="mt-2 text-3xl font-bold text-cyan-300">
              {executiveBrain.businessScore ?? 0}%
            </div>
          </div>

          <div className="rounded-xl border border-pink-500/20 bg-pink-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Customer Health
            </div>

            <div className="mt-2 text-3xl font-bold text-pink-300">
              {executiveBrain.customerHealth ?? 0}%
            </div>
          </div>

          <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Operational Efficiency
            </div>

            <div className="mt-2 text-3xl font-bold text-orange-300">
              {executiveBrain.operationalEfficiency ?? 0}%
            </div>
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Revenue Stability
            </div>

            <div className="mt-2 text-3xl font-bold text-yellow-300">
              {executiveBrain.revenueStability ?? 0}%
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FUTURE RISKS & OPPORTUNITIES
      ============================================================ */}

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 md:p-6">
          <h2 className="mb-5 text-lg font-semibold text-red-300 md:text-xl">
            Future Risks
          </h2>

          <div className="space-y-2">
            {executiveBrain.simulationRisks?.length ? (
              executiveBrain.simulationRisks.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg bg-red-500/10 px-3 py-2 text-sm leading-6 text-red-200"
                  >
                    ⚠ {item}
                  </div>
                )
              )
            ) : (
              <div className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
                No major future risks detected.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 md:p-6">
          <h2 className="mb-5 text-lg font-semibold text-emerald-300 md:text-xl">
            Expected Revenue Opportunities
          </h2>

          <div className="space-y-2">
            {executiveBrain.simulationRevenue?.length ? (
              executiveBrain.simulationRevenue.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm leading-6 text-emerald-200"
                  >
                    💰 {item}
                  </div>
                )
              )
            ) : (
              <div className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white/50">
                No revenue opportunities available.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          CEO OUTLOOK
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 md:p-6">
        <div className="mb-5 flex items-center gap-3">
          <BrainCircuit className="h-6 w-6 text-violet-400" />

          <h2 className="text-lg font-semibold text-violet-300 md:text-xl">
            CEO Business Outlook
          </h2>
        </div>

        <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-4 md:p-5">
          <div className="text-xs uppercase tracking-wide text-white/40">
            Business Outlook
          </div>

          <div className="mt-2 text-xl font-bold leading-7 text-emerald-300">
            {executiveBrain.ceoOutlook ?? "Business performance is being monitored."}
          </div>
        </div>
      </section>

      {/* ============================================================
          AI BUSINESS INTELLIGENCE
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 md:p-6">
        <div className="mb-6 flex items-start gap-3">
          <BrainCircuit className="mt-0.5 h-6 w-6 shrink-0 text-cyan-400" />

          <div>
            <h2 className="text-lg font-semibold text-cyan-300 md:text-xl">
              AI Predictive Business Intelligence
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Predictive signals for revenue, reservations and operational risk
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <DollarSign className="mb-3 h-6 w-6 text-emerald-400" />

            <div className="text-xs uppercase tracking-wide text-white/40">
              Predicted Revenue
            </div>

            <div className="mt-2 text-2xl font-bold text-white">
              $
              {Number(insights.predictedRevenue ?? 0).toLocaleString()}
            </div>
          </div>

          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
            <Users className="mb-3 h-6 w-6 text-cyan-400" />

            <div className="text-xs uppercase tracking-wide text-white/40">
              Predicted Reservations
            </div>

            <div className="mt-2 text-2xl font-bold text-white">
              {insights.predictedReservations ?? 0}
            </div>
          </div>

          <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
            <ShieldAlert className="mb-3 h-6 w-6 text-orange-400" />

            <div className="text-xs uppercase tracking-wide text-white/40">
              Cancellation Risk
            </div>

            <div className="mt-2 text-2xl font-bold text-white">
              {insights.cancellationRisk ?? "Low"}
            </div>
          </div>

          <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
            <BrainCircuit className="mb-3 h-6 w-6 text-violet-400" />

            <div className="text-xs uppercase tracking-wide text-white/40">
              AI Confidence
            </div>

            <div className="mt-2 text-2xl font-bold text-white">
              {insights.aiConfidence ?? 0}%
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          EXECUTIVE RECOMMENDATIONS
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-800 p-5 md:p-6">
        <h2 className="mb-6 text-lg font-semibold text-cyan-300 md:text-xl">
          Executive Recommendations
        </h2>

        <div className="space-y-5">
          <div>
            <div className="text-xs uppercase tracking-wide text-white/40">
              Priority
            </div>

            <div className="mt-2 font-semibold leading-6 text-cyan-300">
              {insights.executivePriority ?? "Monitor business performance"}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wide text-white/40">
              Promotion Strategy
            </div>

            <div className="mt-2 font-semibold leading-6 text-emerald-300">
              {insights.promotionRecommendation ??
                "Maintain targeted promotional activity."}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wide text-white/40">
              Staff Recommendation
            </div>

            <div className="mt-2 font-semibold leading-6 text-orange-300">
              {insights.staffRecommendation ??
                "Maintain staffing according to forecast demand."}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          REVENUE PROJECTION
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-white/10 bg-slate-800 p-4 md:p-6">
        <h2 className="mb-5 text-lg font-semibold text-cyan-300">
          Revenue Projection
        </h2>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueProjection ?? []}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ffffff10"
              />

              <XAxis
                dataKey="day"
                stroke="#ffffff50"
              />

              <YAxis
                stroke="#ffffff50"
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                fill="#22c55e33"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ============================================================
          STAFF FORECAST
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-white/10 bg-slate-800 p-4 md:p-6">
        <h2 className="mb-5 text-lg font-semibold text-cyan-300">
          Staff Forecast
        </h2>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={staffProjection ?? []}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ffffff10"
              />

              <XAxis
                dataKey="day"
                stroke="#ffffff50"
              />

              <YAxis
                stroke="#ffffff50"
              />

              <Tooltip />

              <Bar
                dataKey="staff"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ============================================================
          OCCUPANCY SCORE
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-800 p-5 md:p-6">
        <h2 className="mb-5 text-lg font-semibold text-cyan-300">
          Occupancy Score
        </h2>

        <div className="flex justify-center">
          <RadialBarChart
            width={250}
            height={250}
            innerRadius="70%"
            outerRadius="100%"
            data={[
              {
                value: Math.min(
                  100,
                  Math.max(0, Number(insights.occupancyForecast ?? 0))
                ),
              },
            ]}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              tick={false}
            />

            <RadialBar
              dataKey="value"
              fill="#06b6d4"
              cornerRadius={12}
            />
          </RadialBarChart>
        </div>

        <div className="text-center text-4xl font-bold text-cyan-400">
          {insights.utilizationRate ?? 0}%
        </div>
      </section>

      {/* ============================================================
          FINAL EXECUTIVE STATUS
      ============================================================ */}

      <section className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-white/40">
              Executive Status
            </div>

            <div className="mt-2 text-2xl font-bold text-emerald-300">
              {executiveBrain.executiveStatus ?? "Operational"}
            </div>
          </div>

          <div className="text-left md:text-right">
            <div className="text-xs uppercase tracking-wide text-white/40">
              Restaurant Health
            </div>

            <div className="mt-2 text-3xl font-bold text-cyan-300">
              {executiveBrain.healthScore ?? 0}%
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default memo(RestaurantInsights);