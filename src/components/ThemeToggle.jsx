"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sun, Moon } from "@boxicons/react";
import { Button } from "@/components/Button";
import { iconBlurExit, iconBlurEnter } from "@/lib/animations";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return stored === "dark" || (!stored && prefersDark);
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ scale: 0.85, filter: "blur(2px)", opacity: 0 }}
          animate={{
            scale: 1,
            filter: "blur(0px)",
            opacity: 1,
            transition: iconBlurEnter,
          }}
          exit={{
            scale: 0.85,
            filter: "blur(2px)",
            opacity: 0,
            transition: iconBlurExit,
          }}
          className="flex"
        >
          {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
