import { memo, useMemo, useState } from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import ActivityStats from "./ActivityStats";
import { exportActivityCSV } from "../../../utils/exportActivityCSV";

import {
  format,
  isToday,
  isYesterday,
} from "date-fns";

import {
  Clock3,
  Calendar,
  CheckCircle2,
  Trash2,
  XCircle,
  LogIn,
  Settings,
} from "lucide-react";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  type:
    | "created"
    | "confirmed"
    | "cancelled"
    | "deleted"
    | "login"
    | "system";
  createdAt: any;
  user?: string;
  pinned?: boolean;
}

interface Props {
  activities: ActivityItem[];
}

function ActivityTimeline({ activities }: Props) {
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    | "all"
    | "created"
    | "confirmed"
    | "cancelled"
    | "deleted"
    | "login"
    | "system"
  >("all");

  const [visibleCount, setVisibleCount] =
    useState(20);

  const getActivityIcon = (
    type: ActivityItem["type"]
  ) => {
    switch (type) {
      case "created":
        return (
          <Calendar className="h-5 w-5 text-cyan-400" />
        );

      case "confirmed":
        return (
          <CheckCircle2 className="h-5 w-5 text-green-400" />
        );

      case "cancelled":
        return (
          <XCircle className="h-5 w-5 text-yellow-400" />
        );

      case "deleted":
        return (
          <Trash2 className="h-5 w-5 text-red-400" />
        );

      case "login":
        return (
          <LogIn className="h-5 w-5 text-violet-400" />
        );

      default:
        return (
          <Settings className="h-5 w-5 text-orange-400" />
        );
    }
  };

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        activity.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        activity.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        activity.type === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });
  }, [
    activities,
    search,
    filter,
  ]);

const groupedActivities = useMemo(() => {

const totalActivities =
  filteredActivities.length;

const todayActivities =
  groupedActivities.today.length;

const createdActivities =
  filteredActivities.filter(
    (a) => a.type === "created"
  ).length;

const deletedActivities =
  filteredActivities.filter(
    (a) => a.type === "deleted"
  ).length;

  return {

    today: filteredActivities.filter(
      activity =>
        activity.createdAt?.toDate &&
        isToday(
          activity.createdAt.toDate()
        )
    ),

    yesterday: filteredActivities.filter(
      activity =>
        activity.createdAt?.toDate &&
        isYesterday(
          activity.createdAt.toDate()
        )
    ),

    older: filteredActivities.filter(
      activity =>
        activity.createdAt?.toDate &&
        !isToday(
          activity.createdAt.toDate()
        ) &&
        !isYesterday(
          activity.createdAt.toDate()
        )
    ),

  };

}, [filteredActivities]);

const totalActivities =
  filteredActivities.length;

const todayActivities =
  groupedActivities.today.length;

const createdActivities =
  filteredActivities.filter(
    (a) => a.type === "created"
  ).length;

const deletedActivities =
  filteredActivities.filter(
    (a) => a.type === "deleted"
  ).length;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-slate-900 p-6"
      >
        <div className="mb-6 flex items-center gap-2">
          <Clock3 className="h-5 w-5 text-cyan-400" />

          <h2 className="text-lg font-semibold text-white">
            Activity Timeline
          </h2>
        </div>

        <div className="mb-5 flex flex-col gap-3 md:flex-row">
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search activity..."
            className="
              flex-1
              rounded-lg
              border
              border-white/10
              bg-slate-800
              px-4
              py-2
              text-white
              outline-none
            "
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value as any
              )
            }
            className="
              rounded-lg
              border
              border-white/10
              bg-slate-800
              px-3
              py-2
              text-white
            "
          >
            <option value="all">
              All
            </option>

            <option value="created">
              Created
            </option>

            <option value="confirmed">
              Confirmed
            </option>

            <option value="cancelled">
              Cancelled
            </option>

            <option value="deleted">
              Deleted
            </option>

            <option value="login">
              Login
            </option>

            <option value="system">
              System
            </option>
          </select>
          <button
            onClick={() =>
              exportActivityCSV(
                filteredActivities
              )
            }
            className="
              rounded-lg
              bg-cyan-500
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              hover:bg-cyan-400
            "
          >
            Export CSV
          </button>

        </div>

        <ActivityStats
          total={totalActivities}
          today={todayActivities}
          created={createdActivities}
          deleted={deletedActivities}
        />

        {filteredActivities.length === 0 ? (
          <div className="py-12 text-center text-white/40">
            No activity found.
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedActivities).map(([group, items]) => {
              if (items.length === 0) return null;

              return (
                <div key={group}>
                  <div
                    className="
                      sticky
                      top-0
                      z-10
                      mb-3
                      bg-slate-900/95
                      py-2
                      text-sm
                      font-semibold
                      text-cyan-400
                      backdrop-blur
                    "
                  >
                    {group === "today"
                      ? "Today"
                      : group === "yesterday"
                      ? "Yesterday"
                      : "Older"}
                  </div>

                  <div className="space-y-5">
                    {items
                      .slice(0, visibleCount)
                      .map((activity) => (
                        <m.div
                          key={activity.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="
                            flex
                            gap-4
                            rounded-xl
                            border
                            border-white/5
                            p-4
                            hover:bg-cyan-500/5
                            hover:scale-[1.01]
                            transition-all
                            duration-200
                          "
                        >
                          <div>
                            {getActivityIcon(activity.type)}
                          </div>

                          <div className="flex-1">
                            <div className="font-medium text-white">
                              {activity.title}
                            </div>

                            <div className="mt-1 text-xs text-white/40">
                              {activity.user ?? "Admin"}
                            </div>

                            <p className="mt-2 text-sm text-white/60">
                              {activity.description}
                            </p>

                            <div className="mt-2 text-xs text-cyan-400">
                              {activity.createdAt?.toDate
                                ? format(
                                    activity.createdAt.toDate(),
                                    "dd MMM yyyy • hh:mm a"
                                  )
                                : ""}
                            </div>
                          </div>
                        </m.div>
                      ))}
                  </div>
                </div>
              );
            })}

            {visibleCount < filteredActivities.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() =>
                    setVisibleCount((v) => v + 20)
                  }
                  className="
                    rounded-xl
                    bg-slate-800
                    px-5
                    py-2
                    text-white
                    hover:bg-cyan-500
                  "
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </m.div>
    </LazyMotion>
  );
}

export default memo(ActivityTimeline);