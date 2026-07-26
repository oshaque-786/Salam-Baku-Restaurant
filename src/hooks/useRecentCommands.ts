import { useEffect, useState } from "react";

export function useRecentCommands() {

  const [recent, setRecent] =
    useState<string[]>([]);

  useEffect(() => {

    const stored =
      localStorage.getItem(
        "dashboard_recent_commands"
      );

    if (stored)

      setRecent(
        JSON.parse(stored)
      );

  }, []);

  const addRecent = (id: string) => {

    const updated = [

      id,

      ...recent.filter(
        x => x !== id
      ),

    ].slice(0, 5);

    setRecent(updated);

    localStorage.setItem(

      "dashboard_recent_commands",

      JSON.stringify(updated)

    );

  };

  return {

    recent,

    addRecent,

  };

}