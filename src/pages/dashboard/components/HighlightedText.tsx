import { memo } from "react";

interface Props {
  text: string;
  query: string;
}

function HighlightedText({
  text,
  query,
}: Props) {

  if (!query)
    return <>{text}</>;

  const escaped =
    query.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

  const parts = text.split(
    new RegExp(
      `(${escaped})`,
      "gi"
    )
  );

  return (
    <>
      {parts.map((part, index) => {

        const match =
          part.toLowerCase() ===
          query.toLowerCase();

        return match ? (

          <span
            key={index}
            className="
              rounded
              bg-cyan-500/30
              px-1
              text-cyan-300
              font-semibold
            "
          >
            {part}
          </span>

        ) : (

          <span key={index}>
            {part}
          </span>

        );

      })}
    </>
  );

}

export default memo(HighlightedText);