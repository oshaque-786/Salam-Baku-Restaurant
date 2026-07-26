import { useEffect } from "react";

interface Props {
  selectedIds: string[];

  reservations: { id?: string }[];

  selectAll: (ids: string[]) => void;

  clearSelection: () => void;

  onDelete: () => void;

  onOpen: () => void;

  onCopy: () => void;
}

export function useKeyboardShortcuts({
  selectedIds,
  reservations,
  selectAll,
  clearSelection,
  onDelete,
  onOpen,
  onCopy,
}: Props) {

  useEffect(() => {

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {

      /* Ctrl + A */

      if (event.ctrlKey && event.key === "a") {

        event.preventDefault();

        selectAll(
          reservations
            .map(r => r.id)
            .filter(
              (id): id is string => Boolean(id)
            )
        );

      }

      /* ESC */

      if (event.key === "Escape") {

        clearSelection();

      }

      /* Delete */

      if (
        event.key === "Delete" &&
        selectedIds.length > 0
      ) {

        onDelete();

      }

      /* Enter */

      if (
        event.key === "Enter" &&
        selectedIds.length === 1
      ) {

        onOpen();

      }

      /* Ctrl + C */

      if (
        event.ctrlKey &&
        event.key === "c" &&
        selectedIds.length > 0
      ) {

        event.preventDefault();

        onCopy();

      }

    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

  }, [

    selectedIds,

    reservations,

    selectAll,

    clearSelection,

    onDelete,

    onOpen,

    onCopy,

  ]);

}