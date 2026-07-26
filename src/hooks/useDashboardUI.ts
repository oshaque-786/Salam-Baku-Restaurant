import type { ReservationData } from "../types/reservation";
import {
  useEffect,
  useState,
} from "react";

type StatusFilter =
  | "all"
  | "pending"
  | "confirmed"
  | "cancelled";

export function useDashboardUI() {
  const [searchTerm, setSearchTerm] =
  useState(() =>
    localStorage.getItem(
      "dashboard-search"
    ) ?? ""
  );

  const [statusFilter, setStatusFilter] =
  useState<
    "all" | "pending" | "confirmed" | "cancelled"
  >(() => {

    const saved =
      localStorage.getItem(
        "dashboard-status"
      );

    if (
      saved === "pending" ||
      saved === "confirmed" ||
      saved === "cancelled"
    ) {
      return saved;
    }

    return "all";

  });

  const [filterPreset, setFilterPreset] =
  useState<
    | "all"
    | "today"
    | "pending"
    | "confirmed"
    | "cancelled"
    | "weekend"
    | "large"
  >("all");

  const [dateFilter, setDateFilter] =
  useState(() =>
    localStorage.getItem(
      "dashboard-date"
    ) ?? ""
  );

  const [viewMode, setViewMode] =
  useState<"cards" | "table">(() => {

    const saved =
      localStorage.getItem(
        "dashboard-view"
      );

    return saved === "cards"
      ? "cards"
      : "table";

  });

const [fromDate, setFromDate] = useState("");

const [toDate, setToDate] = useState("");

  // ==========================================
  // Reservation Modal
  // ==========================================

  const [
    selectedReservation,
    setSelectedReservation,
  ] = useState<ReservationData | null>(null);

  const [
    showReservationModal,
    setShowReservationModal,
  ] = useState(false);

  useEffect(() => {

    localStorage.setItem(
      "dashboard-search",
      searchTerm
    );

  }, [searchTerm]);

  useEffect(() => {

    localStorage.setItem(
      "dashboard-status",
      statusFilter
    );

  }, [statusFilter]);

  useEffect(() => {

    localStorage.setItem(
      "dashboard-date",
      dateFilter
    );

  }, [dateFilter]);

  useEffect(() => {

    localStorage.setItem(
      "dashboard-view",
      viewMode
    );

  }, [viewMode]);

  return {
    searchTerm,
    setSearchTerm,

    statusFilter,
    setStatusFilter,

    dateFilter,
    setDateFilter,

    viewMode,
    setViewMode,

    filterPreset,
    setFilterPreset,

    fromDate,
    setFromDate,

    toDate,
    setToDate,

    selectedReservation,
    setSelectedReservation,

    showReservationModal,
    setShowReservationModal,
  };
}