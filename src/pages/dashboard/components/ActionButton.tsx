import { memo } from "react";
import type { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger";
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
  disabled = false,
  variant = "primary",
}: ActionButtonProps) {
  const colors =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : "bg-brand-neon text-brand-dark hover:opacity-90";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition disabled:opacity-50 ${colors}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

export default memo(ActionButton);