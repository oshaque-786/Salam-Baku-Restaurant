import { motion } from "motion/react";

interface DashboardPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function DashboardPagination({
  currentPage,
  totalPages,
  onPageChange,
}: DashboardPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <motion.div
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
        <button
          onClick={() =>
            onPageChange(Math.max(currentPage - 1, 1))
          }
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>

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

        <button
          onClick={() =>
            onPageChange(
              Math.min(currentPage + 1, totalPages)
            )
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}