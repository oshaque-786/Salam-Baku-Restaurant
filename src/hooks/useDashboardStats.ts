import { useMemo } from "react";
import type { ReservationData } from "../types/reservation";

export function useDashboardStats(
  reservations: ReservationData[]
) {
  return useMemo(() => {
    const totalReservations =
      reservations.length;

    const pendingReservations =
      reservations.filter(
        (r) => r.status === "pending"
      ).length;

    const confirmedReservations =
      reservations.filter(
        (r) => r.status === "confirmed"
      ).length;

    const cancelledReservations =
      reservations.filter(
        (r) => r.status === "cancelled"
      ).length;

    return {
      totalReservations,
      pendingReservations,
      confirmedReservations,
      cancelledReservations,
    };
  }, [reservations]);
}