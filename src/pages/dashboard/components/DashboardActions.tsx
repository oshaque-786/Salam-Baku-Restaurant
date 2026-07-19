import { Loader2, ToggleLeft, ToggleRight, LogOut } from "lucide-react";

interface DashboardActionsProps {
  reservationEnabled: boolean;
  isUpdatingSettings: boolean;

  toggleReservationStatus: () => void;
  fetchReservations: () => void;
  exportReservationsCSV: () => void;
  printReservations: () => void;
  handleLogout: () => void;
}

export default function DashboardActions({
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

      <button
        onClick={fetchReservations}
        className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition"
      >
        Refresh List
      </button>

      <button
        onClick={exportReservationsCSV}
        className="px-4 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold hover:bg-white transition"
      >
        Export CSV
      </button>

      <button
        onClick={printReservations}
        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
      >
        Print Report
      </button>

      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>

    </div>
  );
}