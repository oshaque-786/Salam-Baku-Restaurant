import { motion } from "motion/react";
import {
  ListOrdered,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface DashboardStatsProps {
  totalReservations: number;
  pendingReservations: number;
  confirmedReservations: number;
  cancelledReservations: number;
}

export default function DashboardStats({
  totalReservations,
  pendingReservations,
  confirmedReservations,
  cancelledReservations,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {/* Total */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/60 text-sm">
              Total Reservations
            </p>

            <h2 className="text-4xl font-bold text-white mt-2">
              {totalReservations}
            </h2>
          </div>

          <div className="w-14 h-14 rounded-full bg-brand-neon/20 flex items-center justify-center">
            <ListOrdered className="w-7 h-7 text-brand-neon" />
          </div>
        </div>
      </motion.div>

      {/* Pending */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-300 text-sm">
              Pending
            </p>

            <h2 className="text-4xl font-bold text-yellow-300 mt-2">
              {pendingReservations}
            </h2>
          </div>

          <Clock className="w-9 h-9 text-yellow-300" />
        </div>
      </motion.div>

      {/* Confirmed */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.10 }}
        className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-400 text-sm">
              Confirmed
            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-2">
              {confirmedReservations}
            </h2>
          </div>

          <CheckCircle className="w-9 h-9 text-green-400" />
        </div>
      </motion.div>

      {/* Cancelled */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-400 text-sm">
              Cancelled
            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-2">
              {cancelledReservations}
            </h2>
          </div>

          <XCircle className="w-9 h-9 text-red-400" />
        </div>
      </motion.div>
    </div>
  );
}