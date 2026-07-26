import { memo } from "react";

interface FilterDateProps {
  value: string;
  onChange: (value: string) => void;
}

function FilterDate({
  value,
  onChange,
}: FilterDateProps) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-brand-neon focus:outline-none"
    />
  );
}

export default memo(FilterDate);