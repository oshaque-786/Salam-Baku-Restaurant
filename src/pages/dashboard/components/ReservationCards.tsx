import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  Users,
  Loader2,
  AlertCircle,
} from "lucide-react";

import type { ReservationData } from "../types";

interface ReservationCardsProps {
  isLoadingData: boolean;
  dataError: string;

  currentReservations: ReservationData[];

  updateReservationStatus: (
    id: string,
    status: "confirmed" | "cancelled"
  ) => void;

  deleteReservation: (
    id: string
  ) => void;
}

export default function ReservationCards({
  isLoadingData,
  dataError,
  currentReservations,
  updateReservationStatus,
  deleteReservation,
}: ReservationCardsProps) {
  if (isLoadingData) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-white/50 border border-white/10 rounded-xl bg-white/5">

        <Loader2 className="w-8 h-8 animate-spin mb-4 text-brand-neon" />

        <p>Loading reservations...</p>

      </div>
    );
  }

  if (dataError) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300">

        <h3 className="font-bold flex items-center gap-2 mb-2">

          <AlertCircle className="w-5 h-5" />

          Permission Denied

        </h3>

        <p>{dataError}</p>

      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {currentReservations.map((res) => (

        <motion.div
          key={res.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg hover:border-brand-neon/40 transition"
        >

          <div className="flex justify-between items-start mb-5">

            <div>

              <h3 className="text-xl font-bold text-white">
                {res.fullName}
              </h3>

              <p className="text-brand-neon text-sm">
                {res.phoneNumber}
              </p>

              <p className="text-white/50 text-sm">
                {res.email}
              </p>

            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase
              ${
                res.status === "confirmed"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : res.status === "cancelled"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
              }`}
            >
              {res.status}
            </span>

          </div>

          <div className="space-y-3">

            <div className="flex items-center gap-3 text-white/70">

              <Calendar className="w-4 h-4" />

              <span>{res.date}</span>

            </div>

            <div className="flex items-center gap-3 text-white/70">

              <Clock className="w-4 h-4" />

              <span>{res.time}</span>

            </div>

            <div className="flex items-center gap-3 text-white/70">

              <Users className="w-4 h-4" />

              <span>{res.guests} Guests</span>

            </div>

            {res.specialRequests && (

              <div className="mt-3 rounded-lg bg-white/5 p-3">

                <p className="text-xs text-white/40 mb-1">

                  Special Requests

                </p>

                <p className="text-white/80 text-sm">

                  {res.specialRequests}

                </p>

              </div>

            )}

          </div>

          <div className="grid grid-cols-3 gap-2 mt-6">

            <button
              disabled={res.status === "confirmed"}
              onClick={() =>
                updateReservationStatus(
                  res.id,
                  "confirmed"
                )
              }
              className="py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white text-sm font-medium transition"
            >
              Confirm
            </button>

            <button
              disabled={res.status === "cancelled"}
              onClick={() =>
                updateReservationStatus(
                  res.id,
                  "cancelled"
                )
              }
              className="py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 disabled:opacity-40 text-white text-sm font-medium transition"
            >
              Cancel
            </button>

            <button
              onClick={() =>
                deleteReservation(res.id)
              }
              className="py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition"
            >
              Delete
            </button>

          </div>

        </motion.div>

      ))}

    </div>
  );
}