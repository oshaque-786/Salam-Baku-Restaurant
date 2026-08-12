import { useMemo } from "react";

const AVERAGE_RESERVATION_VALUE = 45;
const RESTAURANT_SEAT_CAPACITY = 60;

interface ExecutiveInput {
  totalReservations: number;
  expectedRevenue: number;
  expectedGuests: number;
  forecastOccupancy: number;
  weeklyGrowth: number;
  occupancyRate: number;
  cancellationRate: number;
  confirmationRate: number;
}

export function useExecutiveAIBrain(data: ExecutiveInput) {
  return useMemo(() => {
    // ==========================================
    // NORMALIZE INPUTS
    // ==========================================

    const totalReservations = Math.max(
      0,
      Number(data.totalReservations) || 0
    );

    const expectedRevenue = Math.max(
      0,
      Number(data.expectedRevenue) || 0
    );

    const expectedGuests = Math.max(
      0,
      Number(data.expectedGuests) || 0
    );

    const forecastOccupancy = Math.max(
      0,
      Math.min(
        100,
        Number(data.forecastOccupancy) || 0
      )
    );

    const weeklyGrowth =
      Number(data.weeklyGrowth) || 0;

    const occupancyRate = Math.max(
      0,
      Math.min(
        100,
        Number(data.occupancyRate) || 0
      )
    );

    const cancellationRate = Math.max(
      0,
      Math.min(
        100,
        Number(data.cancellationRate) || 0
      )
    );

    const confirmationRate = Math.max(
      0,
      Math.min(
        100,
        Number(data.confirmationRate) || 0
      )
    );

    // ==========================================
    // CORE EXECUTIVE SCORES
    // ==========================================

    let healthScore = 100;

    const insights: string[] = [];
    const risks: string[] = [];
    const opportunities: string[] = [];

    const executiveActions: string[] = [];
    const executiveWarnings: string[] = [];

    const revenueStrategy: string[] = [];
    const marketingStrategy: string[] = [];
    const staffingStrategy: string[] = [];
    const customerStrategy: string[] = [];
    const growthStrategy: string[] = [];

    // ==========================================
    // HEALTH SCORE
    // ==========================================

    if (occupancyRate < 45) {
      healthScore -= 25;
    } else if (occupancyRate < 60) {
      healthScore -= 15;
    } else if (occupancyRate >= 85) {
      healthScore += 5;
    }

    if (weeklyGrowth < -20) {
      healthScore -= 20;
    } else if (weeklyGrowth < 0) {
      healthScore -= 10;
    } else if (weeklyGrowth > 15) {
      healthScore += 5;
    }

    if (cancellationRate > 25) {
      healthScore -= 20;
    } else if (cancellationRate > 15) {
      healthScore -= 10;
    }

    if (confirmationRate >= 90) {
      healthScore += 5;
    } else if (confirmationRate < 80) {
      healthScore -= 10;
    }

    healthScore = Math.max(
      0,
      Math.min(100, healthScore)
    );

    // ==========================================
    // BUSINESS INSIGHTS
    // ==========================================

    if (weeklyGrowth < 0) {
      risks.push(
        "Weekly reservation demand is declining."
      );

      executiveWarnings.push(
        "Negative reservation growth detected."
      );

      executiveActions.push(
        "Launch a reservation recovery campaign."
      );

      growthStrategy.push(
        "Recover lost reservations."
      );

      growthStrategy.push(
        "Increase local marketing activity."
      );
    } else if (weeklyGrowth > 10) {
      opportunities.push(
        "Reservation demand is growing strongly."
      );

      executiveActions.push(
        "Prepare operations for higher demand."
      );

      growthStrategy.push(
        "Protect current growth momentum."
      );
    } else {
      insights.push(
        "Reservation demand is relatively stable."
      );
    }

    // ==========================================
    // OCCUPANCY INTELLIGENCE
    // ==========================================

    if (occupancyRate < 45) {
      risks.push(
        "Restaurant occupancy is critically low."
      );

      marketingStrategy.push(
        "Launch targeted weekday promotions."
      );

      marketingStrategy.push(
        "Increase local social media advertising."
      );

      executiveActions.push(
        "Increase table utilization."
      );
    } else if (occupancyRate < 60) {
      risks.push(
        "Restaurant occupancy is below the preferred level."
      );

      marketingStrategy.push(
        "Run weekday promotional campaigns."
      );

      marketingStrategy.push(
        "Promote slower dining periods."
      );
    } else if (occupancyRate >= 85) {
      opportunities.push(
        "Restaurant occupancy is near capacity."
      );

      staffingStrategy.push(
        "Prepare additional service capacity."
      );

      staffingStrategy.push(
        "Increase kitchen readiness."
      );
    } else {
      insights.push(
        "Restaurant occupancy is within a healthy operating range."
      );
    }

    // ==========================================
    // CANCELLATION / CUSTOMER INTELLIGENCE
    // ==========================================

    if (cancellationRate > 25) {
      risks.push(
        "Cancellation rate is critically high."
      );

      customerStrategy.push(
        "Send reservation confirmation reminders."
      );

      customerStrategy.push(
        "Contact cancelled customers with recovery offers."
      );

      executiveWarnings.push(
        "High cancellation rate requires immediate attention."
      );
    } else if (cancellationRate > 15) {
      risks.push(
        "Cancellation rate requires monitoring."
      );

      customerStrategy.push(
        "Improve reservation reminder communication."
      );
    } else {
      opportunities.push(
        "Reservation cancellation performance is healthy."
      );
    }

    if (confirmationRate >= 90) {
      insights.push(
        "Customer confirmation rate is excellent."
      );
    } else if (confirmationRate < 80) {
      customerStrategy.push(
        "Automate confirmation and reminder messages."
      );

      customerStrategy.push(
        "Introduce loyalty incentives for confirmed bookings."
      );
    }

    // ==========================================
    // REVENUE INTELLIGENCE
    // ==========================================

    if (expectedRevenue >= 8000) {
      opportunities.push(
        "Projected revenue is above the target benchmark."
      );

      revenueStrategy.push(
        "Maintain premium pricing."
      );

      revenueStrategy.push(
        "Promote high-margin dishes."
      );
    } else if (expectedRevenue >= 5000) {
      insights.push(
        "Projected revenue is healthy with additional growth potential."
      );

      revenueStrategy.push(
        "Promote high-margin menu items."
      );
    } else if (expectedRevenue > 0) {
      risks.push(
        "Projected revenue is below the preferred target."
      );

      revenueStrategy.push(
        "Increase average order value."
      );

      revenueStrategy.push(
        "Promote profitable menu combinations."
      );
    }

    // ==========================================
    // CUSTOMER INTELLIGENCE
    // ==========================================

    const vipCustomers = Math.round(
      totalReservations * 0.1
    );

    const returningCustomers = Math.round(
      totalReservations * 0.35
    );

    const atRiskCustomers = Math.round(
      totalReservations *
        (cancellationRate / 100) *
        0.6
    );

    const customerSatisfaction = Math.max(
      0,
      Math.min(
        100,
        100 - cancellationRate
      )
    );

    const loyaltyScore = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          customerSatisfaction * 0.6 +
          Math.min(returningCustomers, 100) * 0.4
        )
      )
    );

    const premiumCustomers = Math.round(
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

    const retentionRecommendations: string[] = [];

    if (atRiskCustomers >= 5) {
      retentionRecommendations.push(
        "Launch a customer recovery campaign."
      );
    }

    if (vipCustomers >= 10) {
      retentionRecommendations.push(
        "Offer exclusive VIP rewards."
      );
    }

    if (returningCustomers >= 30) {
      retentionRecommendations.push(
        "Introduce a loyalty bonus program."
      );
    }

    if (customerSatisfaction < 85) {
      retentionRecommendations.push(
        "Improve customer experience."
      );
    }

    if (
      retentionRecommendations.length === 0
    ) {
      retentionRecommendations.push(
        "Customer retention performance is healthy."
      );
    }

    // ==========================================
    // FORECASTING
    // ==========================================

    const nextWeekReservations =
      Math.max(
        0,
        Math.round(
          totalReservations *
            (1 + weeklyGrowth / 100)
        )
      );

    const nextMonthReservations =
      Math.max(
        0,
        nextWeekReservations * 4
      );

    const nextWeekRevenue = Math.round(
      nextWeekReservations *
        AVERAGE_RESERVATION_VALUE
    );

    const nextMonthRevenue = Math.round(
      nextMonthReservations *
        AVERAGE_RESERVATION_VALUE
    );

    const predictedReservations =
      nextWeekReservations;

    const predictedRevenue =
      Math.round(
        predictedReservations *
          AVERAGE_RESERVATION_VALUE
      );

    // ==========================================
    // OCCUPANCY FORECAST
    // ==========================================

    const predictedOccupancy = Math.max(
      0,
      Math.min(
        100,
        Math.round(forecastOccupancy)
      )
    );

    let occupancyTrend = "Low";
    let occupancyRecommendation =
      "Increase marketing activity.";

    if (predictedOccupancy >= 90) {
      occupancyTrend = "Very High";

      occupancyRecommendation =
        "Increase staffing and inventory.";
    } else if (predictedOccupancy >= 75) {
      occupancyTrend = "Healthy";

      occupancyRecommendation =
        "Maintain current operations.";
    } else if (predictedOccupancy >= 60) {
      occupancyTrend = "Moderate";

      occupancyRecommendation =
        "Launch targeted marketing campaigns.";
    }

    const occupancyConfidence =
      totalReservations >= 30
        ? 90
        : totalReservations >= 15
        ? 80
        : totalReservations >= 5
        ? 70
        : 55;

    // ==========================================
    // RESERVATION TREND
    // ==========================================

    let reservationTrend = "Stable";
    let reservationConfidence = 92;
    let reservationRisk = "Low";

    if (weeklyGrowth > 10) {
      reservationTrend = "Growing";
      reservationConfidence = 98;
    } else if (weeklyGrowth < 0) {
      reservationTrend = "Declining";
      reservationConfidence = 80;
      reservationRisk = "High";
    }

    if (predictedOccupancy < 60) {
      reservationRisk =
        predictedOccupancy < 45
          ? "Critical"
          : "Medium";

      reservationConfidence -= 10;
    }

    reservationConfidence = Math.max(
      0,
      Math.min(
        100,
        reservationConfidence
      )
    );

    const tomorrowReservations =
      Math.max(
        0,
        Math.round(
          nextWeekReservations / 7
        )
      );

    // ==========================================
    // STAFFING INTELLIGENCE
    // ==========================================

    const kitchenStaffRequired =
      Math.max(
        2,
        Math.ceil(
          predictedOccupancy / 20
        )
      );

    const serviceStaffRequired =
      Math.max(
        2,
        Math.ceil(
          predictedOccupancy / 18
        )
      );

    const frontDeskStaffRequired =
      Math.max(
        1,
        Math.ceil(
          predictedOccupancy / 40
        )
      );

    const deliveryStaffRequired =
      Math.max(
        1,
        Math.ceil(
          predictedOccupancy / 25
        )
      );

    let staffingStatus = "Balanced";
    let staffingRecommendation =
      "Current staffing is sufficient.";

    if (predictedOccupancy >= 90) {
      staffingStatus = "High Demand";

      staffingRecommendation =
        "Increase shifts immediately.";
    } else if (predictedOccupancy < 60) {
      staffingStatus = "Low Demand";

      staffingRecommendation =
        "Reduce unnecessary extra shifts.";
    }

    if (totalReservations > 100) {
      staffingStrategy.push(
        "Prepare additional evening staff."
      );

      staffingStrategy.push(
        "Prepare extra kitchen capacity."
      );
    }

    // ==========================================
    // SEASONAL INTELLIGENCE
    // ==========================================

    const month =
      new Date().getMonth() + 1;

    let currentSeason = "Summer";
    let seasonalGrowth = 0;

    if (
      month >= 3 &&
      month <= 5
    ) {
      currentSeason = "Spring";
      seasonalGrowth = 8;
    } else if (
      month >= 6 &&
      month <= 8
    ) {
      currentSeason = "Summer";
      seasonalGrowth = 15;
    } else if (
      month >= 9 &&
      month <= 11
    ) {
      currentSeason = "Autumn";
      seasonalGrowth = 5;
    } else {
      currentSeason = "Winter";
      seasonalGrowth = -5;
    }

    const seasonalRevenue =
      Math.round(
        expectedRevenue *
          (1 + seasonalGrowth / 100)
      );

    const seasonalOccupancy =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            occupancyRate +
              seasonalGrowth
          )
        )
      );

    const seasonalReservations =
      Math.round(
        nextWeekReservations *
          (1 + seasonalGrowth / 100)
      );

    let seasonalRecommendation =
      "Maintain current operations.";

    if (seasonalGrowth > 10) {
      seasonalRecommendation =
        "Prepare for high seasonal demand.";
    } else if (seasonalGrowth < 0) {
      seasonalRecommendation =
        "Launch seasonal promotions.";
    }

    // ==========================================
    // EVENT / HOLIDAY INTELLIGENCE
    // ==========================================

    const day =
      new Date().getDay();

    const isWeekend =
      day === 5 ||
      day === 6;

    const eventName =
      isWeekend
        ? "Weekend"
        : "Weekday";

    const businessBoost =
      isWeekend ? 20 : 0;

    const holidayRevenue =
      Math.round(
        seasonalRevenue *
          (1 + businessBoost / 100)
      );

    const demandLevel =
      businessBoost >= 20
        ? "High"
        : "Normal";

    const holidayRecommendation =
      businessBoost >= 20
        ? "Increase inventory and staffing."
        : "Standard operations are sufficient.";

    // ==========================================
    // DEMAND FORECAST
    // ==========================================

    const demandForecast =
      Math.round(
        (
          predictedOccupancy +
          seasonalOccupancy
        ) / 2
      );

    let demandLevelAI = "Low";
    let demandRecommendation =
      "Run promotional campaigns.";

    let demandConfidence = 95;

    if (demandForecast >= 90) {
      demandLevelAI = "Extreme";

      demandRecommendation =
        "Maximum preparation required.";
    } else if (demandForecast >= 75) {
      demandLevelAI = "High";

      demandRecommendation =
        "Increase staff and inventory.";
    } else if (demandForecast >= 60) {
      demandLevelAI = "Moderate";

      demandRecommendation =
        "Normal operations.";
    } else {
      demandConfidence -= 10;
    }

    demandConfidence = Math.max(
      0,
      Math.min(
        100,
        demandConfidence
      )
    );

    const expectedProfit =
      Math.round(
        holidayRevenue * 0.35
      );

    // ==========================================
    // REVENUE / CONFIDENCE
    // ==========================================

    const revenueConfidence =
      totalReservations >= 10
        ? Math.round(
            (
              occupancyConfidence +
              reservationConfidence
            ) / 2
          )
        : 55;

    let revenueTrend = "Stable";

    if (weeklyGrowth > 10) {
      revenueTrend = "Growing";
    } else if (weeklyGrowth < 0) {
      revenueTrend = "Declining";
    }

    // ==========================================
    // KPI SCORES
    // ==========================================

    const profitabilityScore =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            (
              revenueConfidence +
              predictedOccupancy +
              confirmationRate
            ) / 3
          )
        )
      );

    const businessScore =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            (
              healthScore +
              revenueConfidence +
              predictedOccupancy
            ) / 3
          )
        )
      );

    const customerHealth =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            (
              customerSatisfaction +
              confirmationRate
            ) / 2
          )
        )
      );

    const operationalEfficiency =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            (
              occupancyRate +
              staffingStatus === "Balanced"
                ? occupancyRate + 100
                : occupancyRate + 80
            ) / 2
          )
        )
      );

    const revenueStability =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            (
              revenueConfidence +
              Math.max(
                0,
                100 - Math.abs(weeklyGrowth)
              )
            ) / 2
          )
        )
      );

    // ==========================================
    // DEPARTMENT SCORES
    // ==========================================

    const departmentScores = {
      kitchen: Math.max(
        0,
        Math.min(
          100,
          100 -
            Math.max(
              0,
              predictedOccupancy - 80
            )
        )
      ),

      service: Math.max(
        0,
        Math.min(
          100,
          100 -
            cancellationRate * 0.5
        )
      ),

      marketing:
        occupancyRate < 60
          ? 70
          : 95,

      finance:
        expectedRevenue >= 5000
          ? 95
          : 75,

      inventory:
        predictedOccupancy >= 85
          ? 80
          : 95,

      frontDesk:
        confirmationRate >= 90
          ? 95
          : 75,
    };

    // ==========================================
    // BENCHMARKS
    // ==========================================

    const benchmarkResults: string[] = [];
    const benchmarkStatus: string[] = [];

    if (occupancyRate >= 85) {
      benchmarkResults.push(
        "Occupancy exceeds the 85% benchmark."
      );

      benchmarkStatus.push(
        "Excellent"
      );
    } else {
      benchmarkResults.push(
        "Occupancy is below the 85% benchmark."
      );

      benchmarkStatus.push(
        "Needs Improvement"
      );
    }

    if (confirmationRate >= 90) {
      benchmarkResults.push(
        "Confirmation rate meets the 90% target."
      );

      benchmarkStatus.push(
        "Excellent"
      );
    } else {
      benchmarkResults.push(
        "Confirmation rate is below target."
      );

      benchmarkStatus.push(
        "Average"
      );
    }

    if (expectedRevenue >= 8000) {
      benchmarkResults.push(
        "Projected revenue exceeds target."
      );

      benchmarkStatus.push(
        "Excellent"
      );
    } else {
      benchmarkResults.push(
        "Projected revenue has additional growth potential."
      );

      benchmarkStatus.push(
        "Good"
      );
    }

    // ==========================================
    // EXECUTIVE PRIORITY
    // ==========================================

    let executivePriorityLevel = "Medium";
    let executiveDecision =
      "Maintain and optimize operations.";

    const executiveQueue: string[] = [];

    if (healthScore < 50) {
      executivePriorityLevel = "Critical";

      executiveDecision =
        "Immediate executive intervention required.";

      executiveQueue.push(
        "Resolve critical restaurant KPIs."
      );
    } else if (healthScore < 70) {
      executivePriorityLevel = "High";

      executiveDecision =
        "Focus on operational improvements.";

      executiveQueue.push(
        "Improve weak operational KPIs."
      );
    } else if (healthScore >= 90) {
      executivePriorityLevel = "Excellent";

      executiveDecision =
        "Business is performing exceptionally well.";

      executiveQueue.push(
        "Maintain current strategy."
      );
    } else {
      executiveQueue.push(
        "Continue monitoring performance."
      );
    }

    const executiveDecisionConfidence =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            (
              healthScore +
              occupancyConfidence +
              reservationConfidence
            ) / 3
          )
        )
      );

    // ==========================================
    // EXECUTIVE DECISION CENTER
    // ==========================================

    let executiveDecisionCard = {
      priority: "Stable",
      action: "Maintain current operations.",
      confidence: 88,
      impact: "Normal",
      color: "cyan",
      status: "Normal",
    };

    if (predictedOccupancy > 90) {
      executiveDecisionCard = {
        priority: "Critical",
        action: "Increase staffing immediately.",
        confidence: 96,
        impact: "+18 Reservations",
        color: "red",
        status: "Immediate",
      };
    } else if (predictedOccupancy > 70) {
      executiveDecisionCard = {
        priority: "High",
        action: "Prepare extra inventory.",
        confidence: 91,
        impact: "+12 Reservations",
        color: "orange",
        status: "Prepare",
      };
    } else if (predictedOccupancy < 45) {
      executiveDecisionCard = {
        priority: "Marketing",
        action: "Launch promotion campaign.",
        confidence: 93,
        impact: "+15 Reservations",
        color: "emerald",
        status: "Campaign",
      };
    }

    // ==========================================
    // OPTIMIZATION ENGINE
    // ==========================================

    const optimizationTasks: string[] = [];
    const optimizationBenefits: string[] = [];

    if (predictedOccupancy < 60) {
      optimizationTasks.push(
        "Increase table utilization."
      );

      optimizationBenefits.push(
        "Higher occupancy can increase revenue."
      );
    }

    if (cancellationRate > 15) {
      optimizationTasks.push(
        "Automate reservation reminders."
      );

      optimizationBenefits.push(
        "Reduce cancellations and no-shows."
      );
    }

    if (expectedRevenue < 5000) {
      optimizationTasks.push(
        "Promote high-margin menu items."
      );

      optimizationBenefits.push(
        "Increase average revenue per reservation."
      );
    }

    if (
      predictedOccupancy >= 85
    ) {
      optimizationTasks.push(
        "Prepare additional staffing."
      );

      optimizationBenefits.push(
        "Reduce service delays during peak demand."
      );
    }

    if (
      optimizationTasks.length === 0
    ) {
      optimizationTasks.push(
        "No major optimization required."
      );

      optimizationBenefits.push(
        "Restaurant performance is currently stable."
      );
    }

    // ==========================================
    // SIMULATION ENGINE
    // ==========================================

    const simulations: string[] = [];
    const simulationRisks: string[] = [];
    const simulationRevenue: string[] = [];

    if (weeklyGrowth > 0) {
      simulations.push(
        "Reservation growth is likely to continue if current demand remains stable."
      );

      simulationRevenue.push(
        "Revenue should increase with reservation growth."
      );
    } else if (weeklyGrowth < 0) {
      simulations.push(
        "Reservation volume may continue declining without corrective marketing."
      );

      simulationRisks.push(
        "Revenue may decline if demand recovery actions are delayed."
      );
    } else {
      simulations.push(
        "Current reservation demand is expected to remain relatively stable."
      );
    }

    if (predictedOccupancy >= 85) {
      simulationRisks.push(
        "Kitchen and service workload may increase significantly."
      );
    }

    if (
      simulationRisks.length === 0
    ) {
      simulationRisks.push(
        "No major operational risks detected."
      );
    }

    if (
      simulationRevenue.length === 0
    ) {
      simulationRevenue.push(
        "Revenue expected to remain stable."
      );
    }

    // ==========================================
    // CEO SUMMARY
    // ==========================================

    let ceoOutlook = "Stable";
    let ceoSummary =
      "Restaurant performance is stable.";
    let ceoDecision =
      "Continue current business strategy.";

    if (weeklyGrowth < 0) {
      ceoOutlook = "Negative";

      ceoSummary =
        "Restaurant demand is declining.";

      ceoDecision =
        "Increase customer acquisition and retention activity.";
    } else if (
      predictedOccupancy >= 85
    ) {
      ceoOutlook = "Positive";

      ceoSummary =
        "Restaurant demand is strong.";

      ceoDecision =
        "Prepare additional operational capacity.";
    } else if (
      expectedRevenue >= 5000
    ) {
      ceoOutlook = "Positive";

      ceoSummary =
        "Restaurant revenue outlook is healthy.";

      ceoDecision =
        "Maintain the current pricing and growth strategy.";
    }

    // ==========================================
    // EXECUTIVE HEADLINE
    // ==========================================

    let executiveHeadline =
      "Restaurant requires executive attention.";

    let todayFocus =
      "Resolve operational risks immediately.";

    if (healthScore >= 90) {
      executiveHeadline =
        "Restaurant performing exceptionally well.";

      todayFocus =
        "Maintain current operational excellence.";
    } else if (healthScore >= 75) {
      executiveHeadline =
        "Restaurant performing well.";

      todayFocus =
        "Improve weak KPIs.";
    }

    const executiveSummary =
      `Health Score: ${healthScore}%. Revenue: $${expectedRevenue}. Occupancy: ${occupancyRate}%. Growth: ${weeklyGrowth}%.`;

    // ==========================================
    // EXECUTIVE ALERTS
    // ==========================================

    const executiveAlerts: string[] = [];

    if (cancellationRate > 15) {
      executiveAlerts.push(
        "High cancellation rate."
      );
    }

    if (occupancyRate < 60) {
      executiveAlerts.push(
        "Low occupancy."
      );
    }

    if (weeklyGrowth < 0) {
      executiveAlerts.push(
        "Negative business growth."
      );
    }

    // ==========================================
    // SMART ALERT ENGINE
    // ==========================================

    const smartAlerts: string[] = [];

    if (expectedRevenue < 3000) {
      smartAlerts.push(
        "Revenue is below target."
      );
    }

    if (predictedOccupancy < 60) {
      smartAlerts.push(
        "Occupancy is critically low."
      );
    }

    if (cancellationRate > 20) {
      smartAlerts.push(
        "Cancellation rate is too high."
      );
    }

    if (kitchenStaffRequired >= 6) {
      smartAlerts.push(
        "Kitchen workload is expected to be high."
      );
    }

    if (weeklyGrowth > 15) {
      smartAlerts.push(
        "Business growth is exceptional."
      );
    }

    const alertCount =
      smartAlerts.filter(
        (alert) =>
          !alert.includes(
            "exceptional"
          )
      ).length;

    let alertLevel = "Normal";
    let emergencyAction =
      "No emergency actions required.";

    if (alertCount >= 3) {
      alertLevel = "Critical";

      emergencyAction =
        "Executive intervention required immediately.";
    } else if (alertCount === 2) {
      alertLevel = "High";

      emergencyAction =
        "Management review recommended.";
    } else if (alertCount === 1) {
      alertLevel = "Medium";

      emergencyAction =
        "Monitor operations closely.";
    }

    // ==========================================
    // AUTONOMOUS TASK ENGINE
    // ==========================================

    const autonomousTasks: string[] = [];

    let taskPriority = "Normal";
    let estimatedBusinessImpact = 0;
    let estimatedCompletionHours = 0;

    if (predictedOccupancy >= 90) {
      autonomousTasks.push(
        "Hire temporary staff."
      );

      autonomousTasks.push(
        "Increase food inventory."
      );

      taskPriority = "Critical";
      estimatedBusinessImpact += 25;
      estimatedCompletionHours += 6;
    } else if (
      predictedOccupancy >= 75
    ) {
      autonomousTasks.push(
        "Prepare additional tables."
      );

      autonomousTasks.push(
        "Increase delivery capacity."
      );

      taskPriority = "High";
      estimatedBusinessImpact += 18;
      estimatedCompletionHours += 4;
    } else if (
      predictedOccupancy >= 60
    ) {
      autonomousTasks.push(
        "Maintain normal staffing."
      );

      taskPriority = "Medium";
      estimatedBusinessImpact += 10;
      estimatedCompletionHours += 2;
    } else {
      autonomousTasks.push(
        "Launch promotional campaign."
      );

      autonomousTasks.push(
        "Offer discount packages."
      );

      taskPriority = "Low";
      estimatedBusinessImpact += 5;
      estimatedCompletionHours += 1;
    }

    if (cancellationRate > 20) {
      autonomousTasks.push(
        "Contact cancelled customers."
      );

      estimatedBusinessImpact += 8;
    }

    if (weeklyGrowth < 0) {
      autonomousTasks.push(
        "Start customer retention campaign."
      );

      estimatedBusinessImpact += 10;
    }

    // ==========================================
    // ACTION TIMELINE
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
        title:
          executiveDecisionCard.action,
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
      Math.round(
        (completedTasks /
          totalTasks) *
          100
      );

    const managerProductivity =
      Math.min(
        100,
        Math.round(
          workflowProgress +
            healthScore / 4
        )
      );

    // ==========================================
    // EXECUTIVE BRIEFING
    // ==========================================

    const currentHour =
      new Date().getHours();

    const briefingPeriod =
      currentHour < 12
        ? "Morning"
        : currentHour < 18
        ? "Afternoon"
        : "Evening";

    const executiveBriefing = [
      `Restaurant Health: ${healthScore}%`,
      `Forecast Demand: ${demandForecast}%`,
      `Alert Level: ${alertLevel}`,
      `Priority: ${executivePriorityLevel}`,
    ];

    let tomorrowFocus =
      "Increase marketing activity.";

    if (alertLevel === "Critical") {
      tomorrowFocus =
        "Focus on operational recovery.";
    } else if (
      demandForecast >= 90
    ) {
      tomorrowFocus =
        "Prepare for maximum demand.";
    } else if (
      demandForecast >= 70
    ) {
      tomorrowFocus =
        "Maintain staffing and inventory.";
    }

    const dailySummary =
      `Health ${healthScore}% • Demand ${demandForecast}% • Revenue $${holidayRevenue}`;

    // ==========================================
    // CEO SCORE
    // ==========================================

    const ceoScore =
      Math.round(
        (
          healthScore +
          demandForecast +
          executiveDecisionConfidence
        ) / 3
      );

    let executiveStatus = "Critical";
    let ceoRecommendation =
      "Immediate executive intervention required.";

    if (ceoScore >= 90) {
      executiveStatus = "Excellent";

      ceoRecommendation =
        "Business is performing exceptionally well.";
    } else if (ceoScore >= 75) {
      executiveStatus = "Strong";

      ceoRecommendation =
        "Continue current growth strategy.";
    } else if (ceoScore >= 60) {
      executiveStatus = "Average";

      ceoRecommendation =
        "Focus on operational improvements.";
    }

    // ==========================================
    // AUTONOMOUS RESTAURANT MANAGER
    // ==========================================

    const autonomousActions: string[] = [];

    let autonomousDecision =
      "Stimulate customer demand.";

    let autonomousConfidence = 100;

    if (alertLevel === "Critical") {
      autonomousDecision =
        "Immediately activate recovery plan.";

      autonomousActions.push(
        "Notify executive team."
      );

      autonomousActions.push(
        "Review critical KPIs."
      );

      autonomousActions.push(
        "Increase management supervision."
      );

      autonomousConfidence -= 10;
    } else if (
      demandForecast >= 90
    ) {
      autonomousDecision =
        "Prepare restaurant for peak demand.";

      autonomousActions.push(
        "Increase staffing."
      );

      autonomousActions.push(
        "Increase kitchen inventory."
      );

      autonomousActions.push(
        "Extend delivery capacity."
      );
    } else if (
      demandForecast >= 70
    ) {
      autonomousDecision =
        "Maintain optimized operations.";

      autonomousActions.push(
        "Monitor reservations."
      );

      autonomousActions.push(
        "Monitor inventory."
      );
    } else {
      autonomousDecision =
        "Stimulate customer demand.";

      autonomousActions.push(
        "Launch marketing campaign."
      );

      autonomousActions.push(
        "Offer promotional discounts."
      );

      autonomousConfidence -= 5;
    }

    autonomousConfidence =
      Math.max(
        0,
        Math.min(
          100,
          autonomousConfidence
        )
      );

    const managerSummary =
      `${executiveStatus} • ${alertLevel} Alerts • ${demandLevelAI} Demand • CEO Score ${ceoScore}%`;

    // ==========================================
    // ADDITIONAL COMPATIBILITY VALUES
    // ==========================================

    const executivePriority =
      predictedOccupancy < 50
        ? "Increase marketing"
        : predictedOccupancy > 90
        ? "Increase staffing"
        : "Maintain operations";

    const promotionRecommendation =
      predictedOccupancy < 55
        ? "Run weekday promotion"
        : "No promotion required";

    const staffRecommendation =
      predictedOccupancy > 85
        ? "Increase staff"
        : predictedOccupancy < 45
        ? "Reduce shifts"
        : "Current staffing OK";

    const revenueStrategyFinal =
      revenueStrategy.length > 0
        ? revenueStrategy
        : [
            "Maintain current pricing strategy.",
          ];

    const marketingStrategyFinal =
      marketingStrategy.length > 0
        ? marketingStrategy
        : [
            "Maintain current marketing activity.",
          ];

    const staffingStrategyFinal =
      staffingStrategy.length > 0
        ? staffingStrategy
        : [
            "Current staffing strategy is sufficient.",
          ];

    const customerStrategyFinal =
      customerStrategy.length > 0
        ? customerStrategy
        : [
            "Maintain current customer experience strategy.",
          ];

    const growthStrategyFinal =
      growthStrategy.length > 0
        ? growthStrategy
        : [
            "Maintain current growth momentum.",
          ];

    // ==========================================
    // RETURN EXECUTIVE BRAIN
    // ==========================================

    return {
      healthScore,

      insights,
      risks,
      opportunities,

      executivePriority,
      executiveActions,
      executiveWarnings,

      revenueStrategy:
        revenueStrategyFinal,

      marketingStrategy:
        marketingStrategyFinal,

      staffingStrategy:
        staffingStrategyFinal,

      customerStrategy:
        customerStrategyFinal,

      growthStrategy:
        growthStrategyFinal,

      ceoSummary,
      ceoDecision,
      ceoOutlook,

      optimizationTasks,
      optimizationBenefits,

      simulations,
      simulationRisks,
      simulationRevenue,

      profitabilityScore,
      businessScore,
      customerHealth,
      operationalEfficiency,
      revenueStability,

      benchmarkResults,
      benchmarkStatus,

      departmentScores,

      branchComparison: [
        {
          branch: "Main Branch",
          revenue: expectedRevenue,
          occupancy: occupancyRate,
          growth: weeklyGrowth,
          status: "Current",
        },
      ],

      executiveHeadline,
      executiveSummary,
      todayFocus,
      executiveAlerts,

      nextWeekRevenue,
      nextMonthRevenue,
      revenueConfidence,
      revenueTrend,

      tomorrowReservations,
      nextWeekReservations,
      nextMonthReservations,
      reservationTrend,
      reservationConfidence,
      reservationRisk,

      predictedOccupancy,
      occupancyTrend,
      occupancyConfidence,
      occupancyRecommendation,

      kitchenStaffRequired,
      serviceStaffRequired,
      frontDeskStaffRequired,
      deliveryStaffRequired,

      staffingStatus,
      staffingRecommendation,

      currentSeason,
      seasonalGrowth,
      seasonalRevenue,
      seasonalOccupancy,
      seasonalReservations,
      seasonalRecommendation,

      eventName,
      demandLevel,
      businessBoost,
      holidayRevenue,
      holidayRecommendation,

      demandForecast,
      demandLevelAI,
      demandConfidence,
      expectedProfit,
      demandRecommendation,

      executivePriorityLevel,
      executiveDecision:
        executiveDecisionCard.action,
      executiveDecisionConfidence,
      executiveQueue,

      autonomousTasks,
      taskPriority,
      estimatedBusinessImpact,
      estimatedCompletionHours,

      smartAlerts,
      alertLevel,
      alertCount,
      emergencyAction,

      briefingPeriod,
      executiveBriefing,
      tomorrowFocus,
      dailySummary,

      ceoScore,
      executiveStatus,
      ceoRecommendation,

      autonomousManagerStatus:
        "Online",

      autonomousDecision,
      autonomousConfidence,
      autonomousActions,

      managerSummary,

      // Compatibility values
      vipCustomers,
      returningCustomers,
      atRiskCustomers,
      customerSatisfaction,
      loyaltyScore,
      premiumCustomers,
      retentionPriority,
      vipStatus,
      retentionRecommendations,

      actionTimeline,
      workflowProgress,
      managerProductivity,
      completedTasks,
      totalTasks,

      // Legacy / UI compatibility
      predictedRevenue,
      predictedReservations,
      executiveDecisionCard,
    };
  }, [
    data.totalReservations,
    data.expectedRevenue,
    data.expectedGuests,
    data.forecastOccupancy,
    data.weeklyGrowth,
    data.occupancyRate,
    data.cancellationRate,
    data.confirmationRate,
  ]);
}