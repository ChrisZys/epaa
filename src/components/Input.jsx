import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const inputVariants = cva(
  "w-auto h-10 bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground rounded-md transition-colors duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        ghost: "",
      },
      size: {
        md: "",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  },
);

export function Input({
  variant,
  size,
  disabled = false,
  className,
  type = "text",
  ...props
}) {
  return (
    <input
      type={type}
      disabled={disabled}
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  );
}
