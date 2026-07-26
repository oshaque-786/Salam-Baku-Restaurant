import { memo } from "react";
import { X } from "lucide-react";

interface Props {

  searchTerm: string;

  statusFilter: string;

  dateFilter: string;

  fromDate: string;

  toDate: string;

  filterPreset: string;

  setSearchTerm: (v: string) => void;

  setStatusFilter: (
    v:
      | "all"
      | "pending"
      | "confirmed"
      | "cancelled"
  ) => void;

  setDateFilter: (v: string) => void;

  setFromDate: (v: string) => void;

  setToDate: (v: string) => void;

  setFilterPreset: (
    v:
      | "all"
      | "today"
      | "pending"
      | "confirmed"
      | "cancelled"
      | "weekend"
      | "large"
  ) => void;

}

function Chip({

  label,

  onRemove,

}: {

  label: string;

  onRemove: () => void;

}) {

  return (

    <div className="flex items-center gap-2 rounded-full bg-cyan-600 px-3 py-1 text-sm text-white">

      {label}

      <button onClick={onRemove}>

        <X size={14} />

      </button>

    </div>

  );

}

function ActiveFilterChips(props: Props) {

  const hasFilters =

    props.searchTerm ||

    props.statusFilter !== "all" ||

    props.dateFilter ||

    props.fromDate ||

    props.toDate ||

    props.filterPreset !== "all";

  if (!hasFilters) return null;

  return (

    <div className="mb-6 flex flex-wrap gap-2">

      {props.searchTerm && (

        <Chip

          label={`Search: ${props.searchTerm}`}

          onRemove={() =>

            props.setSearchTerm("")

          }

        />

      )}

      {props.statusFilter !== "all" && (

        <Chip

          label={`Status: ${props.statusFilter}`}

          onRemove={() =>

            props.setStatusFilter("all")

          }

        />

      )}

      {props.dateFilter && (

        <Chip

          label={`Date: ${props.dateFilter}`}

          onRemove={() =>

            props.setDateFilter("")

          }

        />

      )}

      {props.fromDate && (

        <Chip

          label={`From: ${props.fromDate}`}

          onRemove={() =>

            props.setFromDate("")

          }

        />

      )}

      {props.toDate && (

        <Chip

          label={`To: ${props.toDate}`}

          onRemove={() =>

            props.setToDate("")

          }

        />

      )}

      {props.filterPreset !== "all" && (

        <Chip

          label={`Preset: ${props.filterPreset}`}

          onRemove={() =>

            props.setFilterPreset("all")

          }

        />

      )}

      <button

        onClick={() => {

          props.setSearchTerm("");

          props.setStatusFilter("all");

          props.setDateFilter("");

          props.setFromDate("");

          props.setToDate("");

          props.setFilterPreset("all");

        }}

        className="rounded-full border border-red-500 px-4 py-1 text-sm text-red-400 hover:bg-red-600 hover:text-white transition"

      >

        Clear All

      </button>

    </div>

  );

}

export default memo(ActiveFilterChips);