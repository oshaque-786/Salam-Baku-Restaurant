import React, { memo } from "react";
import { ArrowLeft } from "lucide-react";
import HeaderActionButton from "./HeaderActionButton";

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

function DashboardHeader({
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

        <HeaderActionButton
          icon={ArrowLeft}
          label="Back"
          onClick={onClose}
        />

        <div>
          <h1 className="text-3xl font-bold text-white">
            Reservation Dashboard
          </h1>

         <p className="text-white/60 mt-1">
            Logged in as {userEmail}
          </p>
        </div>

      </div>

    </div>
  );
  }

  export default memo(DashboardHeader);