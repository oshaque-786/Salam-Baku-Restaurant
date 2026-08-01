import { useMemo } from "react";

interface ExecutiveInput{

totalReservations:number;

expectedRevenue:number;

weeklyGrowth:number;

occupancyRate:number;

cancellationRate:number;

confirmationRate:number;

}

export function useExecutiveAIBrain(

data:ExecutiveInput

){

return useMemo(()=>{

let healthScore=100;

const insights:string[]=[];

const executiveActions:string[]=[];

const executiveWarnings:string[]=[];

const revenueStrategy:string[]=[];

const marketingStrategy:string[]=[];

const staffingStrategy:string[]=[];

const customerStrategy:string[]=[];

const growthStrategy:string[]=[];

let ceoSummary="";

let ceoDecision="";

let ceoOutlook="Stable";

const optimizationTasks:string[]=[];

const optimizationBenefits:string[]=[];

const simulations:string[]=[];

const simulationRisks:string[]=[];

const simulationRevenue:string[]=[];

let profitabilityScore=100;

let businessScore=100;

let customerHealth=100;

let operationalEfficiency=100;

let revenueStability=100;

const benchmarkResults:string[]=[];

const benchmarkStatus:string[]=[];

const departmentScores = {

kitchen:100,

service:100,

marketing:100,

finance:100,

inventory:100,

frontDesk:100,

};

const branchComparison = [

{

branch: "Main Branch",

revenue: data.expectedRevenue,

occupancy: data.occupancyRate,

growth: data.weeklyGrowth,

status: "Current",

},

];

let executiveHeadline = "";

let executiveSummary = "";

let nextWeekRevenue=0;

let nextMonthRevenue=0;

let revenueConfidence=95;

let revenueTrend="Stable";

let tomorrowReservations=0;

let nextWeekReservations=0;

let nextMonthReservations=0;

let reservationTrend="Stable";

let reservationConfidence=95;

let reservationRisk="Low";

let predictedOccupancy=0;

let occupancyTrend="Stable";

let occupancyConfidence=95;

let occupancyRecommendation="";

let kitchenStaffRequired=0;

let serviceStaffRequired=0;

let frontDeskStaffRequired=0;

let deliveryStaffRequired=0;

let staffingStatus="Balanced";

let staffingRecommendation="";

let currentSeason="Summer";

let seasonalGrowth=0;

let seasonalRevenue=0;

let seasonalOccupancy=0;

let seasonalReservations=0;

let seasonalRecommendation="";

let eventName="Regular Day";

let demandLevel="Normal";

let businessBoost=0;

let holidayRevenue=0;

let holidayRecommendation="";

let demandForecast=0;

let demandLevelAI="Normal";

let demandConfidence=95;

let expectedProfit=0;

let demandRecommendation="";

let executivePriorityLevel="Medium";

let executiveDecision="Maintain operations.";

let executiveDecisionConfidence=95;

const executiveQueue:string[]=[];

const autonomousTasks:string[]=[];

let taskPriority="Normal";

let estimatedBusinessImpact=0;

let estimatedCompletionHours=0;

const smartAlerts:string[]=[];

let alertLevel="Normal";

let alertCount=0;

let emergencyAction="";

let briefingPeriod="Morning";

const executiveBriefing:string[]=[];

let tomorrowFocus="";

let dailySummary="";

let ceoScore=0;

let executiveStatus="";

let ceoRecommendation="";

let autonomousManagerStatus="Online";

let autonomousDecision="";

let autonomousConfidence=100;

const autonomousActions:string[]=[];

let managerSummary="";

let todayFocus = "";

const executiveAlerts:string[] = [];

let executivePriority="Normal";

const risks:string[]=[];

const opportunities:string[]=[];

if(data.weeklyGrowth<0){

healthScore-=15;

risks.push(

"Weekly reservation growth is declining."

);

executivePriority="High";

executiveActions.push(

"Launch reservation recovery campaign"

);

executiveWarnings.push(

"Negative reservation growth detected"

);

growthStrategy.push(

"Recover lost reservations"

);

growthStrategy.push(

"Increase local advertising"

);

ceoSummary=

"Restaurant performance is declining.";

ceoDecision=

"Immediately increase reservations through promotions.";

ceoOutlook="Negative";

optimizationTasks.push(

"Launch reservation campaign"

);

optimizationBenefits.push(

"Recover weekly reservation growth."

);

simulationRisks.push(

"Revenue may continue declining if marketing is unchanged."

);

profitabilityScore-=15;

businessScore-=20;

revenueStability-=15;

revenueConfidence-=20;

revenueTrend="Declining";

}

else{

opportunities.push(

"Reservation growth trend is positive."

);

}

if(data.weeklyGrowth>10){

revenueTrend="Growing";

revenueConfidence+=2;

}

if(data.occupancyRate<60){

healthScore-=20;

risks.push(

"Restaurant occupancy is below optimal."

);

executivePriority="Critical";

executiveActions.push(

"Increase marketing budget"

);

executiveWarnings.push(

"Low occupancy is affecting revenue"

);

marketingStrategy.push(

"Launch social media campaign"

);

marketingStrategy.push(

"Offer weekday discounts"

);

ceoDecision=

"Increase marketing budget.";

ceoOutlook="Needs Attention";

optimizationTasks.push(

"Increase table utilization"

);

optimizationBenefits.push(

"Higher occupancy can increase revenue."

);

simulations.push(

"10% occupancy increase can improve profitability."

);

simulationRisks.push(

"Additional servers may be required."

);

operationalEfficiency-=20;

businessScore-=10;

departmentScores.marketing-=20;

}

if (data.occupancyRate >= 85) {

  benchmarkResults.push(
    "Occupancy exceeds industry benchmark (85%)."
  );

  benchmarkStatus.push("Excellent");

  opportunities.push(
    "Occupancy is healthy."
  );

} else {

benchmarkResults.push(

"Occupancy below benchmark."

);

benchmarkStatus.push("Needs Improvement");

}

if (data.occupancyRate >= 60) {

  opportunities.push(
    "Occupancy is healthy."
  );

}

if(data.cancellationRate>20){

healthScore-=10;

risks.push(

"Cancellation rate requires attention."

);

departmentScores.frontDesk-=15;

departmentScores.service-=10;

}

if(data.confirmationRate>80){

healthScore+=5;

insights.push(

"Customers have a high confirmation rate."

);

}

if(data.confirmationRate>=90){

benchmarkResults.push(

"Confirmation rate meets benchmark."

);

benchmarkStatus.push("Excellent");

}else{

benchmarkResults.push(

"Confirmation rate below target."

);

benchmarkStatus.push("Average");

}

if(data.confirmationRate<80){

customerStrategy.push(

"Send reminder messages"

);

customerStrategy.push(

"Introduce loyalty rewards"

);

optimizationTasks.push(

"Automate reminder messages"

);

optimizationBenefits.push(

"Reduce no-shows."

);

customerHealth-=20;

businessScore-=10;

}

if(data.expectedRevenue>5000){

insights.push(

"Revenue projection is excellent."

);

executiveActions.push(

"Maintain premium pricing"

);

revenueStrategy.push(

"Maintain premium pricing"

);

revenueStrategy.push(

"Promote high-margin dishes"

);

ceoSummary=

"Restaurant revenue is growing steadily.";

ceoDecision=

"Maintain current pricing strategy.";

ceoOutlook="Positive";

profitabilityScore+=5;

businessScore+=5;

revenueStability+=5;

departmentScores.finance+=5;

}

if(data.expectedRevenue>=8000){

benchmarkResults.push(

"Revenue exceeds benchmark."

);

benchmarkStatus.push("Excellent");

}else{

benchmarkResults.push(

"Revenue still has growth potential."

);

benchmarkStatus.push("Good");

}

if(data.totalReservations>100){

staffingStrategy.push(

"Increase evening staff"

);

staffingStrategy.push(

"Prepare extra kitchen capacity"

);

optimizationTasks.push(

"Promote premium menu"

);

optimizationBenefits.push(

"Increase profit margin."

);

optimizationTasks.push(

"Increase weekend staff"

);

optimizationBenefits.push(

"Reduce waiting time."

);

simulationRevenue.push(

"If reservations increase 10%, projected revenue +8%."

);

simulations.push(

"Premium pricing remains sustainable."

);

simulations.push(

"Weekend reservation growth may exceed kitchen capacity."

);

simulationRisks.push(

"Kitchen workload could increase."

);

departmentScores.kitchen-=10;

departmentScores.inventory-=5;

}

if(ceoSummary===""){

ceoSummary=

"Restaurant performance is stable.";

}

if(ceoDecision===""){

ceoDecision=

"Continue current business strategy.";

}

if(optimizationTasks.length===0){

optimizationTasks.push(

"No optimization required."

);

optimizationBenefits.push(

"Restaurant is performing optimally."

);

}

if(simulations.length===0){

simulations.push(

"No significant operational changes predicted."

);

}

if(simulationRisks.length===0){

simulationRisks.push(

"No major operational risks detected."

);

}

if(simulationRevenue.length===0){

simulationRevenue.push(

"Revenue expected to remain stable."

);

}

profitabilityScore=Math.max(
0,
Math.min(100,profitabilityScore)
);

businessScore=Math.max(
0,
Math.min(100,businessScore)
);

customerHealth=Math.max(
0,
Math.min(100,customerHealth)
);

operationalEfficiency=Math.max(
0,
Math.min(100,operationalEfficiency)
);

revenueStability=Math.max(
0,
Math.min(100,revenueStability)
);

if(benchmarkResults.length===0){

benchmarkResults.push(

"No benchmark available."

);

benchmarkStatus.push("Unknown");

}

Object.keys(departmentScores).forEach(key=>{

departmentScores[

key as keyof typeof departmentScores

]=Math.max(

0,

Math.min(

100,

departmentScores[

key as keyof typeof departmentScores

]

)

);

});

if(healthScore>=90){

executiveHeadline="Restaurant performing exceptionally well.";

todayFocus="Maintain current operational excellence.";

}else if(healthScore>=75){

executiveHeadline="Restaurant performing well.";

todayFocus="Improve weak KPIs.";

}else{

executiveHeadline="Restaurant requires executive attention.";

todayFocus="Resolve operational risks immediately.";

}

executiveSummary=

`Health Score: ${healthScore}%.
Revenue: $${data.expectedRevenue}.
Occupancy: ${data.occupancyRate}%.
Growth: ${data.weeklyGrowth}%.`;

if(data.cancellationRate>15){

executiveAlerts.push(

"High cancellation rate"

);

}

if(data.occupancyRate<60){

executiveAlerts.push(

"Low occupancy"

);

}

if(data.weeklyGrowth<0){

executiveAlerts.push(

"Negative business growth"

);

}

nextWeekRevenue=

Math.round(

data.expectedRevenue*

(1+data.weeklyGrowth/100)

);

nextMonthRevenue=

Math.round(

nextWeekRevenue*4

);

revenueConfidence=

Math.max(

0,

Math.min(

100,

revenueConfidence

)

);

tomorrowReservations=

Math.max(
0,
Math.round(
data.totalReservations/7
)
);

nextWeekReservations=

Math.max(
0,
Math.round(
data.totalReservations*
(1+data.weeklyGrowth/100)
)
);

nextMonthReservations=

Math.round(
nextWeekReservations*4
);

if(data.weeklyGrowth>10){

reservationTrend="Growing";

reservationConfidence=98;

}

else if(data.weeklyGrowth>=0){

reservationTrend="Stable";

reservationConfidence=92;

}

else{

reservationTrend="Declining";

reservationConfidence=80;

reservationRisk="High";

}

if(data.occupancyRate<60){

reservationRisk="Critical";

reservationConfidence-=10;

}

reservationConfidence=

Math.max(

0,

Math.min(

100,

reservationConfidence

)

);

predictedOccupancy=

Math.min(

100,

Math.round(

(nextWeekReservations/

Math.max(

1,

data.totalReservations

))

*

data.occupancyRate

)

);

if(predictedOccupancy>=90){

occupancyTrend="Very High";

occupancyRecommendation=

"Increase staffing and inventory.";

}

else if(predictedOccupancy>=75){

occupancyTrend="Healthy";

occupancyRecommendation=

"Maintain current operations.";

}

else if(predictedOccupancy>=60){

occupancyTrend="Moderate";

occupancyRecommendation=

"Launch marketing campaign.";

}

else{

occupancyTrend="Low";

occupancyRecommendation=

"Immediate promotion required.";

occupancyConfidence-=10;

}

occupancyConfidence=

Math.max(

0,

Math.min(

100,

occupancyConfidence

)

);

kitchenStaffRequired=

Math.max(
2,
Math.ceil(predictedOccupancy/20)
);

serviceStaffRequired=

Math.max(
2,
Math.ceil(predictedOccupancy/18)
);

frontDeskStaffRequired=

Math.max(
1,
Math.ceil(predictedOccupancy/40)
);

deliveryStaffRequired=

Math.max(
1,
Math.ceil(predictedOccupancy/25)
);

if(predictedOccupancy>=90){

staffingStatus="High Demand";

staffingRecommendation=

"Increase shifts immediately.";

}

else if(predictedOccupancy>=75){

staffingStatus="Normal";

staffingRecommendation=

"Current staffing is sufficient.";

}

else{

staffingStatus="Low Demand";

staffingRecommendation=

"Reduce extra shifts.";

}

const month=

new Date().getMonth()+1;

if(

month>=3&&month<=5

){

currentSeason="Spring";

seasonalGrowth=8;

}

else if(

month>=6&&month<=8

){

currentSeason="Summer";

seasonalGrowth=15;

}

else if(

month>=9&&month<=11

){

currentSeason="Autumn";

seasonalGrowth=5;

}

else{

currentSeason="Winter";

seasonalGrowth=-5;

}

seasonalRevenue=

Math.round(

data.expectedRevenue*

(

1+

seasonalGrowth/100

)

);

seasonalOccupancy=

Math.max(

0,

Math.min(

100,

Math.round(

data.occupancyRate+

seasonalGrowth

)

)

);

seasonalReservations=

Math.round(

data.totalReservations*

(

1+

seasonalGrowth/100

)

);

if(seasonalGrowth>10){

seasonalRecommendation=

"Prepare for high customer demand.";

}

else if(seasonalGrowth>0){

seasonalRecommendation=

"Maintain current operations.";

}

else{

seasonalRecommendation=

"Launch seasonal promotions.";

}

const day=

new Date().getDay();

if(

day===5||

day===6

){

eventName="Weekend";

businessBoost=20;

}

else{

eventName="Weekday";

businessBoost=0;

}

holidayRevenue=

Math.round(

seasonalRevenue*

(

1+

businessBoost/100

)

);

if(businessBoost>=20){

demandLevel="High";

holidayRecommendation=

"Increase inventory and staffing.";

}

else{

demandLevel="Normal";

holidayRecommendation=

"Standard operations are sufficient.";

}

demandForecast=

Math.round(

(

predictedOccupancy+

seasonalOccupancy

)/2

);

expectedProfit=

Math.round(

holidayRevenue*0.35

);

if(demandForecast>=90){

demandLevelAI="Extreme";

demandRecommendation=

"Maximum preparation required.";

}

else if(demandForecast>=75){

demandLevelAI="High";

demandRecommendation=

"Increase staff and inventory.";

}

else if(demandForecast>=60){

demandLevelAI="Moderate";

demandRecommendation=

"Normal operations.";

}

else{

demandLevelAI="Low";

demandRecommendation=

"Run promotional campaigns.";

demandConfidence-=10;

}

demandConfidence=

Math.max(

0,

Math.min(

100,

demandConfidence

)

);

if(healthScore<50){

executivePriorityLevel="Critical";

executiveDecision=

"Immediate executive intervention required.";

executiveQueue.push(

"Restaurant health below 50%"

);

}

else if(healthScore<70){

executivePriorityLevel="High";

executiveDecision=

"Focus on operational improvements.";

executiveQueue.push(

"Improve restaurant performance"

);

}

else if(healthScore<90){

executivePriorityLevel="Medium";

executiveDecision=

"Maintain and optimize operations.";

executiveQueue.push(

"Continue monitoring"

);

}

else{

executivePriorityLevel="Excellent";

executiveDecision=

"Business performing exceptionally well.";

executiveQueue.push(

"Maintain current strategy"

);

}

executiveDecisionConfidence=

Math.max(

0,

Math.min(

100,

healthScore

)

);

if(predictedOccupancy>=90){

autonomousTasks.push(

"Hire temporary staff"

);

autonomousTasks.push(

"Increase food inventory"

);

taskPriority="Critical";

estimatedBusinessImpact+=25;

estimatedCompletionHours+=6;

}

else if(predictedOccupancy>=75){

autonomousTasks.push(

"Prepare additional tables"

);

autonomousTasks.push(

"Increase delivery riders"

);

taskPriority="High";

estimatedBusinessImpact+=18;

estimatedCompletionHours+=4;

}

else if(predictedOccupancy>=60){

autonomousTasks.push(

"Maintain normal staffing"

);

taskPriority="Medium";

estimatedBusinessImpact+=10;

estimatedCompletionHours+=2;

}

else{

autonomousTasks.push(

"Launch promotional campaign"

);

autonomousTasks.push(

"Offer discount packages"

);

taskPriority="Low";

estimatedBusinessImpact+=5;

estimatedCompletionHours+=1;

}

if(data.cancellationRate>20){

autonomousTasks.push(

"Contact cancelled customers"

);

estimatedBusinessImpact+=8;

}

if(data.weeklyGrowth<0){

autonomousTasks.push(

"Start customer retention campaign"

);

estimatedBusinessImpact+=10;

}

// ==========================================
// SMART ALERT ENGINE
// ==========================================

if(data.expectedRevenue<3000){

smartAlerts.push(

"Revenue is below target."

);

alertCount++;

}

if(predictedOccupancy<60){

smartAlerts.push(

"Occupancy is critically low."

);

alertCount++;

}

if(data.cancellationRate>20){

smartAlerts.push(

"Cancellation rate is too high."

);

alertCount++;

}

if(kitchenStaffRequired>=6){

smartAlerts.push(

"Kitchen workload expected to be high."

);

alertCount++;

}

if(data.weeklyGrowth>15){

smartAlerts.push(

"Business growth is exceptional."

);

}

if(alertCount>=3){

alertLevel="Critical";

emergencyAction=

"Executive intervention required immediately.";

}

else if(alertCount===2){

alertLevel="High";

emergencyAction=

"Management review recommended.";

}

else if(alertCount===1){

alertLevel="Medium";

emergencyAction=

"Monitor operations closely.";

}

else{

alertLevel="Normal";

emergencyAction=

"No emergency actions required.";

}

const currentHour=

new Date().getHours();

if(currentHour<12){

briefingPeriod="Morning";

}

else if(currentHour<18){

briefingPeriod="Afternoon";

}

else{

briefingPeriod="Evening";

}

executiveBriefing.push(

`Restaurant Health: ${healthScore}%`

);

executiveBriefing.push(

`Forecast Demand: ${demandForecast}%`

);

executiveBriefing.push(

`Alert Level: ${alertLevel}`

);

executiveBriefing.push(

`Priority: ${executivePriorityLevel}`

);

if(alertLevel==="Critical"){

tomorrowFocus=

"Focus on operational recovery.";

}

else if(demandForecast>=90){

tomorrowFocus=

"Prepare for maximum demand.";

}

else if(demandForecast>=70){

tomorrowFocus=

"Maintain staffing and inventory.";

}

else{

tomorrowFocus=

"Increase marketing activity.";

}

dailySummary=

`Health ${healthScore}% • Demand ${demandForecast}% • Revenue $${holidayRevenue}`;

ceoScore=

Math.round(

(

healthScore+

demandForecast+

executiveDecisionConfidence

)/3

);

if(ceoScore>=90){

executiveStatus="Excellent";

ceoRecommendation=

"Business is performing exceptionally well.";

}

else if(ceoScore>=75){

executiveStatus="Strong";

ceoRecommendation=

"Continue current growth strategy.";

}

else if(ceoScore>=60){

executiveStatus="Average";

ceoRecommendation=

"Focus on operational improvements.";

}

else{

executiveStatus="Critical";

ceoRecommendation=

"Immediate executive intervention required.";

}

// ==========================================
// AUTONOMOUS RESTAURANT MANAGER
// ==========================================

if(alertLevel==="Critical"){

autonomousDecision=

"Immediately activate recovery plan.";

autonomousActions.push(

"Notify executive team"

);

autonomousActions.push(

"Review all critical KPIs"

);

autonomousActions.push(

"Increase management supervision"

);

autonomousConfidence-=10;

}

else if(demandForecast>=90){

autonomousDecision=

"Prepare restaurant for peak demand.";

autonomousActions.push(

"Increase staffing"

);

autonomousActions.push(

"Increase kitchen inventory"

);

autonomousActions.push(

"Extend delivery capacity"

);

}

else if(demandForecast>=70){

autonomousDecision=

"Maintain optimized operations.";

autonomousActions.push(

"Monitor reservations"

);

autonomousActions.push(

"Monitor inventory"

);

}

else{

autonomousDecision=

"Stimulate customer demand.";

autonomousActions.push(

"Launch marketing campaign"

);

autonomousActions.push(

"Offer promotional discounts"

);

autonomousConfidence-=5;

}

managerSummary=

`${executiveStatus} • ${alertLevel} Alerts • ${demandLevelAI} Demand • CEO Score ${ceoScore}%`;

autonomousConfidence=

Math.max(

0,

Math.min(

100,

autonomousConfidence

)

);

return{

healthScore,

insights,

risks,

opportunities,

executivePriority,

executiveActions,

executiveWarnings,

revenueStrategy,

marketingStrategy,

staffingStrategy,

customerStrategy,

growthStrategy,

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

branchComparison,

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

executiveDecision,

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

autonomousManagerStatus,

autonomousDecision,

autonomousConfidence,

autonomousActions,

managerSummary,

};

},[data]);

}