import { useEffect, useState } from "react";

const STORAGE_KEY = "dashboard-command-history";

export function useCommandHistory() {

  const [history, setHistory] = useState<
    Record<string, number>
  >({});

  useEffect(() => {

    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setHistory(JSON.parse(stored));
    }

  }, []);

  const recordCommand = (id: string) => {

    setHistory(prev => {

      const next = {
        ...prev,
        [id]: (prev[id] ?? 0) + 1,
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(next)
      );

      return next;

    });

  };

  return {
    history,
    recordCommand,
  };

}