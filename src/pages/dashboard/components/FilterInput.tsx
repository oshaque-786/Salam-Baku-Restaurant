import { memo } from "react";

interface FilterInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

function FilterInput({
  value,
  placeholder,
  onChange,
}: FilterInputProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-brand-neon focus:outline-none"
    />
  );
}

export default memo(FilterInput);