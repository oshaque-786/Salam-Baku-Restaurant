import { memo } from "react";

interface Props {
  setFromDate: (v: string) => void;
  setToDate: (v: string) => void;
  onSaveView: () => void;
}

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function QuickDateFilters({
  setFromDate,
  setToDate,
  onSaveView,
}: Props) {

  const today = new Date();

  const applyToday = () => {
    const d = formatDate(today);
    setFromDate(d);
    setToDate(d);
  };

  const applyLast7Days = () => {
    const start = new Date();
    start.setDate(today.getDate() - 6);

    setFromDate(formatDate(start));
    setToDate(formatDate(today));
  };

  const applyLast30Days = () => {
    const start = new Date();
    start.setDate(today.getDate() - 29);

    setFromDate(formatDate(start));
    setToDate(formatDate(today));
  };

  const applyThisMonth = () => {
    const start = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    setFromDate(formatDate(start));
    setToDate(formatDate(today));
  };

  const clear = () => {
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="flex flex-wrap gap-2">

      <button
        onClick={applyToday}
        className="rounded-lg bg-cyan-600 px-3 py-2 text-white hover:bg-cyan-700"
      >
        Today
      </button>

      <button
        onClick={applyLast7Days}
        className="rounded-lg bg-slate-700 px-3 py-2 text-white hover:bg-slate-600"
      >
        Last 7 Days
      </button>

      <button
        onClick={applyLast30Days}
        className="rounded-lg bg-slate-700 px-3 py-2 text-white hover:bg-slate-600"
      >
        Last 30 Days
      </button>

      <button
        onClick={applyThisMonth}
        className="rounded-lg bg-slate-700 px-3 py-2 text-white hover:bg-slate-600"
      >
        This Month
      </button>

      <button
        onClick={clear}
        className="rounded-lg border border-white/10 px-3 py-2 text-white hover:bg-white/10"
      >
        Clear
      </button>

      <button
        onClick={onSaveView}
        className="rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700"
      >
      Save View
      </button>

    </div>
  );
}

export default memo(QuickDateFilters);