import { memo } from "react";
import {
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";

interface Props {

  x:number;

  y:number;

  visible:boolean;

  reservation:any;

  onView:()=>void;

  onConfirm:()=>void;

  onCancel:()=>void;

  onDelete:()=>void;

  onCopyPhone:()=>void;

  onCopyEmail:()=>void;

}

function ReservationContextMenu({

  x,

  y,

  visible,

  reservation,

  onView,

  onConfirm,

  onCancel,

  onDelete,

  onCopyPhone,

  onCopyEmail,

}: Props) {

  if (!visible || !reservation) return null;

  return (

    <div

      style={{
        top: y,
        left: x,
      }}

      className="fixed z-[9999] w-56 rounded-xl border border-white/10 bg-slate-900 shadow-2xl"

    >

      <button
      onClick={onView}
      className="flex w-full items-center gap-3 px-4 py-3 hover:bg-cyan-600 transition"
      >

      View Details

      </button>

      <button

        onClick={onConfirm}

        className="flex w-full items-center gap-3 px-4 py-3 hover:bg-green-600 transition"

      >

        <CheckCircle size={18} />

        Confirm

      </button>

      <button

        onClick={onCancel}

        className="flex w-full items-center gap-3 px-4 py-3 hover:bg-yellow-500 transition"

      >

        <XCircle size={18} />

        Cancel

      </button>

      <button

        onClick={onDelete}

        className="flex w-full items-center gap-3 px-4 py-3 hover:bg-red-600 transition"

      >

        <Trash2 size={18} />

        Delete

      </button>

      <button
      onClick={onCopyPhone}
      className="flex w-full items-center gap-3 px-4 py-3 hover:bg-white/10 transition"
      >

      Copy Phone

      </button>

      <button
      onClick={onCopyEmail}
      className="flex w-full items-center gap-3 px-4 py-3 hover:bg-white/10 transition"
      >

      Copy Email

      </button>


    </div>

  );

}

export default memo(ReservationContextMenu);