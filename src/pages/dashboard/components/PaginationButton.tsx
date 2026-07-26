import { memo } from "react";
import type { LucideIcon } from "lucide-react";

interface PaginationButtonProps {
  icon?: LucideIcon;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

function PaginationButton({
  icon: Icon,
  label,
  disabled = false,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="
        flex items-center gap-2
        rounded-lg
        border border-white/10
        bg-white/5
        px-4 py-2
        text-white
        transition
        hover:bg-white/10
        disabled:opacity-40
      "
    >
      {Icon && <Icon className="h-4 w-4" />}

      {label}
    </button>
  );
}

export default memo(PaginationButton);