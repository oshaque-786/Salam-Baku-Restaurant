import { memo } from "react";

interface Props{

  children:string;

}

function CommandShortcut({

  children,

}:Props){

  return(

    <kbd className="rounded bg-slate-800 px-2 py-1 text-xs text-white/50">

      {children}

    </kbd>

  );

}

export default memo(CommandShortcut);