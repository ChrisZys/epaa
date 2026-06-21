"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "@boxicons/react";

const chipStyle = (colorVar) =>
  colorVar
    ? {
        backgroundColor: `color-mix(in srgb, var(--${colorVar}) 10%, transparent)`,
        borderColor: `color-mix(in srgb, var(--${colorVar}) 70%, transparent)`,
        color: `var(--${colorVar})`,
      }
    : undefined;

export function Select({
  value,
  onChange,
  options,
  colorMap,
  icons,
  placeholder = "Seleccionar...",
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
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

  const selectedOption = options.find((opt) => opt.value === value);
  const colorVar = selectedOption ? colorMap?.[selectedOption.value] : undefined;
  const SelectedIcon = selectedOption && icons ? icons[selectedOption.value] : null;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors hover:bg-accent/30"
      >
        {selectedOption ? (
          <span
            className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-semibold"
            style={chipStyle(colorVar)}
          >
            {SelectedIcon && <SelectedIcon className="h-3.5 w-3.5" />}
            {selectedOption.label}
          </span>
        ) : (
          <>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-border px-2 py-1 text-xs font-medium text-muted-foreground">
              {placeholder}
            </span>
          </>
        )}
        <ChevronDown
          className={cn(
            "h-3 w-3 shrink-0 text-muted-foreground transition-transform duration-150",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 top-0 z-50 overflow-hidden rounded-md border border-border bg-popover py-1 shadow-xl"
          >
            {options.map((opt) => {
              const optColorVar = colorMap?.[opt.value];
              const OptIcon = icons ? icons[opt.value] : null;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent",
                    value === opt.value && "bg-accent",
                  )}
                >
                  <span
                    className="inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-xs font-semibold"
                    style={
                      optColorVar
                        ? {
                            backgroundColor: `color-mix(in srgb, var(--${optColorVar}) 10%, transparent)`,
                            borderColor: `color-mix(in srgb, var(--${optColorVar}) 70%, transparent)`,
                            color: `var(--${optColorVar})`,
                            borderWidth: 1,
                            borderStyle: "solid",
                          }
                        : undefined
                    }
                  >
                    {OptIcon && <OptIcon className="h-3.5 w-3.5" />}
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
