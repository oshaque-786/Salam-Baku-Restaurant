import { memo } from "react";
import { LayoutGrid, Table2 } from "lucide-react";

interface ViewModeToggleProps {
  viewMode: "table" | "cards";
  setViewMode: (mode: "table" | "cards") => void;
}

function ViewModeToggle({
  viewMode,
  setViewMode,
}: ViewModeToggleProps) {
  return (
    <div className="flex justify-end mb-6">
      <div className="flex overflow-hidden rounded-xl border border-white/10">

        <button
          type="button"
          onClick={() => setViewMode("cards")}
          className={`flex items-center gap-2 px-4 py-2 transition-colors ${
            viewMode === "cards"
              ? "bg-brand-neon text-brand-dark font-semibold"
              : "bg-white/5 text-white hover:bg-white/10"
          }`}
        >
          <LayoutGrid className="h-4 w-4" />
          Cards
        </button>

        <button
          type="button"
          onClick={() => setViewMode("table")}
          className={`flex items-center gap-2 px-4 py-2 transition-colors ${
            viewMode === "table"
              ? "bg-brand-neon text-brand-dark font-semibold"
              : "bg-white/5 text-white hover:bg-white/10"
          }`}
        >
          <Table2 className="h-4 w-4" />
          Table
        </button>

      </div>
    </div>
  );
}

export default memo(ViewModeToggle);