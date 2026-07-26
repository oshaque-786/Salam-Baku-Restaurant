import { useMemo } from "react";
import type { ReservationData } from "../types/reservation";

export type FilterPreset =
  | "all"
  | "today"
  | "pending"
  | "confirmed"
  | "cancelled"
  | "weekend"
  | "large";

export function useFilterPresets(
  reservations: ReservationData[],
  preset: FilterPreset
) {

  return useMemo(() => {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    switch (preset) {

      case "today":

        return reservations.filter(
          r => r.date === today
        );

      case "pending":

        return reservations.filter(
          r => r.status === "pending"
        );

      case "confirmed":

        return reservations.filter(
          r => r.status === "confirmed"
        );

      case "cancelled":

        return reservations.filter(
          r => r.status === "cancelled"
        );

      case "large":

        return reservations.filter(
          r => r.guests >= 6
        );

      case "weekend":

        return reservations.filter(r => {

          const day =
            new Date(r.date).getDay();

          return (
            day === 0 ||
            day === 6
          );

        });

      default:

        return reservations;

    }

  }, [
    reservations,
    preset,
  ]);

}