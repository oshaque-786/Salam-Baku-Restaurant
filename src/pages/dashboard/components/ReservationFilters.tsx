import React, { memo } from "react";
import FilterInput from "./FilterInput";
import FilterSelect from "./FilterSelect";
import FilterDate from "./FilterDate";

interface ReservationFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  statusFilter: "all" | "pending" | "confirmed" | "cancelled";
  setStatusFilter: (
    value: "all" | "pending" | "confirmed" | "cancelled"
  ) => void;

  dateFilter: string;
  setDateFilter: (value: string) => void;

  fromDate: string;
  setFromDate: (v: string) => void;
  toDate: string;
  setToDate: (v: string) => void;
}

function ReservationFilters({
  searchTerm,
  setSearchTerm,

  statusFilter,
  setStatusFilter,

  dateFilter,
  setDateFilter,

  fromDate,
  setFromDate,

  toDate,
  setToDate,

}: ReservationFiltersProps) {

  return (
    <div className="grid lg:grid-cols-3 gap-4 mb-8">
      {/* Search */}
      <FilterInput
        value={searchTerm}
        placeholder="Search by Name, Email or Phone..."
        onChange={setSearchTerm}
      />

      {/* Status */}
      <FilterSelect
        value={statusFilter}
        onChange={(value) =>
          setStatusFilter(
            value as
              | "all"
              | "pending"
              | "confirmed"
              | "cancelled"
          )
        }
        options={[
          { label: "All Status", value: "all" },
          { label: "Pending", value: "pending" },
          { label: "Confirmed", value: "confirmed" },
          { label: "Cancelled", value: "cancelled" },
        ]}
      />

      {/* Date */}
      <FilterDate
        value={dateFilter}
        onChange={setDateFilter}
      />
  <div className="flex gap-3">

    <input
      type="date"
      value={fromDate}
      onChange={(e) =>
        setFromDate(e.target.value)
      }
      className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white"
    />

    <input
      type="date"
      value={toDate}
      onChange={(e) =>
        setToDate(e.target.value)
      }
      className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white"
    />
   </div>
  </div>
 );
}

export default memo(ReservationFilters);