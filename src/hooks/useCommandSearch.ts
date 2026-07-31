import { useMemo } from "react";
import Fuse from "fuse.js";
import type { CommandItem } from "../pages/dashboard/components/CommandPalette";

export function useCommandSearch(
  commands: CommandItem[],
  query: string
) {
  return useMemo(() => {

    if (!query.trim())
      return commands;

    const q = query.toLowerCase();

    const normalized =

      q
        .replace(/bookings/g,"reservation")
        .replace(/booking/g,"reservation")
        .replace(/guest/g,"reservation")
        .replace(/guests/g,"reservation")
        .replace(/csv/g,"export")
        .replace(/excel/g,"export")
        .replace(/report/g,"analytics")
        .replace(/reports/g,"analytics")
        .replace(/stats/g,"analytics")
        .replace(/statistics/g,"analytics")
        .replace(/download/g,"export")
        .replace(/sign out/g,"logout")
        .replace(/exit/g,"logout")
        .replace(/quit/g,"logout");


    const fuse = new Fuse(commands, {
      threshold: 0.35,
      includeScore: true,
      keys: [
        "title",
        "description",
        "keywords",
        "group",
      ],
    });

    const results = fuse.search(normalized).map(
      (r) => r.item
    );

    return [...results].sort((a, b) => {

      const score = (cmd: CommandItem) => {

        let s = 0;

        // Exact title prefix
        if (
          cmd.title.toLowerCase().startsWith(normalized)
        )
          s += 100;

        // Title contains query
        if (
          cmd.title.toLowerCase().includes(normalized)
        )
          s += 60;

        // Keyword prefix
        if (
          cmd.keywords?.some((k) =>
            k.toLowerCase().startsWith(normalized)
          )
        )
          s += 50;

        // Keyword contains query
        if (
          cmd.keywords?.some((k) =>
            k.toLowerCase().includes(normalized)
          )
        )
          s += 30;

        // Description contains query
        if (
          cmd.description
            ?.toLowerCase()
            .includes(normalized)
        )
          s += 20;

        return s;

      };

      return score(b) - score(a);

    });

      }, [
        commands,
        query,
      ]);
    }