import { useMemo } from "react";

const suggestions = [
  "Today's reservations",
  "Expected revenue",
  "Weekly growth",
  "Occupancy",
  "Forecast next week",
  "Cancelled reservations",
  "Confirmed reservations",
  "Export reservation report",
  "Print reservations",
  "Open analytics",
  "Open notifications",
  "Logout",
];

export function useCopilotSuggestions(query: string) {

  return useMemo(() => {

    if (!query.trim()) {
      return suggestions.slice(0, 6);
    }

    const q = query.toLowerCase();

    return suggestions.filter(item =>
      item.toLowerCase().includes(q)
    );

  }, [query]);

}