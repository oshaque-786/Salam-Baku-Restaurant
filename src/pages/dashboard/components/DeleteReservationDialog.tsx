import { memo } from "react";
import type { ReservationData } from "../../../types/reservation";

interface DeleteReservationDialogProps {
  open: boolean;
  reservation: ReservationData | null;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteReservationDialog({
  open,
  reservation,
  onClose,
  onConfirm,
}: DeleteReservationDialogProps) {
  if (!open || !reservation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl bg-brand-dark border border-white/10 p-6 shadow-2xl">

        <h2 className="mb-4 text-xl font-bold text-white">
          Delete Reservation
        </h2>

        <p className="text-gray-300">
          Are you sure you want to delete reservation of
        </p>

        <p className="mt-2 font-semibold text-brand-neon">
          {reservation.fullName}
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-white/10 px-5 py-2 text-white transition hover:bg-white/20"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default memo(DeleteReservationDialog);