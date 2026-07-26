import React, { memo } from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import PaginationButton from "./PaginationButton";

interface DashboardPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function DashboardPagination({
  currentPage,
  totalPages,
  onPageChange,
}: DashboardPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10"
    >
      <div className="text-white/60 text-sm">
        Showing page{" "}
        <span className="text-brand-neon font-semibold">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="text-brand-neon font-semibold">
          {totalPages}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <PaginationButton
          label="Previous"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(Math.max(currentPage - 1, 1))
          }
        />

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg font-semibold transition ${
              currentPage === page
                ? "bg-brand-neon text-brand-dark"
                : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
            }`}
          >
            {page}
          </button>
        ))}

        <PaginationButton
          label="Next"
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(
              Math.min(currentPage + 1, totalPages)
            )
          }
        />
      </div>
    </m.div>
  );
}

export default memo(DashboardPagination);