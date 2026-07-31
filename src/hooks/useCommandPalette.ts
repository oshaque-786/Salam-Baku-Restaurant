import { useEffect, useState } from "react";

export function useCommandPalette(){

  const [open,setOpen]=useState(false);

  useEffect(()=>{

    const handler=(e:KeyboardEvent)=>{

      if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){

        e.preventDefault();

        setOpen(v=>!v);

      }

      if(e.key==="Escape"){

        setOpen(false);

      }

    };

    window.addEventListener("keydown",handler);

    return()=>window.removeEventListener("keydown",handler);

  },[]);

  return{

    open,

    setOpen,

  };

}