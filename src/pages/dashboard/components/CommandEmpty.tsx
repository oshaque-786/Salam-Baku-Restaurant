import { memo } from "react";

function CommandEmpty(){

  return(

    <div className="py-12 text-center text-white/40">

      No command found

    </div>

  );

}

export default memo(CommandEmpty);