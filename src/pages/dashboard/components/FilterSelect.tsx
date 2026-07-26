import { memo } from "react";

interface Option {
  label: string;
  value: string;
}

interface FilterSelectProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

function FilterSelect({
  value,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-brand-neon focus:outline-none"
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default memo(FilterSelect);