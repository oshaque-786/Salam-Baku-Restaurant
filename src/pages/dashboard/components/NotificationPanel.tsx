import { memo } from "react";
import { LazyMotion, domAnimation, AnimatePresence, m } from "motion/react";
import {
  Bell,
  BarChart3,
  Settings,
  User,
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
  type?: string;
  pinned?: boolean;
}

interface Props {
  open: boolean;
  notifications: NotificationItem[];
  onClose: () => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  removeNotification: (id: string) => void;
  togglePin: (id: string) => void;
  clearAll: () => void;
}

function NotificationPanel({
  open,
  notifications,
  onClose,
  markRead,
  markAllRead,
  removeNotification,
  togglePin,
  clearAll,
}: Props) {
  const getIcon = (type?: string) => {
    switch (type) {
      case "reservation":
        return <Bell className="h-5 w-5 text-cyan-400" />;
      case "analytics":
        return <BarChart3 className="h-5 w-5 text-green-400" />;
      case "system":
        return <Settings className="h-5 w-5 text-orange-400" />;
      default:
        return <User className="h-5 w-5 text-violet-400" />;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-14 z-50 w-[360px] rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h3 className="font-semibold text-white">
                Notifications
              </h3>

              <div className="flex gap-2">
                <button
                  onClick={markAllRead}
                  className="text-xs text-cyan-400"
                >
                  Read All
                </button>

                <button
                  onClick={clearAll}
                  className="text-xs text-red-400"
                >
                  Clear
                </button>

                <button
                  onClick={onClose}
                  className="text-white/50 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="max-h-[420px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-white/40">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border-b border-white/5 p-4 ${
                      notification.read
                        ? ""
                        : "bg-cyan-500/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {getIcon(notification.type)}

                      <div className="flex-1">
                        <div className="font-medium text-white">
                          {notification.title}
                        </div>

                        <div className="mt-1 text-sm text-white/60">
                          {notification.message}
                        </div>

                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => markRead(notification.id)}
                            className="text-xs text-cyan-400"
                          >
                            Read
                          </button>

                          <button
                            onClick={() => togglePin(notification.id)}
                            className="text-xs text-yellow-400"
                          >
                            {notification.pinned
                              ? "Unpin"
                              : "Pin"}
                          </button>

                          <button
                            onClick={() =>
                              removeNotification(notification.id)
                            }
                            className="text-xs text-red-400"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </m.div>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
}

export default memo(NotificationPanel);