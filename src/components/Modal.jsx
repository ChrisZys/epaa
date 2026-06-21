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

const ModalContext = createContext(null);

function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal sub-components must be used within <Modal>");
  }
  return context;
}

function ModalRoot({
  trigger,
  children,
  className,
  variant = "outline",
  size = "md",
  disabled = false,
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
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <ModalContext.Provider
      value={{ isOpen, setIsOpen, close, layoutId, containerRef }}
    >
      <div ref={containerRef} className={cn("inline-flex", className)}>
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
            aria-haspopup="dialog"
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
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={close}
                aria-hidden="true"
              />

              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={close}
              >
                <motion.div
                  layoutId={layoutId}
                  transition={morphSpring}
                  role="dialog"
                  aria-modal="true"
                  className="flex w-full max-w-lg flex-col rounded-xl border border-border bg-background shadow-lg overflow-hidden"
                >
                  <motion.div
                    initial={{ filter: "blur(16px)", opacity: 0 }}
                    animate={{ filter: "blur(0px)", opacity: 1 }}
                    transition={contentBlurEnter}
                    className="flex flex-col"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {children}
                  </motion.div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </ModalContext.Provider>
  );
}

function ModalHeader({ className, children, showClose = true, ...props }) {
  const { close } = useModal();

  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-border px-6 py-4",
        className,
      )}
      {...props}
    >
      <div className="text-lg font-semibold">{children}</div>
      {showClose && (
        <Button
          variant="invisible"
          size="icon"
          onClick={close}
          className="size-8"
          aria-label="Cerrar modal"
        >
          ✕
        </Button>
      )}
    </div>
  );
}

function ModalContent({ className, children, ...props }) {
  return (
    <div
      className={cn("overflow-y-auto px-6 py-4 text-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function ModalActions({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 border-t border-border px-6 py-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export const Modal = ModalRoot;
export { ModalHeader, ModalContent, ModalActions };
