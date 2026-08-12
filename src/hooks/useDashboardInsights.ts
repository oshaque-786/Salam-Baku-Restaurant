import { useMemo } from "react";
import {
  addDays,
  format,
  subDays,
  startOfDay,
  endOfDay,
} from "date-fns";

const RESTAURANT_SEAT_CAPACITY = 60;
const AVERAGE_RESERVATION_VALUE = 45;
const DEFAULT_GUESTS_PER_RESERVATION = 2;
const MIN_RECOMMENDED_STAFF = 2;

export interface DashboardForecastDay {
  day: string;
  date: string;
  predicted: number;
  predictedGuests: number;
}

export interface DashboardInsightDecision {
  priority: "Critical" | "High" | "Marketing" | "Stable";
  action: string;
  confidence: number;
  impact: string;
  color: "red" | "orange" | "emerald" | "cyan";
  status: "Immediate" | "Prepare" | "Campaign" | "Normal";
}

export interface DashboardActionTimelineItem {
  id: number;
  time: string;
  title: string;
  status: "completed" | "active" | "pending";
}

export interface DashboardInsights {
  // Basic analytics
  totalReservations: number;
  busiestDay: string;
  peakHour: string;
  cancellationRate: number;
  confirmationRate: number;
  recommendation: string;

  // Weekly analytics
  last7Days: {
    day: string;
    count: number;
  }[];
  currentWeekTotal: number;
  previousWeekTotal: number;
  weeklyGrowth: number;
  trendDirection: "up" | "down";
  growthLabel:
    | "Excellent"
    | "Growing"
    | "Stable"
    | "Declining"
    | "Critical"
    | "No data";
  busiestWeekDay: {
    day: string;
    count: number;
  };
  weeklyRecommendation: string;
  trendColor: "green" | "red";
  trendIcon: "TrendingUp" | "TrendingDown";

  // Forecast
  forecastNextWeek: DashboardForecastDay[];
  baselineDailyReservations: number;
  averageDailyReservations: number;
  expectedReservations: number;
  expectedGuests: number;
  forecastOccupancy: number;
  recommendedStaff: number;
  expectedRevenue: number;
  forecastMessage: string;

  // Business intelligence
  predictedRevenue: number;
  predictedReservations: number;
  occupancyForecast: number;
  cancellationRisk: "High" | "Medium" | "Low";
  aiConfidence: number;

  executivePriority:
    | "Increase marketing"
    | "Increase staffing"
    | "Maintain operations";
  promotionRecommendation: string;
  staffRecommendation: string;
  restaurantHealth: number;
  revenueConfidence: number;

  // Executive decision
  executiveInsight: string;
  executiveDecision: DashboardInsightDecision;

  // Executive workflow
  actionTimeline: DashboardActionTimelineItem[];
  workflowProgress: number;
  managerProductivity: number;
  completedTasks: number;
  totalTasks: number;

  // Customer intelligence
  vipCustomers: number;
  returningCustomers: number;
  atRiskCustomers: number;
  customerSatisfaction: number;

  // Loyalty
  loyaltyScore: number;
  premiumCustomers: number;
  retentionPriority: "High" | "Normal";
  vipStatus: "Strong" | "Growing";
  retentionRecommendations: string[];

  // Executive analytics
  peakReservationDay: {
    day: string;
    count: number;
  };
  weakestReservationDay: {
    day: string;
    count: number;
  };
  utilizationRate: number;
  occupancyRate: number;
}

export function useDashboardInsights(
  reservations: any[]
): DashboardInsights {
  return useMemo(() => {
    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);

    /*
     * ============================================================
     * EMPTY STATE
     * ============================================================
     */

    if (!reservations.length) {
      return {
        totalReservations: 0,

        busiestDay: "-",
        peakHour: "-",
        cancellationRate: 0,
        confirmationRate: 0,

        recommendation:
          "No reservation data available.",

        last7Days: [],

        currentWeekTotal: 0,
        previousWeekTotal: 0,
        weeklyGrowth: 0,

        trendDirection: "up",
        growthLabel: "No data",

        busiestWeekDay: {
          day: "-",
          count: 0,
        },

        weeklyRecommendation:
          "No reservation data available.",

        trendColor: "green",
        trendIcon: "TrendingUp",

        forecastNextWeek: [],

        baselineDailyReservations: 0,
        averageDailyReservations: 0,

        expectedReservations: 0,
        expectedGuests: 0,
        forecastOccupancy: 0,

        recommendedStaff: MIN_RECOMMENDED_STAFF,

        expectedRevenue: 0,

        forecastMessage:
          "No forecast available.",

        predictedRevenue: 0,
        predictedReservations: 0,
        occupancyForecast: 0,

        cancellationRisk: "Low",

        aiConfidence: 75,

        executivePriority:
          "Maintain operations",

        promotionRecommendation:
          "No promotion required.",

        staffRecommendation:
          "Current staffing OK.",

        restaurantHealth: 0,
        revenueConfidence: 0,

        executiveInsight:
          "No reservation data available.",

        executiveDecision: {
          priority: "Stable",
          action:
            "No recommendation available.",
          confidence: 0,
          impact: "N/A",
          color: "cyan",
          status: "Normal",
        },

        actionTimeline: [],

        workflowProgress: 0,
        managerProductivity: 0,

        completedTasks: 0,
        totalTasks: 0,

        vipCustomers: 0,
        returningCustomers: 0,
        atRiskCustomers: 0,
        customerSatisfaction: 0,

        loyaltyScore: 0,
        premiumCustomers: 0,

        retentionPriority: "Normal",
        vipStatus: "Growing",

        retentionRecommendations: [
          "No customer retention data available.",
        ],

        peakReservationDay: {
          day: "-",
          count: 0,
        },

        weakestReservationDay: {
          day: "-",
          count: 0,
        },

        utilizationRate: 0,
        occupancyRate: 0,
      };
    }

    /*
     * ============================================================
     * BASIC ANALYTICS
     * ============================================================
     */

    const totalReservations =
      reservations.length;

    const dayMap: Record<string, number> = {};
    const hourMap: Record<number, number> = {};

    let cancelled = 0;

    let confirmed = 0;

    reservations.forEach((reservation) => {
      const date = new Date(reservation.date);

      if (Number.isNaN(date.getTime())) {
        return;
      }

      const day = format(date, "EEEE");

      dayMap[day] =
        (dayMap[day] ?? 0) + 1;

      if (reservation.time) {
        const hour = Number(
          String(reservation.time).split(":")[0]
        );

        if (!Number.isNaN(hour)) {
          hourMap[hour] =
            (hourMap[hour] ?? 0) + 1;
        }
      }

      if (
        reservation.status === "cancelled"
      ) {
        cancelled++;
      }

      if (
        reservation.status === "confirmed"
      ) {
        confirmed++;
      }
    });

    const busiestDay =
      Object.entries(dayMap).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] ?? "-";

    const peakHour =
      Object.entries(hourMap).sort(
        (a, b) =>
          Number(b[1]) - Number(a[1])
      )[0]?.[0] ?? "-";

    const cancellationRate =
      Math.round(
        (cancelled / totalReservations) * 100
      );

    const confirmationRate =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            (confirmed / totalReservations) * 100
          )
        )
      );

    let recommendation =
      "Reservation flow looks healthy.";

    if (cancellationRate > 20) {
      recommendation =
        "High cancellation rate detected. Consider confirmation reminders.";
    }

    /*
     * ============================================================
     * LAST 7 DAYS
     * ============================================================
     */

    const last7Days = Array.from(
      { length: 7 },
      (_, index) => {
        const date = subDays(
          now,
          6 - index
        );

        const dateKey = format(
          date,
          "yyyy-MM-dd"
        );

        const count =
          reservations.filter(
            (reservation) => {
              const reservationDate =
                new Date(
                  reservation.date
                );

              if (
                Number.isNaN(
                  reservationDate.getTime()
                )
              ) {
                return false;
              }

              return (
                format(
                  reservationDate,
                  "yyyy-MM-dd"
                ) === dateKey
              );
            }
          ).length;

        return {
          day: format(date, "EEE"),
          count,
        };
      }
    );

    const currentWeekTotal =
      last7Days.reduce(
        (sum, day) =>
          sum + day.count,
        0
      );

    /*
     * Previous 7-day period
     */

    const previousWeekStart =
      startOfDay(
        subDays(now, 13)
      );

    const previousWeekEnd =
      endOfDay(
        subDays(now, 7)
      );

    const previousWeekTotal =
      reservations.filter(
        (reservation) => {
          const reservationDate =
            new Date(
              reservation.date
            );

          if (
            Number.isNaN(
              reservationDate.getTime()
            )
          ) {
            return false;
          }

          return (
            reservationDate >=
              previousWeekStart &&
            reservationDate <=
              previousWeekEnd
          );
        }
      ).length;

    const weeklyGrowth =
      previousWeekTotal === 0
        ? 0
        : Math.round(
            (
              (currentWeekTotal -
                previousWeekTotal) /
              previousWeekTotal
            ) * 100
          );

    const trendDirection =
      weeklyGrowth >= 0
        ? "up"
        : "down";

    const growthLabel =
      weeklyGrowth >= 20
        ? "Excellent"
        : weeklyGrowth >= 5
        ? "Growing"
        : weeklyGrowth >= 0
        ? "Stable"
        : weeklyGrowth >= -10
        ? "Declining"
        : "Critical";

    const busiestWeekDay =
      [...last7Days].sort(
        (a, b) =>
          b.count - a.count
      )[0] ?? {
        day: "-",
        count: 0,
      };

    const weeklyRecommendation =
      weeklyGrowth > 25
        ? "Demand is increasing rapidly. Consider adding more staff."
        : weeklyGrowth < -20
        ? "Reservations have dropped significantly. Launch promotions."
        : currentWeekTotal < 10
        ? "Reservation volume is low. Increase marketing efforts."
        : "Reservation trend looks healthy.";

    const trendColor =
      weeklyGrowth >= 0
        ? "green"
        : "red";

    const trendIcon =
      weeklyGrowth >= 0
        ? "TrendingUp"
        : "TrendingDown";

    /*
     * ============================================================
     * ACTIVE RESERVATIONS / GUESTS
     * ============================================================
     */

    const activeReservations =
      reservations.filter(
        (reservation) =>
          reservation.status !==
          "cancelled"
      );

    const currentWeekGuests =
      activeReservations
        .filter((reservation) => {
          const reservationDate =
            new Date(
              reservation.date
            );

          if (
            Number.isNaN(
              reservationDate.getTime()
            )
          ) {
            return false;
          }

          return (
            reservationDate >=
              subDays(
                todayStart,
                6
              ) &&
            reservationDate <=
              todayEnd
          );
        })
        .reduce(
          (sum, reservation) =>
            sum +
            Number(
              reservation.guests || 0
            ),
          0
        );

    /*
     * ============================================================
     * FORECAST
     * ============================================================
     */

    const baselineDailyReservations =
      currentWeekTotal > 0
        ? currentWeekTotal / 7
        : 0;

    const averageDailyReservations =
      baselineDailyReservations;

    const averageGuestsPerReservation =
      currentWeekTotal > 0 &&
      currentWeekGuests > 0
        ? Math.max(
            1,
            currentWeekGuests /
              currentWeekTotal
          )
        : DEFAULT_GUESTS_PER_RESERVATION;

    const forecastGrowth =
      previousWeekTotal > 0
        ? Math.max(
            -0.2,
            Math.min(
              0.2,
              weeklyGrowth / 100
            )
          )
        : 0;

    const forecastNextWeek =
      Array.from(
        { length: 7 },
        (_, index) => {
          const predicted =
            baselineDailyReservations >
            0
              ? Math.max(
                  1,
                  Math.round(
                    baselineDailyReservations *
                      (1 + forecastGrowth)
                  )
                )
              : 0;

          const predictedGuests =
            Math.round(
              predicted *
                averageGuestsPerReservation
            );

          const forecastDate =
            addDays(
              now,
              index + 1
            );

          return {
            day: format(
              forecastDate,
              "EEE"
            ),

            date: format(
              forecastDate,
              "yyyy-MM-dd"
            ),

            predicted,

            predictedGuests,
          };
        }
      );

    const expectedReservations =
      forecastNextWeek.reduce(
        (sum, day) =>
          sum + day.predicted,
        0
      );

    const expectedGuests =
      forecastNextWeek.reduce(
        (sum, day) =>
          sum + day.predictedGuests,
        0
      );

    const recommendedStaff =
      Math.max(
        MIN_RECOMMENDED_STAFF,
        Math.ceil(
          expectedGuests / 25
        )
      );

    const expectedRevenue =
      Math.round(
        expectedReservations *
          AVERAGE_RESERVATION_VALUE
      );

    /*
     * Occupancy is based on total available
     * seats across seven days.
     */

    const forecastOccupancy =
      Math.min(
        100,
        Math.max(
          0,
          Math.round(
            (
              expectedGuests /
              (
                RESTAURANT_SEAT_CAPACITY *
                7
              )
            ) * 100
          )
        )
      );

    const forecastMessage =
      previousWeekTotal === 0
        ? "Forecast based on the current reservation baseline."
        : weeklyGrowth > 0
        ? "Reservation demand is trending upward."
        : weeklyGrowth < 0
        ? "Reservation demand is trending downward."
        : "Reservation demand is stable.";

    /*
     * ============================================================
     * BUSINESS INTELLIGENCE
     * ============================================================
     */

    const predictedReservations =
      Math.max(
        0,
        Math.round(
          currentWeekTotal *
            (1 + weeklyGrowth / 100)
        )
      );

    const predictedRevenue =
      Math.round(
        predictedReservations *
          AVERAGE_RESERVATION_VALUE
      );

    /*
     * Use the same occupancy model as the
     * primary forecast instead of the old
     * arbitrary /1.2 calculation.
     */

    const occupancyForecast =
      forecastOccupancy;

    const cancellationRisk =
      cancellationRate > 25
        ? "High"
        : cancellationRate > 12
        ? "Medium"
        : "Low";

    const aiConfidence =
      Math.max(
        75,
        Math.min(
          98,
          90 +
            Math.round(
              weeklyGrowth / 5
            )
        )
      );

    const executivePriority =
      occupancyForecast < 50
        ? "Increase marketing"
        : occupancyForecast > 90
        ? "Increase staffing"
        : "Maintain operations";

    const promotionRecommendation =
      occupancyForecast < 55
        ? "Run weekday promotion"
        : "No promotion required";

    const staffRecommendation =
      occupancyForecast > 85
        ? "Increase staff"
        : occupancyForecast < 45
        ? "Reduce shifts"
        : "Current staffing OK";

    /*
     * ============================================================
     * EXECUTIVE ANALYTICS
     * ============================================================
     */

    const peakReservationDay =
      [...last7Days].sort(
        (a, b) =>
          b.count - a.count
      )[0] ?? {
        day: "-",
        count: 0,
      };

    const weakestReservationDay =
      [...last7Days].sort(
        (a, b) =>
          a.count - b.count
      )[0] ?? {
        day: "-",
        count: 0,
      };

    const currentWeekConfirmedGuests =
      reservations
        .filter(
          (reservation) =>
            reservation.status ===
            "confirmed"
        )
        .filter((reservation) => {
          const reservationDate =
            new Date(
              reservation.date
            );

          if (
            Number.isNaN(
              reservationDate.getTime()
            )
          ) {
            return false;
          }

          return (
            reservationDate >=
              subDays(
                todayStart,
                6
              ) &&
            reservationDate <=
              todayEnd
          );
        })
        .reduce(
          (sum, reservation) =>
            sum +
            Number(
              reservation.guests || 0
            ),
          0
        );

    const occupancyRate =
      Math.min(
        100,
        Math.max(
          0,
          Math.round(
            (
              currentWeekConfirmedGuests /
              (
                RESTAURANT_SEAT_CAPACITY *
                7
              )
            ) * 100
          )
        )
      );

    const utilizationRate =
      occupancyRate;

    const executiveInsight =
      utilizationRate > 80
        ? "Restaurant operating near full capacity."
        : utilizationRate > 60
        ? "Healthy reservation demand."
        : "Marketing campaigns recommended to increase bookings.";

    /*
     * ============================================================
     * KPI GAUGES
     * ============================================================
     */

    const restaurantHealth =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            confirmationRate * 0.5 +
              occupancyForecast * 0.3 +
              aiConfidence * 0.2
          )
        )
      );

    const revenueConfidence =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            (
              aiConfidence +
              occupancyForecast
            ) / 2
          )
        )
      );

    /*
     * ============================================================
     * AI DECISION CENTER
     * ============================================================
     */

    const executiveDecision =
      (() => {
        if (
          occupancyForecast > 90
        ) {
          return {
            priority: "Critical" as const,
            action:
              "Increase staffing immediately",
            confidence: 96,
            impact:
              "+18 Reservations",
            color: "red" as const,
            status:
              "Immediate" as const,
          };
        }

        if (
          occupancyForecast > 70
        ) {
          return {
            priority: "High" as const,
            action:
              "Prepare extra inventory",
            confidence: 91,
            impact:
              "+12 Reservations",
            color: "orange" as const,
            status:
              "Prepare" as const,
          };
        }

        if (
          occupancyForecast < 45
        ) {
          return {
            priority:
              "Marketing" as const,
            action:
              "Launch promotion campaign",
            confidence: 93,
            impact:
              "+15 Reservations",
            color:
              "emerald" as const,
            status:
              "Campaign" as const,
          };
        }

        return {
          priority:
            "Stable" as const,
          action:
            "Maintain current operations",
          confidence: 88,
          impact: "Normal",
          color: "cyan" as const,
          status:
            "Normal" as const,
        };
      })();

    /*
     * ============================================================
     * ACTION PLANNER
     * ============================================================
     */

    const actionTimeline: DashboardActionTimelineItem[] =
      [
        {
          id: 1,
          time: "09:00",
          title:
            "Review reservations",
          status: "completed",
        },

        {
          id: 2,
          time: "11:00",
          title:
            executiveDecision.action,
          status: "active",
        },

        {
          id: 3,
          time: "14:00",
          title:
            "Inventory verification",
          status: "pending",
        },

        {
          id: 4,
          time: "18:00",
          title:
            "Peak hour preparation",
          status: "pending",
        },
      ];

    const completedTasks =
      actionTimeline.filter(
        (task) =>
          task.status ===
          "completed"
      ).length;

    const totalTasks =
      actionTimeline.length;

    const workflowProgress =
      totalTasks > 0
        ? Math.round(
            (
              completedTasks /
              totalTasks
            ) * 100
          )
        : 0;

    const managerProductivity =
      Math.min(
        100,
        Math.round(
          workflowProgress +
            aiConfidence / 4
        )
      );

    /*
     * ============================================================
     * CUSTOMER INTELLIGENCE
     * ============================================================
     */

    const vipCustomers =
      Math.round(
        totalReservations * 0.1
      );

    const returningCustomers =
      Math.round(
        totalReservations * 0.35
      );

    const atRiskCustomers =
      Math.round(
        totalReservations *
          (cancellationRate / 100) *
          0.6
      );

    const customerSatisfaction =
      Math.max(
        0,
        Math.min(
          100,
          100 - cancellationRate
        )
      );

    /*
     * ============================================================
     * LOYALTY
     * ============================================================
     */

    const loyaltyScore =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            customerSatisfaction *
              0.6 +
              Math.min(
                100,
                returningCustomers
              ) *
                0.4
          )
        )
      );

    const premiumCustomers =
      Math.round(
        vipCustomers * 0.4
      );

    const retentionPriority =
      atRiskCustomers > 5
        ? "High"
        : "Normal";

    const vipStatus =
      vipCustomers > 10
        ? "Strong"
        : "Growing";

    /*
     * ============================================================
     * CUSTOMER RETENTION ENGINE
     * ============================================================
     */

    const retentionRecommendations: string[] =
      [];

    if (atRiskCustomers >= 5) {
      retentionRecommendations.push(
        "Launch customer recovery campaign."
      );
    }

    if (vipCustomers >= 10) {
      retentionRecommendations.push(
        "Offer exclusive VIP rewards."
      );
    }

    if (returningCustomers >= 30) {
      retentionRecommendations.push(
        "Introduce loyalty bonus program."
      );
    }

    if (
      customerSatisfaction < 85
    ) {
      retentionRecommendations.push(
        "Improve customer experience."
      );
    }

    if (
      retentionRecommendations.length ===
      0
    ) {
      retentionRecommendations.push(
        "Customer retention performance is healthy."
      );
    }

    /*
     * ============================================================
     * FINAL RESULT
     * ============================================================
     */

    return {
      totalReservations,

      busiestDay,
      peakHour,
      cancellationRate,
      confirmationRate,
      recommendation,

      last7Days,
      currentWeekTotal,
      previousWeekTotal,
      weeklyGrowth,
      trendDirection,
      growthLabel,
      busiestWeekDay,
      weeklyRecommendation,
      trendColor,
      trendIcon,

      forecastNextWeek,
      baselineDailyReservations,
      averageDailyReservations,
      expectedReservations,
      expectedGuests,
      forecastOccupancy,
      recommendedStaff,
      expectedRevenue,
      forecastMessage,

      peakReservationDay,
      weakestReservationDay,

      utilizationRate,
      occupancyRate,

      executiveInsight,

      predictedRevenue,
      predictedReservations,
      occupancyForecast,
      cancellationRisk,
      aiConfidence,

      executivePriority,
      promotionRecommendation,
      staffRecommendation,

      restaurantHealth,
      revenueConfidence,

      executiveDecision,

      actionTimeline,
      workflowProgress,
      managerProductivity,
      completedTasks,
      totalTasks,

      vipCustomers,
      returningCustomers,
      atRiskCustomers,
      customerSatisfaction,

      loyaltyScore,
      premiumCustomers,
      retentionPriority,
      vipStatus,
      retentionRecommendations,
    };
  }, [reservations]);
}