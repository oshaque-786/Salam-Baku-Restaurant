import { memo } from "react";
import { Trash2 } from "lucide-react";
import { SavedView } from "../../../hooks/useSavedViews";

interface Props {
  savedViews: SavedView[];
  onLoad: (view: SavedView) => void;
  onDelete: (id: string) => void;
  onDefault: (id: string) => void;
}

function SavedViews({
  savedViews,
  onLoad,
  onDelete,
  onDefault,
}: Props) {

  if (savedViews.length === 0)
    return null;

  return (

    <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">

      <h3 className="mb-4 text-lg font-semibold text-white">

        Saved Views

      </h3>

      <div className="flex flex-wrap gap-3">

        {savedViews.map(view => (

          <div
            key={view.id}
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2"
          >
            <button
              onClick={() => onLoad(view)}
              className="text-white hover:text-cyan-400"
            >
              {view.name}
            </button>

            <button
                onClick={() => onDefault(view.id)}
                className="rounded bg-cyan-600 px-2 py-1 text-xs text-white hover:bg-cyan-700"
              >
                Default
             </button>

            <button
              onClick={() => onDelete(view.id)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 size={15} />
            </button>
            
          </div>


        ))}

      </div>

    </div>

  );

}

export default memo(SavedViews);