import { useMemo } from "react";
import type { CommandItem } from "../pages/dashboard/components/CommandPalette";

export function useCommandSearch(

  commands: CommandItem[],

  query: string

) {

  return useMemo(() => {

    if (!query.trim())

      return commands;

    const q = query.toLowerCase();

    return [...commands].sort((a, b) => {

      const aStarts =
        a.title.toLowerCase().startsWith(q);

      const bStarts =
        b.title.toLowerCase().startsWith(q);

      if (aStarts && !bStarts) return -1;

      if (!aStarts && bStarts) return 1;

      const aIncludes =
        a.title.toLowerCase().includes(q);

      const bIncludes =
        b.title.toLowerCase().includes(q);

      if (aIncludes && !bIncludes) return -1;

      if (!aIncludes && bIncludes) return 1;

      return 0;

    });

  }, [

    commands,

    query,

  ]);

}