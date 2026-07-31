import { useMemo } from "react";
import type { CommandItem } from "../pages/dashboard/components/CommandPalette";

const synonyms: Record<string, string[]> = {
  reservation: ["booking", "table", "guest"],
  export: ["csv", "download", "excel"],
  analytics: ["report", "stats", "statistics"],
  notification: ["alert", "message"],
  delete: ["remove", "trash"],
  confirmed: ["approve"],
  cancelled: ["cancel"],
  print: ["pdf"],
  settings: ["config", "preferences"],
  logout: ["signout", "exit"],
};

function scoreCommand(
  command: CommandItem,
  query: string
) {
  const q = query.toLowerCase();

  let score = 0;

  const title =
    command.title.toLowerCase();

  const desc =
    command.description?.toLowerCase() ?? "";

  if (title === q) score += 100;

  if (title.startsWith(q))
    score += 70;

  if (title.includes(q))
    score += 50;

  if (desc.includes(q))
    score += 30;

  Object.entries(synonyms).forEach(
    ([key, words]) => {
      if (
        title.includes(key) &&
        words.some((w) =>
          q.includes(w)
        )
      ) {
        score += 40;
      }
    }
  );

  return score;
}

export function useAICommandSearch(
  commands: CommandItem[],
  query: string
) {
  return useMemo(() => {
    if (!query.trim())
      return commands;

    return [...commands]
      .map((command) => ({
        command,
        score: scoreCommand(
          command,
          query
        ),
      }))
      .filter((x) => x.score > 0)
      .sort(
        (a, b) =>
          b.score - a.score
      )
      .map((x) => x.command);
  }, [commands, query]);
}