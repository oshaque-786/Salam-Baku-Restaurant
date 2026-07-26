import React, { memo } from "react";

import {
  Loader2,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Download,
  Printer,
  LogOut,
} from "lucide-react";

import HeaderActionButton from "./HeaderActionButton";

interface DashboardActionsProps {
  reservationEnabled: boolean;
  isUpdatingSettings: boolean;

  toggleReservationStatus: () => void;
  fetchReservations: () => void;
  exportReservationsCSV: () => void;
  printReservations: () => void;
  handleLogout: () => void;
}

function DashboardActions({
  reservationEnabled,
  isUpdatingSettings,
  toggleReservationStatus,
  fetchReservations,
  exportReservationsCSV,
  printReservations,
  handleLogout,
}: DashboardActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">

      <button
        onClick={toggleReservationStatus}
        disabled={isUpdatingSettings}
        className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
          reservationEnabled
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-red-600 hover:bg-red-700 text-white"
        }`}
      >
        {isUpdatingSettings ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : reservationEnabled ? (
          <ToggleRight className="w-5 h-5" />
        ) : (
          <ToggleLeft className="w-5 h-5" />
        )}

        {reservationEnabled
          ? "Reservations Enabled"
          : "Reservations Disabled"}
      </button>

      <HeaderActionButton
        icon={RefreshCw}
        label="Refresh"
        onClick={fetchReservations}
      />

      <HeaderActionButton
        icon={Download}
        label="Export CSV"
        onClick={exportReservationsCSV}
      />

      <HeaderActionButton
        icon={Printer}
        label="Print"
        onClick={printReservations}
      />

      <HeaderActionButton
        icon={LogOut}
        label="Logout"
        onClick={handleLogout}
        variant="danger"
      />

    </div>
  );
}

export default memo(DashboardActions);