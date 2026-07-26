import { memo } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle,
  XCircle,
  Trash2,
  X,
} from "lucide-react";

interface Props {
  count: number;

  onConfirm: () => void;

  onCancel: () => void;

  onDelete: () => void;

  onClear: () => void;
}

function BulkSelectionToolbar({
  count,
  onConfirm,
  onCancel,
  onDelete,
  onClear,
}: Props) {
  return (
    <AnimatePresence>

      {count > 0 && (

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="mb-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4"
        >

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div className="text-white font-semibold">
              {count} reservation(s) selected
            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={onConfirm}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
              >
                <CheckCircle size={18} />
                Confirm
              </button>

              <button
                onClick={onCancel}
                className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 transition"
              >
                <XCircle size={18} />
                Cancel
              </button>

              <button
                onClick={onDelete}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
              >
                <Trash2 size={18} />
                Delete
              </button>

              <button
                onClick={onClear}
                className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-white hover:bg-white/10 transition"
              >
                <X size={18} />
                Clear
              </button>

            </div>

          </div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}

export default memo(BulkSelectionToolbar);