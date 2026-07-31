import { LazyMotion, domAnimation, m, AnimatePresence } from "motion/react";
import { Search } from "lucide-react";
import { useAICommandSearch } from "../../../hooks/useAICommandSearch";
import HighlightedText from "./HighlightedText";
import { useCommandHistory } from "../../../hooks/useCommandHistory";

import {
  memo,
  useEffect,
  useRef,
  useMemo,
} from "react";

import {
  Calendar,
  Clock3,
  CheckCircle,
  XCircle,
  LayoutGrid,
  Table2,
  RefreshCw,
  LogOut,
} from "lucide-react";

export interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  group:
    | "Reservations"
    | "Analytics"
    | "Notifications"
    | "System";
  shortcut?: string;
  keywords?: string[];
  action: () => void;
}

interface Props {
  recent: string[];
  open:boolean;
  query:string;
  setQuery:(value:string)=>void;
  commands:CommandItem[];
  selectedIndex:number;
  setSelectedIndex: React.Dispatch<
    React.SetStateAction<number>
>;
  onClose:()=>void;
}

function CommandPalette({
  open,
  query,
  setQuery,
  commands,
  recent,
  selectedIndex,
  setSelectedIndex,
  onClose,
}: Props) {

  const filtered =
  useAICommandSearch(
    commands,
    query
  );

  const {
    history,
    recordCommand,
  } = useCommandHistory();

  const suggestions =
    [...filtered]
    .sort(
      (a,b)=>
        (history[b.id] ?? 0)
        -
        (history[a.id] ?? 0)
    )
    .slice(0,5);

const groupedCommands = useMemo(() => {
  return filtered.reduce(
    (acc, command) => {

      if (!acc[command.group]) {

        acc[command.group] = [];

      }

      acc[command.group].push(command);

      return acc;

    },

    {} as Record<
      string,
      CommandItem[]
    >
  );

}, [filtered]);

  const selectedRef =
    useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex(prev =>
          Math.min(
            prev + 1,
            filtered.length - 1
          )
        );
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex(prev =>
          Math.max(
            prev - 1,
            0
           )
        );
      }
      if (event.key === "Enter") {
        event.preventDefault();
        filtered[selectedIndex]?.action();
        onClose();
      }
    };
    window.addEventListener(
      "keydown",
      handler
    );
    return () =>
      window.removeEventListener(
        "keydown",
        handler
      );
  }, [
    open,
    filtered,
    selectedIndex,
  ]);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [selectedIndex]);

  if (!open) return null;

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <m.div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <m.div
            initial={{ opacity: 0, y: -30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search className="w-5 h-5 text-cyan-400" />

              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: export csv, pending reservations, analytics, logout..."
                className="w-full bg-transparent outline-none text-white placeholder:text-white/40"
              />
            </div>

            <div className="max-h-[420px] overflow-y-auto">

              {filtered.length === 0 && (
                <div className="p-8 text-center text-white/40">
                  No commands found.
                </div>
              )}

              {query === "" && recent.length > 0 && (
                <div className="border-b border-white/10">
                  <div className="px-4 pt-3 pb-1 text-xs uppercase tracking-wider text-cyan-400">
                    AI Suggested
                  </div>
                  <div className="pb-2">
                    {recent.map((id) => {
                      const command =
                        commands.find(
                          c => c.id === id
                        );
                      if (!command) return null;
                      return (
                        <button
                          key={command.id}
                          onClick={() => {
                            recordCommand(command.id);
                            command.action();
                            onClose();
                          }}
                          className="flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-cyan-500/10"
                        >
                          {command.icon}

                          <div>
                            <div>
                              {command.title}
                            </div>
                            {command.description && (
                              <div className="text-xs text-white/40">
                                {command.description}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                   })}
                 </div>
                </div>
              )}

              {query !== "" && suggestions.length > 0 && (
              <div className="border-b border-white/10">
              <div className="px-5 py-2 text-xs uppercase tracking-wider text-cyan-400">
              AI Suggestions
              </div>
              </div>
              )}

              {Object.entries(groupedCommands).map(

              ([group, commands]) => (

              <div
              key={group}
              className="border-b border-white/5"
              >

              <div
              className="
              sticky
              top-0
              bg-slate-900
              px-5
              py-2
              text-xs
              uppercase
              tracking-wider
              text-cyan-400
              "
              >

              {group}

              <span className="ml-2 text-white/30">

              ({commands.length})

              </span>

              </div>





              {commands.map((command, index) => (
               <button
                  key={command.id}
                  ref={selectedIndex === index ? selectedRef : null}
                  onClick={() => {
                    recordCommand(command.id);
                    command.action();
                    onClose();
                  }}
                  className={`
                    w-full
                    px-5
                    py-4
                    text-left
                    transition
                    flex
                    items-center
                    justify-between
                    ${
                      selectedIndex === index
                        ? "bg-cyan-500/20"
                        : "hover:bg-cyan-500/10"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {command.icon}

                    <div>
                      <div className="font-medium text-white">
                        <HighlightedText
                          text={command.title}
                          query={query}
                        />
                      </div>

                      {command.description && (
                        <div className="text-xs text-white/40">
                          <HighlightedText
                            text={command.description}
                            query={query}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                  className="
                  ml-auto
                  mr-4
                  text-[10px]
                  text-cyan-400
                  font-semibold
                  "
                  >

                  {Math.min(
                    100,
                    60 + (history[command.id] ?? 0) * 5
                  )}%

                  </div>

                  {command.shortcut && (
                    <div className="rounded-md bg-white/10 px-2 py-1 text-[10px] text-white/50">
                      Ctrl+{command.shortcut}
                    </div>
                  )}
                </button>
              ))}

              </div>
              ))}

              <div className="border-t border-white/10 px-4 py-2 text-xs text-white/40">
                {filtered.length} commands available
              </div>

              </div>

              </m.div>

              </m.div>

              </AnimatePresence>

              </LazyMotion>
              );
              }

              export default memo(CommandPalette);