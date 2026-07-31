import { useState } from "react";

export interface CopilotMessage {

  id:number;

  role:"user"|"assistant";

  text:string;

}

export function useRestaurantCopilot(
dashboard:any,
commands?:{
exportCSV?:()=>void;
print?:()=>void;
openNotifications?:()=>void;
scrollAnalytics?:()=>void;
logout?:()=>void;
},
remember?:(
question:string,
answer:string,
topic:string
)=>void
){

const [messages,setMessages]=
useState<CopilotMessage[]>([]);

const [loading,setLoading]=
useState(false);

const [lastIntent,setLastIntent]=
useState("");

const [lastTopic,setLastTopic]=
useState("");

const[conversationHistory,setConversationHistory]=
useState<string[]>([]);

function detectIntent(query:string){
const q=query.toLowerCase();
if(
q.includes("export")||
q.includes("download")||
q.includes("csv")||
q.includes("excel")||
q.includes("report")
){
return "export";
}
if(
q.includes("print")||
q.includes("printer")||
q.includes("pdf")
){
return "print";
}
if(
q.includes("analytics")||
q.includes("analysis")||
q.includes("statistics")||
q.includes("stats")||
q.includes("dashboard")
){
return "analytics";
}
if(
q.includes("notification")||
q.includes("alert")||
q.includes("message")
){
return "notifications";
}
if(
q.includes("logout")||
q.includes("log out")||
q.includes("sign out")||
q.includes("exit")
){
return "logout";
}
return "";
}

function calculateConfidence(
query:string
){
const words=query.trim().split(" ");
if(words.length<=1) return 45;
if(words.length<=3) return 72;
return 95;
}

const sendMessage = async (
message:string
)=>{
setLoading(true);
setConversationHistory(prev=>[
...prev,
message
]);
const userMessage={
id:Date.now(),
role:"user" as const,
text:message,
};
setMessages(prev=>[
...prev,
userMessage,
])
await new Promise(
resolve=>setTimeout(resolve,300)
);
const q=
message.toLowerCase();
const intent=
detectIntent(q);
const context=
(lastIntent+" "+q).toLowerCase();
const previousConversation=
conversationHistory
.join(" ")
.toLowerCase();
const responses:string[]=[];

// ============================
// COMMAND EXECUTION
// ============================

if(
intent==="export"
){
commands?.exportCSV?.();
responses.push(
"✅ Reservation report exported."
);
}
if(
intent==="print"
){
commands?.print?.();
responses.push(
"🖨️ Print command executed."
);
}
if(
intent==="notifications"
){
commands?.openNotifications?.();
responses.push(
"🔔 Notifications opened."
);
}
if(
intent==="analytics"
){
commands?.scrollAnalytics?.();
responses.push(
"📊 Analytics opened."
);
}
if(
intent==="logout"
){
commands?.logout?.();
responses.push(
"👋 Logging out..."
);
}

if(
q.includes("today")||
q.includes("reservation")
){
setLastTopic("reservation");

responses.push(
`Today's reservations: ${dashboard.totalReservations}`
);
}
if(
context.includes("cancel")
){
responses.push(
`Cancelled reservations: ${dashboard.cancelledReservations}`
);
}
if(
context.includes("confirm")
){
responses.push(
`Confirmed reservations: ${dashboard.confirmedReservations}`
);
}

else if(
q.includes("revenue")
){
setLastTopic("revenue");

responses.push(
`Expected revenue: $${dashboard.expectedRevenue}`
);
}
if(
context.includes("growth")
){
responses.push(
`Weekly growth: ${dashboard.weeklyGrowth}%`
);
}
if(
context.includes("occupancy")
){
responses.push(
`Occupancy: ${dashboard.occupancyRate}%`
);
}
if(
context.includes("forecast")
){
responses.push(
`Expected next week reservations: ${dashboard.expectedReservations}`
);
}

if(
q.includes("and")||
q.includes("also")||
q.includes("what about")
){
if(
lastTopic==="reservation"
){
responses.push(
`Continuing reservation discussion: expected tomorrow reservations are ${dashboard.expectedReservations}.`
);
}
if(
lastTopic==="revenue"
){
responses.push(
`Continuing revenue discussion: projected revenue is $${dashboard.expectedRevenue}.`
);
}
}

if (responses.length === 0) {
  if (
    q.includes("tomorrow") &&
    lastTopic === "reservation"
  ) {
    responses.push(
      `Tomorrow forecast: ${dashboard.expectedReservations} reservations.`
    );
  }
  else if (
    q.includes("compare") &&
    lastTopic === "revenue"
  ) {
    responses.push(
      `Current projected revenue is $${dashboard.expectedRevenue}. Weekly growth is ${dashboard.weeklyGrowth}%.`
    );
  }
  else {
    responses.push(
      "I understand restaurant operations. Try asking about reservations, revenue, occupancy, growth or forecast."
    );
  }
}
setLastIntent(q);

setConversationHistory(prev=>[
...prev,
responses.join(" ")
]);

const confidence =
calculateConfidence(message);

const aiMessage={
id:Date.now()+1,
role:"assistant" as const,
text:
responses.join("\n\n")+
`\n\nConfidence: ${confidence}%`,
};
setMessages(prev=>[
...prev,
aiMessage,
]);

remember?.(
message,
aiMessage.text,
lastTopic
);

setLoading(false);
};

return{
messages,
loading,
sendMessage,
lastIntent,
};

}