import React, { memo } from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import StatCard from "./StatCard";

import {
  ListOrdered,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface DashboardStatsProps {
  totalReservations: number;
  pendingReservations: number;
  confirmedReservations: number;
  cancelledReservations: number;
}

function DashboardStats({
  totalReservations,
  pendingReservations,
  confirmedReservations,
  cancelledReservations,
}: DashboardStatsProps) {

    return (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-8">

    <StatCard
      title="Total Reservations"
      value={totalReservations}
      icon={ListOrdered}
      textColor="text-white"
      bgColor="bg-white/5"
      borderColor="border-white/10"
    />

    <StatCard
      title="Pending"
      value={pendingReservations}
      icon={Clock}
      textColor="text-yellow-300"
      bgColor="bg-yellow-500/10"
      borderColor="border-yellow-500/30"
      delay={0.05}
    />

    <StatCard
      title="Confirmed"
      value={confirmedReservations}
      icon={CheckCircle}
      textColor="text-green-400"
      bgColor="bg-green-500/10"
      borderColor="border-green-500/30"
      delay={0.10}
    />

    <StatCard
      title="Cancelled"
      value={cancelledReservations}
      icon={XCircle}
      textColor="text-red-400"
      bgColor="bg-red-500/10"
      borderColor="border-red-500/30"
      delay={0.15}
    />

  </div>
  );
}

export default memo(DashboardStats);