import { useMemo } from "react";

import {
  format,
  subDays,
  addDays
} from "date-fns";

export function useDashboardInsights(reservations: any[]) {

  return useMemo(() => {

    if (!reservations.length) {

      return {

        totalReservations: 0,
        busiestDay: "-",
        peakHour: "-",
        cancellationRate: 0,
        recommendation: "No reservation data available.",

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
        weeklyRecommendation: "No data available.",
        trendColor: "text-white/40",
        trendIcon: "up",

        forecastNextWeek: [],
        averageDailyReservations: 0,
        expectedReservations: 0,
        recommendedStaff: 0,
        expectedRevenue: 0,
        forecastMessage: "No forecast available.",

        peakReservationDay: "-",
        weakestReservationDay: "-",
        utilizationRate: 0,
        confirmationRate: 0,
        occupancyRate: 0,

        executiveInsight: "No reservation data available.",
        predictedRevenue: 0,
        predictedReservations: 0,
        occupancyForecast: 0,
        cancellationRisk: 0,
        aiConfidence: 0,

        executivePriority: "N/A",
        promotionRecommendation: "N/A",
        staffRecommendation: "N/A",
        restaurantHealth: 0,
        revenueConfidence: 0,

        executiveDecision: {
          action: "No recommendation available.",
          confidence: 0,
          impact: "N/A",
        },

        actionTimeline: [],
        workflowProgress: 0,
        managerProductivity: 0,
        completedTasks: 0,
        totalTasks: 0,
      };
    }

    const dayMap: Record<string, number> = {};
    const hourMap: Record<number, number> = {};

    let cancelled = 0;

    reservations.forEach((reservation) => {

      const date = new Date(reservation.date);

      const day = format(date, "EEEE");

      dayMap[day] = (dayMap[day] ?? 0) + 1;

      if (reservation.time) {

        const hour = Number(
          reservation.time.split(":")[0]
        );

        hourMap[hour] =
          (hourMap[hour] ?? 0) + 1;

      }

      if (reservation.status === "cancelled") {

        cancelled++;

      }

    });

    const busiestDay =
      Object.entries(dayMap).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] ?? "-";

    const peakHour =
      Object.entries(hourMap).sort(
        (a, b) => Number(b[1]) - Number(a[1])
      )[0]?.[0] ?? "-";

    const cancellationRate = Math.round(

      (cancelled / reservations.length) * 100

    );

    let recommendation =

      "Reservation flow looks healthy.";

// ==========================================
// WEEKLY TREND
// ==========================================

const last7Days = Array.from({ length: 7 }, (_, index) => {

  const date = subDays(new Date(), 6 - index);

  const label = format(date, "EEE");

  const count = reservations.filter((reservation) => {

    const reservationDate = format(
      new Date(reservation.date),
      "yyyy-MM-dd"
    );

    return (
      reservationDate ===
      format(date, "yyyy-MM-dd")
    );

  }).length;

  return {
    day: label,
    count,
  };

});

const currentWeekTotal =
  last7Days.reduce(
    (sum, day) => sum + day.count,
    0
  );

const previousWeekTotal =
  reservations.filter((reservation) => {

    const reservationDate =
      new Date(reservation.date);

    return (
      reservationDate >= subDays(new Date(), 14) &&
      reservationDate < subDays(new Date(), 7)
    );

  }).length;

const weeklyGrowth =
  previousWeekTotal === 0
    ? 100
    : Math.round(
        ((currentWeekTotal -
          previousWeekTotal) /
          previousWeekTotal) *
          100
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
    (a, b) => b.count - a.count
  )[0];

let weeklyRecommendation =
  "Reservation trend looks healthy.";

if (weeklyGrowth > 25) {

  weeklyRecommendation =
    "Demand is increasing rapidly. Consider adding more staff.";

}
else if (weeklyGrowth < -20) {

  weeklyRecommendation =
    "Reservations have dropped significantly. Launch promotions.";

}
else if (currentWeekTotal < 10) {

  weeklyRecommendation =
    "Reservation volume is low. Increase marketing efforts.";

}

const trendColor =

  weeklyGrowth >= 0

    ? "green"

    : "red";

const trendIcon =

  weeklyGrowth >= 0

    ? "TrendingUp"

    : "TrendingDown";

    if (cancellationRate > 20) {

      recommendation =
        "High cancellation rate detected. Consider confirmation reminders.";

    }

// ==========================================
// AI FORECAST
// ==========================================

const averageDailyReservations =
  currentWeekTotal > 0
    ? currentWeekTotal / 7
    : 0;

const forecastNextWeek = Array.from(
  { length: 7 },
  (_, index) => {

    const growthFactor =
      weeklyGrowth / 100;

    const prediction =
      currentWeekTotal > 0
        ? Math.max(
            1,
            Math.round(
              averageDailyReservations *
                (1 + growthFactor)
            )
          )
        : 0;

    return {
      day: format(
        addDays(new Date(), index + 1),
        "EEE"
      ),

      predicted: prediction,
    };
  }
);

const expectedReservations =
  forecastNextWeek.reduce(
    (sum, day) => sum + day.predicted,
    0
  );

const recommendedStaff = Math.max(
  2,
  Math.ceil(
    expectedReservations / 25
  )
);

const expectedRevenue =
  expectedReservations * 45;

const forecastMessage =
  weeklyGrowth >= 0

    ? "Reservation demand is increasing next week."

    : "Reservation demand may decrease next week.";

// ==========================================
// AI BUSINESS INTELLIGENCE
// ==========================================

const predictedReservations =
  Math.round(

    currentWeekTotal *

    (1 + weeklyGrowth / 100)

  );

const predictedRevenue =
  predictedReservations * 42;

const occupancyForecast =
  Math.min(

    100,

    Math.round(

      predictedReservations / 1.2

    )

  );

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

// ==========================================
// EXECUTIVE ANALYTICS
// ==========================================

const peakReservationDay =
  [...last7Days].sort(
    (a, b) => b.count - a.count
  )[0];

const weakestReservationDay =
  [...last7Days].sort(
    (a, b) => a.count - b.count
  )[0];

const utilizationRate =
  Math.min(
    100,
    Math.round(
      (currentWeekTotal / 140) * 100
    )
  );

const confirmationRate =
  100 - cancellationRate;

const occupancyRate = confirmationRate;

// ==========================================
// KPI GAUGES
// ==========================================

const restaurantHealth = Math.min(
  100,
  Math.round(
    confirmationRate * 0.5 +
    occupancyForecast * 0.3 +
    aiConfidence * 0.2
  )
);

const revenueConfidence = Math.min(
  100,
  Math.round(
    (aiConfidence + occupancyForecast) / 2
  )
);

const executiveInsight =
  utilizationRate > 80
    ? "Restaurant operating near full capacity."
    : utilizationRate > 60
    ? "Healthy reservation demand."
    : "Marketing campaigns recommended to increase bookings.";

// ==========================================
// AI DECISION CENTER
// ==========================================

const executiveDecision = (() => {

  if (occupancyForecast > 90) {

    return {
      priority: "Critical",
      action: "Increase staffing immediately",
      confidence: 96,
      impact: "+18 Reservations",
      color: "red",
      status: "Immediate",
    };

  }

  if (occupancyForecast > 70) {

    return {
      priority: "High",
      action: "Prepare extra inventory",
      confidence: 91,
      impact: "+12 Reservations",
      color: "orange",
      status: "Prepare",
    };

  }

  if (occupancyForecast < 45) {

    return {

      priority: "Marketing",
      action: "Launch promotion campaign",
      confidence: 93,
      impact: "+15 Reservations",
      color: "emerald",
      status: "Campaign",
    };

  }

  return {

    priority: "Stable",
    action: "Maintain current operations",
    confidence: 88,
    impact: "Normal",
    color: "cyan",
    status: "Normal",
  };

})();

// ==========================================
// AI ACTION PLANNER
// ==========================================

const actionTimeline = [

  {
    id: 1,
    time: "09:00",
    title: "Review reservations",
    status: "completed",
  },

  {
    id: 2,
    time: "11:00",
    title: executiveDecision.action,
    status: "active",
  },

  {
    id: 3,
    time: "14:00",
    title: "Inventory verification",
    status: "pending",
  },

  {
    id: 4,
    time: "18:00",
    title: "Peak hour preparation",
    status: "pending",
  },

];

const completedTasks =
  actionTimeline.filter(
    task => task.status === "completed"
  ).length;

const totalTasks =
  actionTimeline.length;

const workflowProgress =
  Math.round(
    (completedTasks / totalTasks) * 100
  );

const managerProductivity =
  Math.min(
    100,
    workflowProgress + aiConfidence / 4
  );

const totalReservations = reservations.length;

// ==========================================
// CUSTOMER INTELLIGENCE
// ==========================================

const vipCustomers=

Math.round(totalReservations*0.10);

const returningCustomers=

Math.round(totalReservations*0.35);

const atRiskCustomers=

Math.round(totalReservations*(cancellationRate/100)*0.60);

const customerSatisfaction=

Math.max(

0,

Math.min(

100,

100-cancellationRate

)

);

// ==========================================
// LOYALTY INSIGHTS
// ==========================================

const loyaltyScore=

Math.round(

(customerSatisfaction*0.6)+

(returningCustomers*0.4)

);

const premiumCustomers=

Math.round(

vipCustomers*0.40

);

const retentionPriority=

atRiskCustomers>5

?"High"

:"Normal";

const vipStatus=

vipCustomers>10

?"Strong"

:"Growing";

// ==========================================
// CUSTOMER RETENTION ENGINE
// ==========================================

const retentionRecommendations:string[]=[];

if(atRiskCustomers>=5){

retentionRecommendations.push(

"Launch customer recovery campaign."

);

}

if(vipCustomers>=10){

retentionRecommendations.push(

"Offer exclusive VIP rewards."

);

}

if(returningCustomers>=30){

retentionRecommendations.push(

"Introduce loyalty bonus program."

);

}

if(customerSatisfaction<85){

retentionRecommendations.push(

"Improve customer experience."

);

}

if(retentionRecommendations.length===0){

retentionRecommendations.push(

"Customer retention performance is healthy."

);

}

    return {
      busiestDay,
      peakHour,
      cancellationRate,
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
      averageDailyReservations,
      expectedReservations,
      recommendedStaff,
      expectedRevenue,
      forecastMessage,
      peakReservationDay,
      weakestReservationDay,
      utilizationRate,
      confirmationRate,
      occupancyRate,
      executiveInsight,
      predictedRevenue,
      predictedReservations,
      totalReservations,
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