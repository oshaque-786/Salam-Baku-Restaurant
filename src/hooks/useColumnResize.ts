import {
  useEffect,
  useState,
  useCallback,
} from "react";

const STORAGE_KEY = "reservation-column-widths";

export function useColumnResize() {

  const [widths, setWidths] =
    useState<Record<string, number>>(() => {

      const saved =
        localStorage.getItem(STORAGE_KEY);

      return saved
        ? JSON.parse(saved)
        : {};

    });

  useEffect(() => {

    localStorage.setItem(

      STORAGE_KEY,

      JSON.stringify(widths)

    );

  }, [widths]);

  const startResize = useCallback(

    (
      key: string,
      startX: number,
      startWidth: number
    ) => {

      document.body.style.cursor =
        "col-resize";

      document.body.style.userSelect =
        "none";

      const onMouseMove = (
        event: MouseEvent
      ) => {

        const delta =
          event.clientX - startX;

        setWidths(prev => ({

          ...prev,

          [key]: Math.max(
            90,
            startWidth + delta
          ),

        }));

      };

      const onMouseUp = () => {

        document.body.style.cursor = "";

        document.body.style.userSelect = "";

        document.removeEventListener(
          "mousemove",
          onMouseMove
        );

        document.removeEventListener(
          "mouseup",
          onMouseUp
        );

      };

      document.addEventListener(
        "mousemove",
        onMouseMove
      );

      document.addEventListener(
        "mouseup",
        onMouseUp
      );

    },

    []

  );

  const autoFit = useCallback(

    (key: string) => {

      const defaults = {

        fullName: 240,

        phoneNumber: 170,

        date: 220,

        guests: 120,

        status: 140,

      };

      setWidths(prev => ({

        ...prev,

        [key]:
          defaults[
            key as keyof typeof defaults
          ] ?? 180,

      }));

    },

    []

  );;

  return {

    widths,

    startResize,

    autoFit,

  };

}