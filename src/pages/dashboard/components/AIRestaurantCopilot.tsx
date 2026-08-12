import { memo, useEffect, useState } from "react";
import { useRestaurantCopilot } from "../../../hooks/useRestaurantCopilot";
import { useCopilotSuggestions } from "../../../hooks/useCopilotSuggestions";
import { useVoiceRecognition } from "../../../hooks/useVoiceRecognition";
import { useSpeechSynthesis } from "../../../hooks/useSpeechSynthesis";
import { useCopilotMemory } from "../../../hooks/useCopilotMemory";

import {
Bot,
Send,
Loader2,
Mic
} from "lucide-react";

interface Props{
dashboard:any;
commands:{
exportCSV:()=>void;
print:()=>void;
openNotifications:()=>void;
scrollAnalytics:()=>void;
logout:()=>void;
};
}

function AIRestaurantCopilot({
dashboard,
commands,
}:Props){

const {
memory,
remember,
}=useCopilotMemory();

const {
  messages,
  loading,
  sendMessage,
} = useRestaurantCopilot(
  dashboard,
  commands,
  remember
);

const [input, setInput] = useState("");

const {
supported,
listening,
transcript,
startListening,
stopListening,
wakeMode,
}=useVoiceRecognition();

const {
speaking,
speak,
}=useSpeechSynthesis();

const suggestions =
useCopilotSuggestions(input);

useEffect(() => {
  if (!transcript.trim()) return;
  setInput(transcript);
  sendMessage(transcript);
  setInput("");
}, [transcript, sendMessage]);

useEffect(() => {
  if (
    messages.length === 0
  ) return;
  const last =
    messages[messages.length - 1];
  if (
    last.role === "assistant"
  ) {
    speak(last.text);
  }
}, [messages, speak]);

useEffect(() => {
if(!supported) return;
const restart = () => {
if(!loading){
startListening();
}
};
window.addEventListener(
"copilot-finished-speaking",
restart
);
return()=>{
window.removeEventListener(
"copilot-finished-speaking",
restart
);
};
},[
loading,
supported,
startListening
]);


return(

<div className="rounded-2xl border border-cyan-500/20 bg-slate-900 p-6">

<div className="mb-5 flex items-center gap-3">

<Bot className="h-7 w-7 text-cyan-400"/>

<div>

<h2 className="text-xl font-semibold text-white">

AI Restaurant Copilot

</h2>

<p className="text-sm text-white/40">

Ask anything about your restaurant.

</p>

</div>

</div>

<div className="max-h-80 overflow-y-auto rounded-xl bg-slate-800 p-4">

  {messages.length === 0 && (
    <div className="py-4 text-sm text-white/40">
      Start a conversation...
    </div>
  )}

  {messages.map((message) => (
    <div
      key={message.id}
      className={`mb-4 ${
        message.role === "assistant"
          ? "text-cyan-300"
          : "text-white"
      }`}
    >
      {message.text}
    </div>
  ))}

</div>

{listening && (
<div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400">
<div className="h-3 w-3 animate-pulse rounded-full bg-red-500"/>
Listening...
</div>
)}

{speaking && (
<div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-emerald-400">
<div className="h-3 w-3 animate-pulse rounded-full bg-emerald-400"/>
AI is speaking...
</div>
)}

<div className="mb-2 flex items-center gap-2 text-xs text-white/40">
  <div
    className={`
      h-2
      w-2
      rounded-full
      ${
        listening
          ? "bg-red-500 animate-pulse"
          : speaking
          ? "bg-emerald-400 animate-pulse"
          : "bg-cyan-400"
      }
    `}
  />
  {wakeMode
  ? "Waiting for 'Hey Restaurant'"
  : "Continuous Voice Mode"
  }
  </div>

<div className="mb-4 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300">
Say
<strong className="mx-1">
"Hey Restaurant"
</strong>
to activate voice assistant.
</div>

{memory && (
<div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
<div className="mb-2 text-sm font-semibold text-cyan-300">
Conversation Memory
</div>
<div className="mt-4">
<div className="text-xs text-white/40">
Conversation Context
</div>
<div className="mt-2 rounded-lg bg-slate-900 p-3 text-sm text-cyan-300">
{memory?.topic || "General"}
</div>
</div>
<div className="text-xs text-white/40">
Last Question
</div>
<div className="mb-3 text-white">
{memory.lastQuestion}
</div>
<div className="text-xs text-white/40">
Last AI Response
</div>
<div className="text-white">
{memory.lastAnswer}
</div>
</div>
)}

<div className="mt-5 flex gap-3">
<input
value={input}
onChange={event=>
setInput(event.target.value)
}
placeholder="Ask anything about reservations, revenue, growth, forecast..."
className="flex-1 rounded-lg border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none"
/>
<button
onClick={()=>{
if(!input.trim())return;
sendMessage(input);
setInput("");
}}

className="rounded-lg bg-cyan-500 px-5"
>
{loading
?<Loader2 className="h-5 w-5 animate-spin"/>
:<Send className="h-5 w-5"/>
}
</button>
{supported && (
<button
type="button"
onClick={() => {
if(
!loading &&
!listening
){
startListening();
}
}}
className={`
rounded-lg
border
px-3
py-2
transition
${
listening
? "border-red-500 bg-red-500/20 text-red-400"
: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
}
`}
>
<Mic className="h-5 w-5" />
</button>
)}

</div>

{suggestions.length > 0 && (
<div className="mt-4 flex flex-wrap gap-2">
{suggestions.map(item => (
<button
key={item}
onClick={() => setInput(item)}
className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300 transition hover:bg-cyan-500/20"
>
{item}
</button>
))}
</div>
)}

</div>

);

}

export default memo(

AIRestaurantCopilot

);