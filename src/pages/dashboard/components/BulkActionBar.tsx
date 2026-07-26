import React, { memo } from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import {
  CheckCircle,
  XCircle,
  Trash2,
  X,
} from "lucide-react";

interface BulkActionBarProps {
  selectedCount: number;

  onConfirm: () => void;

  onCancel: () => void;

  onDelete: () => void;

  onClear: () => void;
}

function BulkActionBar({
  selectedCount,
  onConfirm,
  onCancel,
  onDelete,
  onClear,
}: BulkActionBarProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        className="sticky top-4 z-50 mb-6 rounded-2xl border border-cyan-500/20 bg-slate-900/95 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">

          <div className="text-white font-semibold">
            {selectedCount} reservation(s) selected
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={onConfirm}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
            >
              <CheckCircle className="w-4 h-4" />
              Confirm
            </button>

            <button
              onClick={onCancel}
              className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 transition"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>

            <button
              onClick={onDelete}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>

            <button
              onClick={onClear}
              className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-white hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
              Clear
            </button>

          </div>

        </div>
      </m.div>
    </LazyMotion>
  );
}

export default memo(BulkActionBar);