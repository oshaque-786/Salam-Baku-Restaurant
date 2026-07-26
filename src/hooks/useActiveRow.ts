import { useState } from "react";

export function useActiveRow() {
  const [activeIndex, setActiveIndex] = useState(0);

  const moveUp = () =>
    setActiveIndex((prev) =>
      prev > 0 ? prev - 1 : 0
    );

  const moveDown = (max: number) =>
    setActiveIndex((prev) =>
      prev < max - 1 ? prev + 1 : prev
    );

  return {
    activeIndex,
    setActiveIndex,
    moveUp,
    moveDown,
  };
}