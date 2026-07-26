import { useRef, useState } from "react";

export function useSelection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const lastSelectedIndex = useRef<number | null>(null);

  const isSelected = (id: string) =>
    selectedIds.includes(id);

  const toggleSelection = (
    id: string,
    reservations?: { id: string }[],
    shiftKey = false
  ) => {
    if (
      shiftKey &&
      reservations &&
      lastSelectedIndex.current !== null
    ) {
      const currentIndex = reservations.findIndex(
        (r) => r.id === id
      );

      const start = Math.min(
        currentIndex,
        lastSelectedIndex.current
      );

      const end = Math.max(
        currentIndex,
        lastSelectedIndex.current
      );

      const ids = reservations
        .slice(start, end + 1)
        .map((r) => r.id);

      setSelectedIds((prev) => {
        const merged = new Set([
          ...prev,
          ...ids,
        ]);

        return [...merged];
      });
    } else {
      setSelectedIds((prev) =>
        prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id]
      );
    }

    if (reservations) {
      lastSelectedIndex.current =
        reservations.findIndex(
          (r) => r.id === id
        );
    }
  };

  const clearSelection = () => {
    setSelectedIds([]);
    lastSelectedIndex.current = null;
  };

  const selectAll = (ids: string[]) => {
    setSelectedIds(ids);
  };

  return {
    selectedIds,
    isSelected,
    toggleSelection,
    clearSelection,
    selectAll,
  };
}