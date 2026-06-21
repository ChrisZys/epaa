"use client";

import {
  useState,
  useId,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import {
  morphSpring,
  contentBlurEnter,
  contentBlurExit,
} from "@/lib/animations";

const DropdownContext = createContext(null);

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown sub-components must be used within <Dropdown>");
  }
  return context;
}

function DropdownRoot({
  trigger,
  children,
  className,
  variant = "outline",
  size = "md",
  disabled = false,
  align = "start",
  isOpen: controlledOpen,
  onOpenChange,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const layoutId = useId();
  const containerRef = useRef(null);

  const setIsOpen = useCallback(
    (next) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  const handleClickOutside = useCallback(
    (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        close();
      }
    },
    [close],
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        close();
        containerRef.current?.querySelector("button")?.focus();
      }
    },
    [close],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClickOutside, handleKeyDown]);

  return (
    <DropdownContext.Provider
      value={{ isOpen, setIsOpen, close, layoutId, containerRef }}
    >
      <div ref={containerRef} className={cn("relative inline-flex", className)}>
        <motion.div
          layoutId={layoutId}
          transition={morphSpring}
          className="flex"
        >
          <Button
            variant={variant}
            size={size}
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            aria-haspopup="menu"
            aria-expanded={isOpen}
          >
            <motion.span
              animate={{
                filter: isOpen ? "blur(16px)" : "blur(0px)",
                opacity: isOpen ? 0 : 1,
              }}
              transition={isOpen ? contentBlurExit : contentBlurEnter}
              className="flex items-center gap-2"
            >
              {trigger}
            </motion.span>
          </Button>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              layoutId={layoutId}
              transition={morphSpring}
              role="menu"
              className={cn(
                "absolute top-0 z-50 flex flex-col border border-border bg-popover text-popover-foreground shadow-lg min-w-55 overflow-hidden rounded-md",
                align === "end" ? "right-0" : "left-0",
              )}
            >
              <motion.div
                initial={{ filter: "blur(16px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={contentBlurEnter}
                className="flex flex-col"
              >
                <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                  <span className="font-semibold">{trigger}</span>
                  <Button
                    variant="invisible"
                    size="icon"
                    onClick={(event) => {
                      event.stopPropagation();
                      close();
                    }}
                    className="size-6"
                    aria-label="Cerrar menú"
                  >
                    ✕
                  </Button>
                </div>
                <div className="p-1">{children}</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DropdownContext.Provider>
  );
}

function DropdownItem({ children, onClick, disabled, className, ...props }) {
  const { close } = useDropdown();

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) close();
      }}
      className={cn(
        "flex w-full cursor-pointer items-center rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export const Dropdown = DropdownRoot;
export { DropdownItem };
