"use client";

import { useState, useId, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { morphSpring, contentBlurEnter, contentBlurExit } from "@/lib/animations";

export function Dropdown({ trigger, children, className, align = "start" }) {
  const [isOpen, setIsOpen] = useState(false);
  const layoutId = useId();
  const containerRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  return (
    <div ref={containerRef} className={cn("relative inline-flex", className)}>
      <motion.button
        type="button"
        layoutId={layoutId}
        transition={morphSpring}
        onClick={() => setIsOpen(true)}
        style={{ borderRadius: 8 }}
        className="flex items-center gap-2 border border-border bg-background px-4 py-2 shadow-sm"
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
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layoutId={layoutId}
            transition={morphSpring}
            style={{ borderRadius: 8 }}
            className={cn(
              "absolute top-0 z-50 flex flex-col border border-border bg-background shadow-lg min-w-[220px] overflow-hidden",
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
                <span className="font-medium">{trigger}</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  ✕
                </button>
              </div>
              <div className="p-1">{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
