"use client";

import { AnimatePresence, motion } from "motion/react";
import { Card, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { X } from "@boxicons/react";

const categoryColors = {
  has: "var(--category-has)",
  seeks: "var(--category-seeks)",
  solves: "var(--category-solves)",
  rules: "var(--category-rules)",
};

const categoryBgColors = {
  has: "rgba(13, 148, 136, 0.1)",
  seeks: "rgba(217, 119, 6, 0.1)",
  solves: "rgba(225, 29, 72, 0.1)",
  rules: "rgba(99, 102, 241, 0.1)",
};

const categoryBorderColors = {
  has: "rgba(13, 148, 136, 0.7)",
  seeks: "rgba(217, 119, 6, 0.7)",
  solves: "rgba(225, 29, 72, 0.7)",
  rules: "rgba(99, 102, 241, 0.7)",
};

const categoryTextColors = {
  has: "rgb(13, 148, 136)",
  seeks: "rgb(217, 119, 6)",
  solves: "rgb(225, 29, 72)",
  rules: "rgb(99, 102, 241)",
};

export function CategoryCard({
  category,
  tokens,
  isSelected,
  onSelect,
  onRemoveToken,
}) {
  const color = categoryColors[category.id];
  const bgColor = categoryBgColors[category.id];
  const borderColor = categoryBorderColors[category.id];
  if (!color || !bgColor || !borderColor) return null;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-150 ease-out active:scale-[0.97]",
        isSelected && "border-l-[3px]",
      )}
      style={isSelected ? { borderLeftColor: color } : undefined}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-base font-semibold" style={{ color: categoryTextColors[category.id] }}>{category.name}</span>
        <div
          className="flex h-4 w-4 items-center justify-center rounded-full border-2 bg-transparent transition-colors"
          style={{ borderColor: color }}
        >
          {isSelected && (
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
          )}
        </div>
      </div>
      <CardContent className="flex flex-col gap-2 min-h-15">
        {tokens.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            <AnimatePresence mode="popLayout">
              {tokens.map((token) => (
                <motion.span
                  key={token.id}
                  layout
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15, ease: "easeOut" } }}
                  className="inline-flex items-center gap-1 rounded-sm border pl-3 pr-1 py-1 text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    color: categoryTextColors[token.categoryId],
                  }}
                >
                  {token.text}
                  <Button
                    variant="invisible"
                    size="icon"
                    onClick={(event) => {
                      event.stopPropagation();
                      onRemoveToken(token.id);
                    }}
                    className="size-5"
                    aria-label={`Quitar ${token.text}`}
                  >
                    <X className="size-3" style={{ color: categoryTextColors[category.id] }} />
                  </Button>
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">
            Haz clic en un token para asignarlo
          </span>
        )}
      </CardContent>
    </Card>
  );
}
