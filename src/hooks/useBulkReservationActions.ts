import {
  deleteReservation,
  updateReservationStatus,
} from "../services/reservationService";

export function useBulkReservationActions() {
  async function bulkConfirm(ids: string[]) {
    await Promise.all(
      ids.map((id) =>
        updateReservationStatus(id, "confirmed")
      )
    );
  }

  async function bulkCancel(ids: string[]) {
    await Promise.all(
      ids.map((id) =>
        updateReservationStatus(id, "cancelled")
      )
    );
  }

  async function bulkDelete(ids: string[]) {
    await Promise.all(
      ids.map((id) =>
        deleteReservation(id)
      )
    );
  }

  return {
    bulkConfirm,
    bulkCancel,
    bulkDelete,
  };
}