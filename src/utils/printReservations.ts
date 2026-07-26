// ==========================================
// Imports
// ==========================================

import type { ReservationData } from "../types/reservation";

// ==========================================
// Print Reservations
// ==========================================

export function printReservations(
  reservations: ReservationData[]
) {
  const html = `
  <html>
  <head>
      <title>Reservations</title>

      <style>
          body{
              font-family:Arial;
              padding:30px;
          }

          table{
              width:100%;
              border-collapse:collapse;
          }

          th,td{
              border:1px solid #ccc;
              padding:8px;
              text-align:left;
          }

          th{
              background:#f4f4f4;
          }
      </style>

  </head>

  <body>

  <h2>Reservations</h2>

  <table>

  <thead>

  <tr>
      <th>Name</th>
      <th>Phone</th>
      <th>Email</th>
      <th>Date</th>
      <th>Time</th>
      <th>Guests</th>
      <th>Status</th>
  </tr>

  </thead>

  <tbody>

  ${reservations
    .map(
      (reservation) => `
      <tr>
          <td>${reservation.fullName}</td>
          <td>${reservation.phoneNumber}</td>
          <td>${reservation.email}</td>
          <td>${reservation.date}</td>
          <td>${reservation.time}</td>
          <td>${reservation.guests}</td>
          <td>${reservation.status}</td>
      </tr>
      `
    )
    .join("")}

  </tbody>

  </table>

  </body>

  </html>
  `;

  const printWindow = window.open("", "_blank");

  if (!printWindow) return;

  printWindow.document.write(html);

  printWindow.document.close();

  printWindow.focus();

  printWindow.print();

  printWindow.close();
}