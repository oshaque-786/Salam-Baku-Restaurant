export const RESERVATION_STATUS = [
  "pending",
  "confirmed",
  "cancelled",
] as const;

export const STATUS_COLORS = {
  pending: "#FACC15",
  confirmed: "#22C55E",
  cancelled: "#EF4444",
};

export const ITEMS_PER_PAGE = 10;

export const CHART_COLORS = [
  "#00E5FF",
  "#22C55E",
  "#FACC15",
  "#EF4444",
  "#8B5CF6",
  "#F97316",
];

export const DEFAULT_RESERVATION_SETTINGS = {
  enabled: true,
};

export const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};