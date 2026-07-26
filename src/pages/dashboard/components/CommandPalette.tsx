import { memo, useEffect, useRef } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "motion/react";
import { Search } from "lucide-react";
import { useCommandSearch } from "../../../hooks/useCommandSearch";

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
  group?: string;
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
    useCommandSearch(
      commands,
      query
    );

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
                placeholder="Type a command..."
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
                    Recently Used
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

              {filtered.map((command, index) => (
               
                <button

                  ref={
                  selectedIndex===index
                  ? selectedRef
                  : null
                  }

                  key={command.id}
                  onClick={() => {
                    command.action();
                    onClose();
                  }}

                  className={`
                  w-full
                  border-b
                  border-white/5
                  px-5
                  py-4
                  text-left
                  transition
                  ${
                   selectedIndex===index
                     ? "bg-cyan-500/20"
                     : "hover:bg-cyan-500/10"
                  }
                  `}

                >
                  <div className="font-medium text-white">
                    {command.title}
                  </div>

                  {command.description && (
                    <div className="text-sm text-white/50">
                      {command.description}
                    </div>
                  )}
                </button>
              ))}

            </div>

            <div className="border-t border-white/10 px-4 py-2 text-xs text-white/40">
            {filtered.length}
            commands available
            </div>

          </m.div>
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}

export default memo(CommandPalette);