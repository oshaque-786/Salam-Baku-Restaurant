import { memo } from "react";
import { Bell } from "lucide-react";
import { LazyMotion, domAnimation, m } from "motion/react";

interface Props {
  unread: number;
  onClick: () => void;
}

function NotificationBell({
  unread,
  onClick,
}: Props) {
  return (
    <LazyMotion features={domAnimation}>
      <m.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-white hover:border-cyan-500 hover:bg-slate-800 transition"
      >
        <Bell size={20} />

        {unread > 0 && (
          <m.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white"
          >
            {unread > 99 ? "99+" : unread}
          </m.span>
        )}
      </m.button>
    </LazyMotion>
  );
}

export default memo(NotificationBell);