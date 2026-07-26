import { memo } from "react";
import { X } from "lucide-react";
import type { ReservationData } from "../../../types/reservation";

interface ReservationDetailsModalProps {
  open: boolean;
  reservation: ReservationData | null;
  onClose: () => void;
}

interface DetailRowProps {
  label: string;
  value: string | number;
}

function DetailRow({
  label,
  value,
}: DetailRowProps) {
  return (
    <div className="grid grid-cols-3 gap-4 border-b border-white/5 py-3">
      <span className="text-sm text-white/60">
        {label}
      </span>

      <span className="col-span-2 break-words text-white font-medium">
        {value}
      </span>
    </div>
  );
}

function ReservationDetailsModal({
  open,
  reservation,
  onClose,
}: ReservationDetailsModalProps) {
  if (!open || !reservation) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-brand-dark shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Reservation Details
            </h2>

            <p className="mt-1 text-sm text-white/60">
              Complete reservation information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-1 p-6">

          <DetailRow
            label="Reservation ID"
            value={reservation.id}
          />

          <DetailRow
            label="Customer Name"
            value={reservation.fullName}
          />

          <DetailRow
            label="Phone Number"
            value={reservation.phoneNumber}
          />

          <DetailRow
            label="Email"
            value={reservation.email}
          />

          <DetailRow
            label="Guests"
            value={reservation.guests}
          />

          <DetailRow
            label="Date"
            value={reservation.date}
          />

          <DetailRow
            label="Time"
            value={reservation.time}
          />

          <DetailRow
            label="Status"
            value={reservation.status}
          />

          <DetailRow
            label="Special Requests"
            value={
              reservation.specialRequests?.trim() ||
              "None"
            }
          />

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t border-white/10 px-6 py-5">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-brand-neon px-6 py-3 font-semibold text-brand-dark transition hover:opacity-90"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default memo(
  ReservationDetailsModal
);