import {
  ArrowLeft,
  LogOut,
  Loader2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

interface DashboardHeaderProps {
  userEmail: string;
  reservationEnabled: boolean;
  isUpdatingSettings: boolean;

  onClose: () => void;
  onLogout: () => void;

  onToggleReservation: () => void;

  onRefresh: () => void;

  onExportCSV: () => void;

  onPrint: () => void;
}

export default function DashboardHeader({
  userEmail,
  reservationEnabled,
  isUpdatingSettings,

  onClose,
  onLogout,
  onToggleReservation,

  onRefresh,
  onExportCSV,
  onPrint,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">

      <div className="flex items-center gap-4">

        <button
          onClick={onClose}
          className="p-2 rounded-full border border-white/10 hover:bg-white/5 text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-white">
            Reservation Dashboard
          </h1>

          <p className="text-white/60 mt-1">
            Logged in as {userEmail}
          </p>
        </div>

      </div>

      <div className="flex flex-wrap gap-3">

        <button
          onClick={onToggleReservation}
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
          onClick={onRefresh}
          className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white"
        >
          Refresh List
        </button>

        <button
          onClick={onExportCSV}
          className="px-4 py-2 rounded-lg bg-brand-neon text-brand-dark font-semibold"
        >
          Export CSV
        </button>

        <button
          onClick={onPrint}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Print Report
        </button>

        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500/10 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>

      </div>

    </div>
  );
}