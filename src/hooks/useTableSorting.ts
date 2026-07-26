import { useState } from "react";

export type SortDirection = "asc" | "desc";

export function useTableSorting<T>() {
  const [sortKey, setSortKey] =
    useState<keyof T | null>(null);

  const [direction, setDirection] =
    useState<SortDirection>("asc");

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) {
      setDirection((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortKey(key);
      setDirection("asc");
    }
  };

  const sortData = (rows: T[]): T[] => {
    if (!sortKey) return rows;

    return [...rows].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (valueA == null) return 1;
      if (valueB == null) return -1;

      if (valueA < valueB)
        return direction === "asc" ? -1 : 1;

      if (valueA > valueB)
        return direction === "asc" ? 1 : -1;

      return 0;
    });
  };

  return {
    sortKey,
    direction,
    toggleSort,
    sortData,
  };
}