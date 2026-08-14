import { useMemo } from "react";
import {
  addDays,
  differenceInCalendarDays,
  format,
  startOfDay,
  subDays,
} from "date-fns";

/**
 * ============================================================
 * CENTRAL RESTAURANT ANALYTICS ENGINE
 * ============================================================
 *
 * Single source of truth for:
 *
 * - Reservations
 * - Weekly growth
 * - Reservation forecast
 * - Guest forecast
 * - Revenue forecast
 * - Occupancy
 * - Staffing
 * - Health score
 * - AI confidence
 * - Executive priority
 * - Risk level
 *
 * All higher-level AI/dashboard layers should consume these
 * values instead of calculating their own versions.
 * ============================================================
 */

export interface RestaurantReservation {
  id?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  date?: string;
  time?: string;
  guests?: number;
  status?: string;
  createdAt?: unknown;
}

export interface ForecastDay {
  date: string;
  day: string;
  predictedReservations: number;
  predictedGuests: number;
  predictedRevenue: number;
  occupancyRate: number;
  recommendedStaff: number;
}

export interface ExecutiveDecision {
  priority: "Critical" | "High" | "Marketing" | "Stable";
  action: string;
  confidence: number;
  impact: string;
  status: "Immediate" | "Prepare" | "Campaign" | "Normal";
  color: "red" | "orange" | "emerald" | "cyan";
}

export interface RestaurantAnalytics {
  totalReservations: number;

  currentWeekTotal: number;
  previousWeekTotal: number;

  weeklyGrowth: number;
  growthLabel:
    | "No data"
    | "Stable"
    | "Growing"
    | "Excellent"
    | "Declining"
    | "Critical";

  trendDirection: "up" | "down" | "stable";

  busiestDay: string;
  busiestDayReservations: number;
  peakHour: string;

  cancellationRate: number;
  confirmationRate: number;

  currentWeekGuests: number;
  averageGuestsPerReservation: number;

  occupancyRate: number;
  utilizationRate: number;

  expectedReservations: number;
  expectedGuests: number;
  expectedRevenue: number;

  forecastNextWeek: ForecastDay[];
  forecastOccupancy: number;

  recommendedStaff: number;

  restaurantHealth: number;

  businessScore: number;
  customerHealth: number;
  operationalEfficiency: number;
  revenueStability: number;

  aiConfidence: number;
  revenueConfidence: number;

  cancellationRisk: "Low" | "Medium" | "High" | "Insufficient data";

  executivePriority:
    | "Critical"
    | "High"
    | "Marketing"
    | "Stable";

  executiveInsight: string;

  executiveDecision: ExecutiveDecision;

  forecastMessage: string;

  dataQuality: "Insufficient" | "Limited" | "Moderate" | "Strong";
  dataPoints: number;
}

/**
 * ============================================================
 * BUSINESS CONSTANTS
 * ============================================================
 *
 * These values are intentionally centralized.
 *
 * If the restaurant changes its pricing/capacity later, only
 * this section needs to be updated.
 * ============================================================
 */

const RESTAURANT_SEAT_CAPACITY = 60;

const AVERAGE_RESERVATION_VALUE = 45;

const DEFAULT_GUESTS_PER_RESERVATION = 2;

const GUESTS_PER_STAFF_MEMBER = 25;

const FORECAST_DAYS = 7;

/**
 * ============================================================
 * SAFE NUMBER HELPERS
 * ============================================================
 */

function safeNumber(value: unknown, fallback = 0): number {
  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
}

function clamp(
  value: number,
  minimum: number,
  maximum: number
): number {
  return Math.min(
    maximum,
    Math.max(minimum, value)
  );
}

/**
 * ============================================================
 * DATE HELPERS
 * ============================================================
 */

function getReservationDate(
  reservation: RestaurantReservation
): Date | null {
  if (!reservation.date) {
    return null;
  }

  const date = new Date(reservation.date);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function isWithinDateRange(
  reservation: RestaurantReservation,
  start: Date,
  end: Date
): boolean {
  const date = getReservationDate(reservation);

  if (!date) {
    return false;
  }

  const reservationDay = startOfDay(date);

  return (
    reservationDay >= start &&
    reservationDay <= end
  );
}

/**
 * ============================================================
 * MAIN HOOK
 * ============================================================
 */

export function useRestaurantAnalytics(
  reservations: RestaurantReservation[]
): RestaurantAnalytics {
  return useMemo(() => {
    const safeReservations = Array.isArray(
      reservations
    )
      ? reservations
      : [];

    const totalReservations =
      safeReservations.length;

    /**
     * --------------------------------------------------------
     * EMPTY DATA STATE
     * --------------------------------------------------------
     */

    if (totalReservations === 0) {
      const emptyForecast: ForecastDay[] =
        Array.from(
          { length: FORECAST_DAYS },
          (_, index) => {
            const date = addDays(
              startOfDay(new Date()),
              index + 1
            );

            return {
              date: format(
                date,
                "yyyy-MM-dd"
              ),
              day: format(date, "EEE"),
              predictedReservations: 0,
              predictedGuests: 0,
              predictedRevenue: 0,
              occupancyRate: 0,
              recommendedStaff: 0,
            };
          }
        );

      return {
        totalReservations: 0,

        currentWeekTotal: 0,
        previousWeekTotal: 0,

        weeklyGrowth: 0,
        growthLabel: "No data",

        trendDirection: "stable",

        busiestDay: "-",
        busiestDayReservations: 0,
        peakHour: "-",

        cancellationRate: 0,
        confirmationRate: 0,

        currentWeekGuests: 0,
        averageGuestsPerReservation:
          DEFAULT_GUESTS_PER_RESERVATION,

        occupancyRate: 0,
        utilizationRate: 0,

        expectedReservations: 0,
        expectedGuests: 0,
        expectedRevenue: 0,

        forecastNextWeek: emptyForecast,
        forecastOccupancy: 0,

        recommendedStaff: 0,

        restaurantHealth: 0,

        businessScore: 0,
        customerHealth: 0,
        operationalEfficiency: 0,
        revenueStability: 0,

        aiConfidence: 0,
        revenueConfidence: 0,

        cancellationRisk: "Insufficient data",

        executivePriority: "Stable",

        executiveInsight:
          "No reservation data is available yet.",

        executiveDecision: {
          priority: "Stable",
          action:
            "Collect reservation data before making operational decisions.",
          confidence: 0,
          impact: "No reliable estimate",
          status: "Normal",
          color: "cyan",
        },

        forecastMessage:
          "No forecast available until reservation data is collected.",

        dataQuality: "Insufficient",
        dataPoints: 0,
      };
    }

    /**
     * --------------------------------------------------------
     * DATE WINDOWS
     * --------------------------------------------------------
     */

    const today = startOfDay(
      new Date()
    );

    const currentWeekStart =
      subDays(today, 6);

    const previousWeekStart =
      subDays(today, 13);

    const previousWeekEnd =
      subDays(today, 7);

    /**
     * --------------------------------------------------------
     * CURRENT / PREVIOUS WEEK
     * --------------------------------------------------------
     */

    const currentWeekReservations =
      safeReservations.filter(
        (reservation) =>
          isWithinDateRange(
            reservation,
            currentWeekStart,
            today
          )
      );

    const previousWeekReservations =
      safeReservations.filter(
        (reservation) =>
          isWithinDateRange(
            reservation,
            previousWeekStart,
            previousWeekEnd
          )
      );

    const currentWeekTotal =
      currentWeekReservations.length;

    const previousWeekTotal =
      previousWeekReservations.length;

    /**
     * --------------------------------------------------------
     * WEEKLY GROWTH
     * --------------------------------------------------------
     *
     * Important:
     *
     * If previous week has zero reservations, we DO NOT claim
     * +100% growth. That would be statistically misleading.
     * --------------------------------------------------------
     */

    const weeklyGrowth =
      previousWeekTotal > 0
        ? Math.round(
            (
              (currentWeekTotal -
                previousWeekTotal) /
              previousWeekTotal
            ) * 100
          )
        : 0;

    const trendDirection =
      weeklyGrowth > 0
        ? "up"
        : weeklyGrowth < 0
          ? "down"
          : "stable";

    const growthLabel =
      totalReservations < 3
        ? "No data"
        : weeklyGrowth >= 20
          ? "Excellent"
          : weeklyGrowth >= 5
            ? "Growing"
            : weeklyGrowth >= 0
              ? "Stable"
              : weeklyGrowth >= -10
                ? "Declining"
                : "Critical";

    /**
     * --------------------------------------------------------
     * DAY / HOUR ANALYSIS
     * --------------------------------------------------------
     */

    const dayMap: Record<
      string,
      number
    > = {};

    const hourMap: Record<
      number,
      number
    > = {};

    safeReservations.forEach(
      (reservation) => {
        const date =
          getReservationDate(
            reservation
          );

        if (!date) {
          return;
        }

        const day =
          format(date, "EEEE");

        dayMap[day] =
          (dayMap[day] ?? 0) + 1;

        if (reservation.time) {
          const hour =
            Number(
              reservation.time.split(
                ":"
              )[0]
            );

          if (
            Number.isFinite(hour)
          ) {
            hourMap[hour] =
              (hourMap[hour] ?? 0) +
              1;
          }
        }
      }
    );

    const busiestDayEntry =
      Object.entries(dayMap).sort(
        (a, b) => b[1] - a[1]
      )[0];

    const busiestDay =
      busiestDayEntry?.[0] ?? "-";

    const busiestDayReservations =
      busiestDayEntry?.[1] ?? 0;

    const peakHourEntry =
      Object.entries(hourMap).sort(
        (a, b) =>
          Number(b[1]) -
          Number(a[1])
      )[0];

    const peakHour =
      peakHourEntry
        ? `${String(
            Number(peakHourEntry[0])
          ).padStart(2, "0")}:00`
        : "-";

    /**
     * --------------------------------------------------------
     * STATUS ANALYSIS
     * --------------------------------------------------------
     */

    const cancelledReservations =
      safeReservations.filter(
        (reservation) =>
          reservation.status ===
          "cancelled"
      ).length;

    const confirmedReservations =
      safeReservations.filter(
        (reservation) =>
          reservation.status ===
          "confirmed"
      ).length;

    const cancellationRate =
      totalReservations > 0
        ? Math.round(
            (
              cancelledReservations /
              totalReservations
            ) * 100
          )
        : 0;

    const confirmationRate =
      totalReservations > 0
        ? Math.round(
            (
              confirmedReservations /
              totalReservations
            ) * 100
          )
        : 0;

    /**
     * --------------------------------------------------------
     * CURRENT WEEK GUESTS
     * --------------------------------------------------------
     */

    const currentWeekGuests =
      currentWeekReservations
        .filter(
          (reservation) =>
            reservation.status !==
            "cancelled"
        )
        .reduce(
          (sum, reservation) =>
            sum +
            safeNumber(
              reservation.guests,
              0
            ),
          0
        );

    const averageGuestsPerReservation =
      currentWeekTotal > 0 &&
      currentWeekGuests > 0
        ? Math.max(
            1,
            currentWeekGuests /
              currentWeekTotal
          )
        : DEFAULT_GUESTS_PER_RESERVATION;

    /**
     * --------------------------------------------------------
     * CURRENT OCCUPANCY
     * --------------------------------------------------------
     *
     * Occupancy is based on guests, not reservation count.
     *
     * Seven-day capacity =
     *
     * 60 seats × 7 days
     * --------------------------------------------------------
     */

    const occupancyRate =
      currentWeekGuests > 0
        ? clamp(
            Math.round(
              (
                currentWeekGuests /
                (
                  RESTAURANT_SEAT_CAPACITY *
                  7
                )
              ) * 100
            ),
            0,
            100
          )
        : 0;

    /**
     * Reservation utilization is kept separate from physical
     * seat occupancy.
     */

    const utilizationRate =
      currentWeekTotal > 0
        ? clamp(
            Math.round(
              (
                currentWeekTotal /
                7
              ) * 100
            ),
            0,
            100
          )
        : 0;

    /**
     * --------------------------------------------------------
     * FORECAST BASELINE
     * --------------------------------------------------------
     */

    const baselineDailyReservations =
      currentWeekTotal > 0
        ? currentWeekTotal / 7
        : 0;

    const forecastGrowth =
      previousWeekTotal > 0
        ? clamp(
            weeklyGrowth / 100,
            -0.2,
            0.2
          )
        : 0;

    /**
     * --------------------------------------------------------
     * FORECAST NEXT 7 DAYS
     * --------------------------------------------------------
     */

    const forecastNextWeek: ForecastDay[] =
      Array.from(
        {
          length:
            FORECAST_DAYS,
        },
        (_, index) => {
          const forecastDate =
            addDays(
              today,
              index + 1
            );

          const predictedReservations =
            baselineDailyReservations >
            0
              ? Math.max(
                  0,
                  Math.round(
                    baselineDailyReservations *
                      (
                        1 +
                        forecastGrowth
                      )
                  )
                )
              : 0;

          const predictedGuests =
            Math.round(
              predictedReservations *
                averageGuestsPerReservation
            );

          const predictedRevenue =
            Math.round(
              predictedReservations *
                AVERAGE_RESERVATION_VALUE
            );

          const occupancy =
            clamp(
              Math.round(
                (
                  predictedGuests /
                  (
                    RESTAURANT_SEAT_CAPACITY
                  )
                ) * 100
              ),
              0,
              100
            );

          const recommendedStaff =
            predictedGuests > 0
              ? Math.max(
                  2,
                  Math.ceil(
                    predictedGuests /
                      GUESTS_PER_STAFF_MEMBER
                  )
                )
              : 0;

          return {
            date: format(
              forecastDate,
              "yyyy-MM-dd"
            ),
            day: format(
              forecastDate,
              "EEE"
            ),
            predictedReservations,
            predictedGuests,
            predictedRevenue,
            occupancyRate:
              occupancy,
            recommendedStaff,
          };
        }
      );

    /**
     * --------------------------------------------------------
     * CENTRAL FORECAST TOTALS
     * --------------------------------------------------------
     */

    const expectedReservations =
      forecastNextWeek.reduce(
        (sum, day) =>
          sum +
          day.predictedReservations,
        0
      );

    const expectedGuests =
      forecastNextWeek.reduce(
        (sum, day) =>
          sum +
          day.predictedGuests,
        0
      );

    const expectedRevenue =
      forecastNextWeek.reduce(
        (sum, day) =>
          sum +
          day.predictedRevenue,
        0
      );

    const forecastOccupancy =
      expectedGuests > 0
        ? clamp(
            Math.round(
              (
                expectedGuests /
                (
                  RESTAURANT_SEAT_CAPACITY *
                  7
                )
              ) * 100
            ),
            0,
            100
          )
        : 0;

    const recommendedStaff =
      expectedGuests > 0
        ? Math.max(
            2,
            Math.ceil(
              expectedGuests /
                GUESTS_PER_STAFF_MEMBER
            )
          )
        : 0;

    /**
     * --------------------------------------------------------
     * DATA QUALITY
     * --------------------------------------------------------
     *
     * This replaces artificial 90% confidence.
     * --------------------------------------------------------
     */

    const dataPoints =
      totalReservations;

    const dataQuality =
      dataPoints < 3
        ? "Insufficient"
        : dataPoints < 10
          ? "Limited"
          : dataPoints < 30
            ? "Moderate"
            : "Strong";

    const aiConfidence =
      dataPoints < 3
        ? 25
        : dataPoints < 10
          ? 45
          : dataPoints < 30
            ? 65
            : dataPoints < 60
              ? 80
              : 90;

    const revenueConfidence =
      dataPoints < 3
        ? 20
        : dataPoints < 10
          ? 40
          : dataPoints < 30
            ? 60
            : dataPoints < 60
              ? 75
              : 88;

    /**
     * --------------------------------------------------------
     * CANCELLATION RISK
     * --------------------------------------------------------
     */

    const cancellationRisk =
      dataPoints < 3
        ? "Insufficient data"
        : cancellationRate > 25
          ? "High"
          : cancellationRate > 12
            ? "Medium"
            : "Low";

    /**
     * --------------------------------------------------------
     * EXECUTIVE PRIORITY
     * --------------------------------------------------------
     */

    const executivePriority =
      dataPoints < 3
        ? "Stable"
        : forecastOccupancy < 30
          ? "Critical"
          : forecastOccupancy < 50
            ? "Marketing"
            : forecastOccupancy > 85
              ? "High"
              : "Stable";

    /**
     * --------------------------------------------------------
     * EXECUTIVE DECISION
     * --------------------------------------------------------
     */

    let executiveDecision: ExecutiveDecision;

    if (dataPoints < 3) {
      executiveDecision = {
        priority: "Stable",
        action:
          "Collect more reservation data before making aggressive operational decisions.",
        confidence: aiConfidence,
        impact:
          "More data required",
        status: "Normal",
        color: "cyan",
      };
    } else if (
      forecastOccupancy < 30
    ) {
      executiveDecision = {
        priority: "Critical",
        action:
          "Increase table utilization with targeted marketing.",
        confidence:
          aiConfidence,
        impact:
          "Potential occupancy improvement",
        status: "Immediate",
        color: "red",
      };
    } else if (
      forecastOccupancy < 50
    ) {
      executiveDecision = {
        priority: "Marketing",
        action:
          "Launch targeted weekday promotion campaign.",
        confidence:
          aiConfidence,
        impact:
          "Potential reservation growth",
        status: "Campaign",
        color: "emerald",
      };
    } else if (
      forecastOccupancy > 85
    ) {
      executiveDecision = {
        priority: "High",
        action:
          "Prepare additional staffing and inventory.",
        confidence:
          aiConfidence,
        impact:
          "Protect service capacity",
        status: "Prepare",
        color: "orange",
      };
    } else {
      executiveDecision = {
        priority: "Stable",
        action:
          "Maintain current restaurant operations.",
        confidence:
          aiConfidence,
        impact:
          "Stable operations",
        status: "Normal",
        color: "cyan",
      };
    }

    /**
     * --------------------------------------------------------
     * EXECUTIVE INSIGHT
     * --------------------------------------------------------
     */

    let executiveInsight =
      "Reservation demand is currently stable.";

    if (dataPoints < 3) {
      executiveInsight =
        "Reservation history is limited. Current AI recommendations should be treated as preliminary until more data is collected.";
    } else if (
      occupancyRate < 30
    ) {
      executiveInsight =
        "Current table utilization is low. Increasing qualified reservation demand should be the primary operational focus.";
    } else if (
      cancellationRate > 20
    ) {
      executiveInsight =
        "Cancellation activity is elevated. Confirmation and reminder workflows should be prioritized.";
    } else if (
      forecastOccupancy > 85
    ) {
      executiveInsight =
        "Projected occupancy is high. Management should prepare staffing and inventory before peak periods.";
    } else if (
      weeklyGrowth > 10
    ) {
      executiveInsight =
        "Reservation demand is showing positive momentum. Monitor capacity to avoid service pressure.";
    }

    /**
     * --------------------------------------------------------
     * FORECAST MESSAGE
     * --------------------------------------------------------
     */

    const forecastMessage =
      dataPoints < 3
        ? "Forecast based on limited reservation data."
        : previousWeekTotal === 0
          ? "Forecast based on the current reservation baseline."
          : weeklyGrowth > 0
            ? "Reservation demand is trending upward."
            : weeklyGrowth < 0
              ? "Reservation demand is trending downward."
              : "Reservation demand is stable.";

    /**
     * --------------------------------------------------------
     * HEALTH SCORE
     * --------------------------------------------------------
     *
     * Health is intentionally conservative when data is scarce.
     * --------------------------------------------------------
     */

    const baseHealth =
      (
        confirmationRate * 0.35
      ) +
      (
        forecastOccupancy * 0.35
      ) +
      (
        clamp(
          weeklyGrowth + 50,
          0,
          100
        ) * 0.15
      ) +
      (
        aiConfidence * 0.15
      );

    const restaurantHealth =
      dataPoints < 3
        ? Math.min(
            50,
            Math.round(
              baseHealth
            )
          )
        : clamp(
            Math.round(
              baseHealth
            ),
            0,
            100
          );

    /**
     * --------------------------------------------------------
     * CENTRAL EXECUTIVE KPI SCORES
     * --------------------------------------------------------
     *
     * These scores are calculated centrally so every dashboard
     * component receives the same analytical values.
     * --------------------------------------------------------
     */

    const businessScore =
      clamp(
        Math.round(
          (
            restaurantHealth +
            revenueConfidence +
            forecastOccupancy
          ) / 3
        ),
        0,
        100
      );

    const customerHealth =
      clamp(
        Math.round(
          (
            confirmationRate +
            (100 - cancellationRate)
          ) / 2
        ),
        0,
        100
      );

    const operationalEfficiency =
      clamp(
        Math.round(
          (
            occupancyRate +
            confirmationRate +
            (recommendedStaff > 0 ? 100 : 0)
          ) / 3
        ),
        0,
        100
      );

    const revenueStability =
      clamp(
        Math.round(
          (
            revenueConfidence +
            Math.max(
              0,
              100 - Math.abs(weeklyGrowth)
            )
          ) / 2
        ),
        0,
        100
      );

    return {
      totalReservations,

      currentWeekTotal,
      previousWeekTotal,

      weeklyGrowth,
      growthLabel,

      trendDirection,

      busiestDay,
      busiestDayReservations,
      peakHour,

      cancellationRate,
      confirmationRate,

      currentWeekGuests,
      averageGuestsPerReservation,

      occupancyRate,
      utilizationRate,

      expectedReservations,
      expectedGuests,
      expectedRevenue,

      forecastNextWeek,
      forecastOccupancy,

      recommendedStaff,

      restaurantHealth,

      businessScore,
      customerHealth,
      operationalEfficiency,
      revenueStability,

      aiConfidence,
      revenueConfidence,

      cancellationRisk,

      executivePriority,

      executiveInsight,

      executiveDecision,

      forecastMessage,

      dataQuality,
      dataPoints,
    };
  }, [reservations]);
}