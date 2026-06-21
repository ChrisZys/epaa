"use client";

import {
  useState,
  useId,
  useRef,
  useCallback,
  useEffect,
  createContext,
  useContext,
} from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const TabsContext = createContext(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs sub-components must be used within <Tabs>");
  }
  return context;
}

function TabsRoot({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
}) {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? "",
  );
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : uncontrolledValue;
  const layoutId = useId();

  const setActiveValue = useCallback(
    (next) => {
      if (!isControlled) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue, layoutId }}>
      <div className={cn("flex flex-col", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children, className }) {
  const { layoutId, activeValue } = useTabs();
  const listRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const updateIndicator = useCallback(() => {
    if (!listRef.current) return;
    const buttons = [...listRef.current.querySelectorAll('[role="tab"]')];
    const activeButton = buttons.find(
      (btn) => btn.getAttribute("aria-selected") === "true",
    );
    if (!activeButton) return;
    setIndicatorStyle({
      left: activeButton.offsetLeft,
      width: activeButton.offsetWidth,
    });
  }, []);

  useEffect(() => {
    updateIndicator();
  }, [activeValue, updateIndicator]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    if (!listRef.current) return;
    const observer = new ResizeObserver(() => {
      updateIndicator();
    });
    const buttons = listRef.current.querySelectorAll('[role="tab"]');
    buttons.forEach((btn) => observer.observe(btn));
    return () => observer.disconnect();
  }, [updateIndicator]);

  return (
    <div
      ref={listRef}
      className={cn(
        "relative inline-flex self-start rounded-xl bg-muted p-1",
        className,
      )}
      role="tablist"
    >
      <motion.div
        layoutId={`${layoutId}-indicator`}
        className="absolute inset-y-1 rounded-lg bg-background shadow-sm"
        initial={false}
        animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      {children}
    </div>
  );
}

function TabsTrigger({ value, children, className, disabled = false }) {
  const { activeValue, setActiveValue } = useTabs();
  const isActive = activeValue === value;

  const handleKeyDown = (event) => {
    const parent = event.target.closest('[role="tablist"]');
    if (!parent) return;
    const triggers = [...parent.querySelectorAll('[role="tab"]')];
    const index = triggers.indexOf(event.target);

    if (event.key === "ArrowRight") {
      event.preventDefault();
      const next = triggers[(index + 1) % triggers.length];
      next?.click();
      next?.focus();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prev = triggers[(index - 1 + triggers.length) % triggers.length];
      prev?.click();
      prev?.focus();
    }
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => setActiveValue(value)}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-out",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, children, className }) {
  const { activeValue } = useTabs();
  if (activeValue !== value) return null;
  return <div className={cn("pt-4", className)}>{children}</div>;
}

export const Tabs = TabsRoot;
export { TabsList, TabsTrigger, TabsContent };
