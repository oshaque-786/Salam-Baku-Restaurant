import { memo } from "react";

type FilterPreset =
  | "all"
  | "today"
  | "pending"
  | "confirmed"
  | "cancelled"
  | "weekend"
  | "large";

const presets: {
  key: FilterPreset;
  label: string;
}[] = [
  {
    key: "all",
    label: "All",
  },
  {
    key: "today",
    label: "Today",
  },
  {
    key: "pending",
    label: "Pending",
  },
  {
    key: "confirmed",
    label: "Confirmed",
  },
  {
    key: "cancelled",
    label: "Cancelled",
  },
  {
    key: "weekend",
    label: "Weekend",
  },
  {
    key: "large",
    label: "Large Groups",
  },
];

interface Props {
  filterPreset: string;

  setFilterPreset: (
    value:
      | "all"
      | "pending"
      | "confirmed"
      | "cancelled"
      | "today"
      | "weekend"
      | "large"
  ) => void;
}

function FilterPresets({

filterPreset,

setFilterPreset,

}:Props){

return(

<div className="flex flex-wrap gap-2 mb-5">

{presets.map(p=>(

<button

key={p.key}

onClick={()=>setFilterPreset(p.key)}

className={`

px-4

py-2

rounded-xl

text-sm

transition

${
filterPreset===p.key

?

"bg-cyan-500 text-white"

:

"bg-slate-800 text-white/70 hover:bg-slate-700"

}

`}

>

{p.label}

</button>

))}

</div>

);

}

export default memo(FilterPresets);