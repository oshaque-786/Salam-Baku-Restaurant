interface ReservationFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  statusFilter: "all" | "pending" | "confirmed" | "cancelled";
  setStatusFilter: (
    value: "all" | "pending" | "confirmed" | "cancelled"
  ) => void;

  dateFilter: string;
  setDateFilter: (value: string) => void;
}

export default function ReservationFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}: ReservationFiltersProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-4 mb-8">

      {/* Search */}

      <input
        type="text"
        placeholder="Search by Name, Email or Phone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-neon"
      />

      {/* Status */}

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(
            e.target.value as
              | "all"
              | "pending"
              | "confirmed"
              | "cancelled"
          )
        }
        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-neon"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      {/* Date */}

      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-neon"
      />

    </div>
  );
}