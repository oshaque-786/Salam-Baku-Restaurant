// ==========================================
// Imports
// ==========================================

import type { ReservationData } from "../types/reservation";

// ==========================================
// Export Reservations CSV
// ==========================================

export function exportReservationsCSV(
  reservations: ReservationData[]
) {
  if (!reservations.length) return;

  const headers = [
    "Name",
    "Phone",
    "Email",
    "Date",
    "Time",
    "Guests",
    "Status",
  ];

  const rows = reservations.map((reservation) => [
    reservation.fullName,
    reservation.phoneNumber,
    reservation.email,
    reservation.date,
    reservation.time,
    reservation.guests,
    reservation.status,
  ]);

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row
        .map((value) => `"${value}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `reservations-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}