import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import type { ReservationData } from "../types/reservation";

interface Props {
  reservations: ReservationData[];
  addNotification: (
    title: string,
    message: string
  ) => void;
}

export function useRealtimeNotifications({
  reservations,
  addNotification,
}: Props) {
  const previousIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (previousIds.current.size === 0) {
      previousIds.current = new Set(
        reservations.map(r => r.id)
      );
      return;
    }

    reservations.forEach(reservation => {
      if (!previousIds.current.has(reservation.id)) {
        previousIds.current.add(reservation.id);

        addNotification(
          "New Reservation",
          `${reservation.fullName} booked a table`
        );

        toast.success(
          `${reservation.fullName} booked a table`
        );
      }
    });
  }, [reservations, addNotification]);
}