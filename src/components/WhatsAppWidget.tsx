import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  MessageCircle,
  X,
} from "lucide-react";

const STORAGE_KEY =
  "salam-baku-whatsapp-position";

const VIEWPORT_MARGIN = 16;
const DEFAULT_MARGIN = 24;
const DRAG_THRESHOLD = 5;

interface WidgetPosition {
  x: number;
  y: number;
}

type PopupPlacement =
  | "above"
  | "below";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] =
    useState(false);

  const [position, setPosition] =
    useState<WidgetPosition | null>(null);

  const [popupPlacement, setPopupPlacement] =
    useState<PopupPlacement>("above");

  const widgetRef =
    useRef<HTMLDivElement>(null);

  const buttonRef =
    useRef<HTMLButtonElement>(null);

  const dragStartRef =
    useRef<{
      pointerX: number;
      pointerY: number;
      startX: number;
      startY: number;
    } | null>(null);

  const isDraggingRef =
    useRef(false);

  const hasDraggedRef =
    useRef(false);

  const latestPositionRef =
    useRef<WidgetPosition | null>(null);

  const phoneNumber =
    "994502021166";

  const defaultMessage =
    encodeURIComponent(
      "Hello! I have a question about the restaurant.",
    );

  const whatsappUrl =
    `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  /*
   * --------------------------------------------------
   * DEFAULT POSITION
   * --------------------------------------------------
   *
   * Same visual location as the original:
   *
   * bottom-6
   * right-6
   */
  const getDefaultPosition =
    (): WidgetPosition => {
      const button =
        buttonRef.current;

      const width =
        button?.offsetWidth ?? 56;

      const height =
        button?.offsetHeight ?? 56;

      return {
        x: Math.max(
          VIEWPORT_MARGIN,
          window.innerWidth -
            width -
            DEFAULT_MARGIN,
        ),

        y: Math.max(
          VIEWPORT_MARGIN,
          window.innerHeight -
            height -
            DEFAULT_MARGIN,
        ),
      };
    };

  /*
   * --------------------------------------------------
   * CLAMP POSITION
   * --------------------------------------------------
   *
   * Keeps the draggable icon inside viewport.
   */
  const clampPosition = (
    x: number,
    y: number,
  ): WidgetPosition => {
    const widget =
      widgetRef.current;

    const width =
      widget?.offsetWidth ?? 56;

    const height =
      widget?.offsetHeight ?? 56;

    const maxX = Math.max(
      VIEWPORT_MARGIN,
      window.innerWidth -
        width -
        VIEWPORT_MARGIN,
    );

    const maxY = Math.max(
      VIEWPORT_MARGIN,
      window.innerHeight -
        height -
        VIEWPORT_MARGIN,
    );

    return {
      x: Math.min(
        Math.max(
          VIEWPORT_MARGIN,
          x,
        ),
        maxX,
      ),

      y: Math.min(
        Math.max(
          VIEWPORT_MARGIN,
          y,
        ),
        maxY,
      ),
    };
  };

  /*
   * --------------------------------------------------
   * SAVE POSITION
   * --------------------------------------------------
   */
  const savePosition = (
    newPosition: WidgetPosition,
  ) => {
    try {
      const value =
        JSON.stringify(
          newPosition,
        );

      localStorage.setItem(
        STORAGE_KEY,
        value,
      );

      console.log(
        "WhatsApp position saved:",
        newPosition,
      );
    } catch (error) {
      console.error(
        "Unable to save WhatsApp position:",
        error,
      );
    }
  };

  /*
   * --------------------------------------------------
   * RESTORE POSITION
   * --------------------------------------------------
   */
  useEffect(() => {
    const restorePosition =
      () => {
        try {
          const saved =
            localStorage.getItem(
              STORAGE_KEY,
            );

          if (saved) {
            const parsed =
              JSON.parse(
                saved,
              ) as WidgetPosition;

            if (
              typeof parsed.x ===
                "number" &&
              typeof parsed.y ===
                "number"
            ) {
              const restoredPosition =
                clampPosition(
                  parsed.x,
                  parsed.y,
                );

              latestPositionRef.current =
                restoredPosition;

              setPosition(
                restoredPosition,
              );

              return;
            }
          }
        } catch {
          // Ignore invalid localStorage.
        }

        const defaultPosition =
          getDefaultPosition();

        latestPositionRef.current =
          defaultPosition;

        setPosition(
          defaultPosition,
        );
      };

    /*
     * Wait one frame so button dimensions
     * are available.
     */
    const frame =
      window.requestAnimationFrame(
        restorePosition,
      );

    return () =>
      window.cancelAnimationFrame(
        frame,
      );
  }, []);

  /*
   * --------------------------------------------------
   * POPUP PLACEMENT
   * --------------------------------------------------
   *
   * Decide whether popup should open above
   * or below the WhatsApp button.
   */
  const updatePopupPlacement =
    () => {
      const button =
        buttonRef.current;

      if (!button) {
        return;
      }

      const rect =
        button.getBoundingClientRect();

      /*
       * Approximate popup height.
       * This gives us enough room to decide
       * the preferred direction before rendering.
       */
      const estimatedPopupHeight =
        245;

      const availableAbove =
        rect.top -
        VIEWPORT_MARGIN;

      const availableBelow =
        window.innerHeight -
        rect.bottom -
        VIEWPORT_MARGIN;

      if (
        availableAbove >=
        estimatedPopupHeight
      ) {
        setPopupPlacement(
          "above",
        );
      } else if (
        availableBelow >=
        estimatedPopupHeight
      ) {
        setPopupPlacement(
          "below",
        );
      } else {
        /*
         * If neither side has enough space,
         * choose the side with more space.
         */
        setPopupPlacement(
          availableAbove >=
            availableBelow
            ? "above"
            : "below",
        );
      }
    };

  /*
   * --------------------------------------------------
   * OPEN / CLOSE POPUP
   * --------------------------------------------------
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    updatePopupPlacement();

    const handleResize =
      () => {
        updatePopupPlacement();
      };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, [isOpen, position]);

  /*
   * --------------------------------------------------
   * VIEWPORT RESIZE
   * --------------------------------------------------
   */
  useEffect(() => {
    const handleResize =
      () => {
        setPosition(
          (current) => {
            if (!current) {
              return current;
            }

            const adjusted =
              clampPosition(
                current.x,
                current.y,
              );

            savePosition(
              adjusted,
            );

            return adjusted;
          },
        );
      };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, []);

  /*
   * --------------------------------------------------
   * POINTER DOWN
   * --------------------------------------------------
   */
  const handlePointerDown = (
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    if (
      event.pointerType ===
        "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    const rect =
      widgetRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    isDraggingRef.current =
      false;

    hasDraggedRef.current =
      false;

    dragStartRef.current = {
      pointerX:
        event.clientX,

      pointerY:
        event.clientY,

      startX:
        rect.left,

      startY:
        rect.top,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );
  };

  /*
   * --------------------------------------------------
   * POINTER MOVE
   * --------------------------------------------------
   */
  const handlePointerMove = (
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    if (
      !dragStartRef.current
    ) {
      return;
    }

    const deltaX =
      event.clientX -
      dragStartRef.current
        .pointerX;

    const deltaY =
      event.clientY -
      dragStartRef.current
        .pointerY;

    /*
     * Ignore tiny movement.
     */
    if (
      !isDraggingRef.current &&
      Math.abs(deltaX) <
        DRAG_THRESHOLD &&
      Math.abs(deltaY) <
        DRAG_THRESHOLD
    ) {
      return;
    }

    isDraggingRef.current =
      true;

    hasDraggedRef.current =
      true;

    const newPosition =
      clampPosition(
        dragStartRef.current.startX +
          deltaX,

        dragStartRef.current.startY +
          deltaY,
      );

    latestPositionRef.current =
      newPosition;

    setPosition(
      newPosition,
    );
  };

  /*
   * --------------------------------------------------
   * POINTER UP
   * --------------------------------------------------
   */
  const handlePointerUp = (
    event: React.PointerEvent<HTMLButtonElement>,
  ) => {
    if (!dragStartRef.current) {
      return;
    }

    if (isDraggingRef.current) {
      const finalPosition =
        latestPositionRef.current;

      if (finalPosition) {
        savePosition(
          finalPosition,
        );

        setPosition(
          finalPosition,
        );
      }
    }

    dragStartRef.current = null;
    isDraggingRef.current = false;

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    } catch {
      // Pointer capture may already be released.
    }
  };

  /*
   * --------------------------------------------------
   * BUTTON CLICK
   * --------------------------------------------------
   *
   * A drag must NOT toggle the popup.
   */
  const handleWidgetClick =
    () => {
      if (
        hasDraggedRef.current
      ) {
        hasDraggedRef.current =
          false;

        return;
      }

      setIsOpen(
        (previous) =>
          !previous,
      );
    };

  /*
   * --------------------------------------------------
   * POPUP HORIZONTAL POSITION
   * --------------------------------------------------
   *
   * Keep popup inside viewport even if
   * icon is at extreme left/right.
   */
  const getPopupStyle =
    (): React.CSSProperties => {
      const button =
        buttonRef.current;

      if (!button) {
        return {};
      }

      const rect =
        button.getBoundingClientRect();

      const popupWidth =
        Math.min(
          300,
          window.innerWidth -
            VIEWPORT_MARGIN *
              2,
        );

      let left =
        rect.left +
        rect.width / 2 -
        popupWidth / 2;

      /*
       * Keep popup inside left edge.
       */
      left =
        Math.max(
          VIEWPORT_MARGIN,
          left,
        );

      /*
       * Keep popup inside right edge.
       */
      left =
        Math.min(
          left,
          window.innerWidth -
            popupWidth -
            VIEWPORT_MARGIN,
        );

      /*
       * Convert viewport coordinates
       * to fixed-position coordinates.
       */
      return {
        position: "fixed",
        left: `${left}px`,
        width: `${popupWidth}px`,
      };
    };

  /*
   * --------------------------------------------------
   * POPUP VERTICAL POSITION
   * --------------------------------------------------
   */
  const getPopupVerticalStyle =
    (): React.CSSProperties => {
      const button =
        buttonRef.current;

      if (!button) {
        return {};
      }

      const rect =
        button.getBoundingClientRect();

      if (
        popupPlacement ===
        "above"
      ) {
        return {
          bottom: `${window.innerHeight - rect.top + 16}px`,
        };
      }

      return {
        top: `${rect.bottom + 16}px`,
      };
    };

  /*
   * Do not render until initial position
   * has been established.
   */
  if (!position) {
    return null;
  }

  return (
    <LazyMotion
      features={domAnimation}
    >
      <div
        ref={widgetRef}
        className="fixed z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {/*
         * ------------------------------------------------
         * CHAT POPUP
         * ------------------------------------------------
         *
         * Popup is NOT inside the draggable layout flow.
         * It uses fixed positioning so the button remains
         * completely independent and draggable.
         */}
        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{
                opacity: 0,
                y:
                  popupPlacement ===
                  "above"
                    ? 20
                    : -20,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y:
                  popupPlacement ===
                  "above"
                    ? 20
                    : -20,
                scale: 0.9,
              }}
              style={{
                ...getPopupStyle(),
                ...getPopupVerticalStyle(),
              }}
              className="z-[10000] bg-brand-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-w-[calc(100vw-2rem)]"
            >
              <div className="bg-brand-accent p-4 text-white flex justify-between items-center">
                <div>
                  <h4 className="font-bold">
                    Chat with us
                  </h4>

                  <p className="text-xs text-white/80">
                    Typically replies right away
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-white/5">
                <div className="bg-white/10 text-white p-3 rounded-lg rounded-tl-none inline-block max-w-[85%] text-sm mb-4">
                  Hi there! 👋 How can we help you today?
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    setIsOpen(false)
                  }
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />

                  Start Chat on WhatsApp
                </a>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/*
         * ------------------------------------------------
         * DRAGGABLE WHATSAPP BUTTON
         * ------------------------------------------------
         *
         * This stays independent from the popup.
         * Therefore popup can NEVER make the button
         * inaccessible.
         */}
        <m.button
          ref={buttonRef}
          type="button"
          whileHover={
            isDraggingRef.current
              ? undefined
              : {
                  scale: 1.05,
                }
          }
          whileTap={
            isDraggingRef.current
              ? undefined
              : {
                  scale: 0.95,
                }
          }
          onPointerDown={
            handlePointerDown
          }
          onPointerMove={
            handlePointerMove
          }
          onPointerUp={
            handlePointerUp
          }
          onPointerCancel={
            handlePointerUp
          }
          onClick={
            handleWidgetClick
          }
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:bg-[#20bd5a] transition-colors focus:outline-none cursor-grab active:cursor-grabbing touch-none select-none"
          aria-label={
            isOpen
              ? "Close WhatsApp chat"
              : "Open WhatsApp chat"
          }
          title="Drag to move"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-7 h-7" />
          )}
        </m.button>
      </div>
    </LazyMotion>
  );
}