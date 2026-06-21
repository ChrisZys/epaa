import { cn } from "@/lib/utils";

export function TextArea({ disabled = false, className, ...props }) {
  return (
    <textarea
      disabled={disabled}
      className={cn(
        "flex min-h-15 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
