import type { ReservationData } from "../../../types/reservation";
import { STATUS_LABELS } from "../constants";
import { useColumnResize } from "../../../hooks/useColumnResize";

import React, {
  memo,
  useRef,
} from "react";

import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
} from "motion/react";

import {
  Calendar,
  Clock,
  Users,
  Trash2,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown,

  SearchX,
} from "lucide-react";

interface ReservationTableProps {
  reservations: ReservationData[];

  onConfirm: (id: string) => void;

  onCancel: (id: string) => void;

  onDelete: (id: string) => void;

  onView: (reservation: ReservationData) => void;

  selectedIds: string[];

  isSelected: (id: string) => boolean;

  toggleSelection: (id: string) => void;

  selectAll: (ids: string[]) => void;

  sortKey: string | null;

  direction: "asc" | "desc";

  toggleSort: (key: keyof ReservationData) => void;

  activeIndex: number;

  setActiveIndex: (index: number) => void;

  onRowContextMenu: (
    event: React.MouseEvent,
    reservation: ReservationData
  ) => void;
  }

function ReservationTable({
  reservations,
  onConfirm,
  onCancel,
  onDelete,
  onView,

  selectedIds,
  isSelected,
  toggleSelection,

  selectAll,

  activeIndex,

  setActiveIndex,

  sortKey,
  direction,
  toggleSort,

  onRowContextMenu,

}: ReservationTableProps) {

  const {
    widths,
    startResize,
    autoFit,
  } = useColumnResize();

  const guestRef =
    useRef<HTMLTableCellElement>(null);

  const phoneRef =
    useRef<HTMLTableCellElement>(null);

  const reservationRef =
    useRef<HTMLTableCellElement>(null);

  const guestsRef =
    useRef<HTMLTableCellElement>(null);

  const statusRef =
    useRef<HTMLTableCellElement>(null);


  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
            <tr className="text-left text-white/70 text-sm">

              <th className="w-14 px-5 py-4">
                <input
                  type="checkbox"
                  checked={
                    reservations.length > 0 &&
                    reservations.every((r) => isSelected(r.id))
                  }
                  onChange={() =>
                    selectAll(
                      reservations.map((r) => r.id)
                    )
                  }
                  className="h-5 w-5 accent-cyan-400 cursor-pointer"
                  title="Select All"
                />
              </th>

              <th
                ref={guestRef}
                style={{
                  width: widths.fullName,
                }}
                onDoubleClick={() =>
                    autoFit("fullName")
                  }
                onClick={() => toggleSort("fullName")}
                className="relative cursor-pointer px-5 py-4"
              >
                <div className="flex items-center gap-2">

                  Guest

                  {sortKey === "fullName" &&
                    (direction === "asc"
                      ? <ArrowUp size={15}/>
                      : <ArrowDown size={15}/>)}

                <div
                  onMouseDown={(event) => {

                    event.stopPropagation();

                    startResize(
                      "fullName",
                      event.clientX,
                      guestRef.current?.offsetWidth ?? 200
                    );

                  }}
                  className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-cyan-400"
                />

                </div>
              </th>

              <th
                ref={phoneRef}
                style={{
                  width: widths.phoneNumber,
                }}
                onDoubleClick={() =>
                  autoFit("phoneNumber")
                }
                className="relative px-5 py-4"
              >
                <button
                  onClick={() => toggleSort("phoneNumber")}
                  className="flex items-center gap-1 hover:text-cyan-400 transition"
                >
                  Phone
                </button>

              <div
                onMouseDown={(event) => {

                  event.stopPropagation();

                  startResize(
                    "phoneNumber",
                    event.clientX,
                    phoneRef.current?.offsetWidth ?? 180
                  );

                }}
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-cyan-400"
              />

              </th>

              <th
                ref={reservationRef}
                style={{
                  width: widths.date,
                }}
                onDoubleClick={() =>
                  autoFit("date")
                }
                className="relative px-5 py-4"
              >
                <button
                  onClick={() => toggleSort("date")}
                  className="flex items-center gap-1 hover:text-cyan-400 transition"
                >
                  Reservation
                </button>

                <div
                  onMouseDown={(event) => {

                    event.stopPropagation();

                    startResize(
                      "date",
                      event.clientX,
                      reservationRef.current?.offsetWidth ?? 220
                    );

                  }}
                  className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-cyan-400"
                />
              </th>

              <th
                ref={guestsRef}
                style={{
                  width: widths.guests,
                }}
                onDoubleClick={() =>
                  autoFit("guests")
                }
                className="relative px-5 py-4"
              >
                <button
                  onClick={() => toggleSort("guests")}
                  className="flex items-center gap-1 hover:text-cyan-400 transition"
                >
                  Guests
                </button>

                <div
                  onMouseDown={(event) => {

                    event.stopPropagation();

                    startResize(
                      "guests",
                      event.clientX,
                      guestsRef.current?.offsetWidth ?? 120
                    );

                  }}
                  className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-cyan-400"
                />
              </th>

              <th
                ref={statusRef}
                style={{
                  width: widths.status,
                }}
                onDoubleClick={() =>
                  autoFit("status")
                }
                className="relative px-5 py-4"
              >
                <button
                  onClick={() => toggleSort("status")}
                  className="flex items-center gap-1 hover:text-cyan-400 transition"
                >
                  Status
                </button>

                <div
                  onMouseDown={(event) => {

                    event.stopPropagation();

                    startResize(
                      "status",
                      event.clientX,
                      statusRef.current?.offsetWidth ?? 140
                    );

                  }}
                  className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-cyan-400"
                />
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence initial={false}>
            {reservations.map((reservation, index) => (
              <m.tr
                key={reservation.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.22,
                  ease: "easeOut",
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onContextMenu={(event) =>
                  onRowContextMenu(
                    event,
                    reservation
                  )
                }
                className={`border-b border-white/5 transition-colors
                  ${
                    activeIndex === index
                      ? "bg-cyan-500/10"
                      : "hover:bg-cyan-500/5"
                  }
  `              }
              >

                <td className="px-5 py-4">
                  <input
                    type="checkbox"
                    checked={isSelected(reservation.id)}
                    onChange={() => toggleSelection(reservation.id)}
                    className="h-5 w-5 accent-cyan-400"
                  />

                </td>

                <td className="px-5 py-4">
                  <div>
                    <h3 className="font-semibold text-white">
                      {reservation.fullName}
                    </h3>

                    <p className="text-white/50 text-sm">
                      {reservation.email}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4 text-white/80">
                  {reservation.phoneNumber}
                </td>

                <td className="px-5 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white/80">
                      <Calendar className="w-4 h-4 text-brand-neon" />

                      {reservation.date}
                    </div>

                    <div className="flex items-center gap-2 text-white/60">
                      <Clock className="w-4 h-4" />

                      {reservation.time}
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-white">
                    <Users className="w-4 h-4 text-brand-neon" />

                    {reservation.guests}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border
                    ${
                      reservation.status === "confirmed"
                        ? "bg-green-500/20 border-green-500/30 text-green-400"
                        : reservation.status === "cancelled"
                        ? "bg-red-500/20 border-red-500/30 text-red-400"
                        : "bg-yellow-500/20 border-yellow-500/30 text-yellow-300"
                    }`}
                  >
                    {STATUS_LABELS[reservation.status]}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-2">

                    <button
                      disabled={reservation.status === "confirmed"}
                      onClick={() => onConfirm(reservation.id)}
                      className="p-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-40 transition"
                      title="Confirm"
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </button>

                    <button
                      disabled={reservation.status === "cancelled"}
                      onClick={() => onCancel(reservation.id)}
                      className="p-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 disabled:opacity-40 transition"
                      title="Cancel"
                    >
                      <XCircle className="w-4 h-4 text-white" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onView(reservation)}
                      className="rounded-lg bg-brand-neon px-3 py-2 text-sm font-semibold text-brand-dark hover:opacity-90 transition"
                      title="View Details"
                    >
                      View
                    </button>

                    <button
                      onClick={() => onDelete(reservation.id)}
                      className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>

                  </div>
                </td>
              </m.tr>
            ))}

            {reservations.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <div className="flex flex-col items-center justify-center py-20">

                    <SearchX
                      className="w-14 h-14 text-cyan-400/60 mb-4"
                    />

                    <h3 className="text-xl font-semibold text-white">
                      No Reservations Found
                    </h3>

                    <p className="mt-2 text-white/50">
                      Try changing filters or search keywords.
                    </p>

                  </div>
                </td>
              </tr>
            )}
           </AnimatePresence>
          </tbody>
        </table>
      </div>
    </m.div>
  );
}

export default memo(ReservationTable);