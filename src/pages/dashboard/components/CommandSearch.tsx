import { memo } from "react";

interface Props {

  value: string;

  onChange: (value: string) => void;

}

function CommandSearch({

  value,

  onChange,

}: Props) {

  return (

    <input

      autoFocus

      value={value}

      onChange={(e)=>onChange(e.target.value)}

      placeholder="Search commands..."

      className="
        w-full
        rounded-xl
        border
        border-white/10
        bg-slate-900
        px-4
        py-3
        text-white
        outline-none
        focus:border-cyan-500
      "

    />

  );

}

export default memo(CommandSearch);