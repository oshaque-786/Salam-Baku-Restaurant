import { memo } from "react";

function ReservationTableSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="h-16 border-b border-white/5 animate-pulse bg-white/5"
        />
      ))}
    </div>
  );
}

export default memo(ReservationTableSkeleton);