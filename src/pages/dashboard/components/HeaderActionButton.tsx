import { memo } from "react";
import type { LucideIcon } from "lucide-react";

interface HeaderActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger" | "secondary";
}

function HeaderActionButton({
  icon: Icon,
  label,
  onClick,
  disabled = false,
  variant = "secondary",
}: HeaderActionButtonProps) {
  const styles = {
    primary:
      "bg-brand-neon text-brand-dark hover:opacity-90",

    secondary:
      "bg-white/10 text-white hover:bg-white/20",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50 ${styles[variant]}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

export default memo(HeaderActionButton);