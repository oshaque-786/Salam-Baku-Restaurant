// ==========================================
// Imports
// ==========================================

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { logger } from "../utils/logger";

import type { ReservationData } from "../types/reservation";

import {
  fetchReservations,
  updateReservationStatus,
  deleteReservation,
} from "../services/reservationService";

// ==========================================
// Hook
// ==========================================

export function useReservations() {
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataError, setDataError] = useState("");

  // ==========================================
  // Fetch Reservations
  // ==========================================

  const refreshReservations = useCallback(async () => {
    setIsLoadingData(true);
    setDataError("");

    try {
      const data = await fetchReservations();
      setReservations(data);
    } catch (error: any) {
      logger.error(error);
      setDataError(
        error?.message ?? "Unable to fetch reservations."
      );
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  // ==========================================
  // Update Status
  // ==========================================

  const changeReservationStatus = useCallback(
    async (
      id: string,
      status: "confirmed" | "cancelled"
    ) => {
      try {
        await updateReservationStatus(id, status);

        toast.success(`Reservation ${status}.`);

        await refreshReservations();
      } catch (error) {
        logger.error(error);

        toast.error(
          "Unable to update reservation."
        );
      }
    },
    [refreshReservations]
  );

  // ==========================================
  // Delete Reservation
  // ==========================================

  const removeReservation = useCallback(
    async (id: string) => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this reservation?"
      );

      if (!confirmed) return;

      try {
        await deleteReservation(id);

        toast.success(
          "Reservation deleted successfully."
        );

        await refreshReservations();
      } catch (error) {
        logger.error(error);

        toast.error(
          "Unable to delete reservation."
        );
      }
    },
    [refreshReservations]
  );

  return {
    reservations,
    isLoadingData,
    dataError,
    refreshReservations,
    changeReservationStatus,
    removeReservation,
  };
}