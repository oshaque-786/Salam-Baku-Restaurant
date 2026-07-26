import { useState } from "react";
import type { ReservationData } from "../types/reservation";

export interface ContextMenuState {

  visible: boolean;

  x: number;

  y: number;

  reservation: ReservationData | null;

}

export function useContextMenu() {

  const [menu, setMenu] =
    useState<ContextMenuState>({
      visible: false,
      x: 0,
      y: 0,
      reservation: null,
    });

  const openMenu = (
    event: React.MouseEvent,
    reservation: ReservationData
  ) => {

    event.preventDefault();

    setMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      reservation,
    });

  };

  const closeMenu = () => {

    setMenu(prev => ({
      ...prev,
      visible: false,
    }));

  };

  return {

    menu,

    openMenu,

    closeMenu,

  };

}