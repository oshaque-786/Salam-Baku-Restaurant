import { memo } from "react";

interface Props {

  icon: React.ReactNode;

  title: string;

  description?: string;

  shortcut?: string;

  onClick: () => void;

}

function CommandItem({

  icon,

  title,

  description,

  shortcut,

  onClick,

}: Props) {

  return (

    <button

      onClick={onClick}

      className="
        flex
        w-full
        items-center
        justify-between
        rounded-xl
        border
        border-transparent
        px-4
        py-3
        text-left
        transition-all
        hover:border-cyan-500/40
        hover:bg-cyan-500/5
      "

    >

      <div className="flex items-center gap-3">

        <div className="text-cyan-400">

          {icon}

        </div>

        <div>

          <div className="font-medium text-white">

            {title}

          </div>

          {description && (

            <div className="text-xs text-white/50">

              {description}

            </div>

          )}

        </div>

      </div>

      {shortcut && (

        <kbd className="rounded bg-slate-800 px-2 py-1 text-xs text-white/60">

          {shortcut}

        </kbd>

      )}

    </button>

  );

}

export default memo(CommandItem);