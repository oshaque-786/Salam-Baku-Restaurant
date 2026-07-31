import { memo } from "react";

interface Props {
  total: number;
  today: number;
  created: number;
  deleted: number;
}

function ActivityStats({
  total,
  today,
  created,
  deleted,
}: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

      <div className="rounded-xl bg-slate-800 p-4">
        <div className="text-sm text-white/50">
          Total
        </div>

        <div className="text-2xl font-bold text-cyan-400">
          {total}
        </div>
      </div>

      <div className="rounded-xl bg-slate-800 p-4">
        <div className="text-sm text-white/50">
          Today
        </div>

        <div className="text-2xl font-bold text-green-400">
          {today}
        </div>
      </div>

      <div className="rounded-xl bg-slate-800 p-4">
        <div className="text-sm text-white/50">
          Created
        </div>

        <div className="text-2xl font-bold text-cyan-400">
          {created}
        </div>
      </div>

      <div className="rounded-xl bg-slate-800 p-4">
        <div className="text-sm text-white/50">
          Deleted
        </div>

        <div className="text-2xl font-bold text-red-400">
          {deleted}
        </div>
      </div>

    </div>
  );
}

export default memo(ActivityStats);