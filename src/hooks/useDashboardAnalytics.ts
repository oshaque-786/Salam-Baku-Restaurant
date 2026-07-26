// ==========================================
// Imports
// ==========================================

import { useMemo } from "react";

import type { ReservationData } from "../types/reservation";

// ==========================================
// Interfaces
// ==========================================

export interface MonthlyAnalytics {
  month: string;
  reservations: number;
}

export interface BusyHour {
  time: string;
  reservations: number;
}

// ==========================================
// Hook
// ==========================================

export function useDashboardAnalytics(
  reservations: ReservationData[]
) {
  // ------------------------------------------
  // Monthly Analytics
  // ------------------------------------------

  const monthlyAnalytics = useMemo<
    MonthlyAnalytics[]
  >(() => {
    const monthlyMap = new Map<
      string,
      number
    >();

    reservations.forEach((reservation) => {
      const month =
        reservation.date.slice(0, 7);

      monthlyMap.set(
        month,
        (monthlyMap.get(month) ?? 0) + 1
      );
    });

    return Array.from(monthlyMap.entries()).map(
      ([month, reservations]) => ({
        month,
        reservations,
      })
    );
  }, [reservations]);

  // ------------------------------------------
  // Busy Hours
  // ------------------------------------------

  const busyHours = useMemo<
    BusyHour[]
  >(() => {
    const hourMap = new Map<
      string,
      number
    >();

    reservations.forEach((reservation) => {
      hourMap.set(
        reservation.time,
        (hourMap.get(reservation.time) ?? 0) +
          1
      );
    });

    return Array.from(hourMap.entries())
      .map(([time, reservations]) => ({
        time,
        reservations,
      }))
      .sort((a, b) =>
        a.time.localeCompare(b.time)
      );
  }, [reservations]);

  return {
    monthlyAnalytics,
    busyHours,
  };
}