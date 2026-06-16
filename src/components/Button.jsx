import { cva } from "class-variance-authority";
import clsx from "clsx";
import LoaderLines from "@boxicons/react/LoaderLines";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-all duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        outline:
          "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-10 rounded-md px-4 text-sm",
        lg: "h-12 rounded-md px-6 text-base",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

/**
 * Componente Button para acciones principales y secundarias.
 * Sigue principios de diseño Emil Kowalski: feedback táctil inmediato
 * con escala al presionar y transiciones rápidas.
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'} [props.variant='primary']
 *   Variante visual del botón.
 * @param {'sm' | 'md' | 'lg' | 'icon'} [props.size='md']
 *   Tamaño del botón.
 * @param {boolean} [props.disabled=false]
 *   Estado deshabilitado.
 * @param {boolean} [props.isLoading=false]
 *   Muestra un spinner y deshabilita la interacción.
 * @param {React.ReactNode} props.children
 *   Contenido del botón.
 * @param {string} [props.className]
 *   Clases adicionales para personalización.
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onClick]
 *   Handler del evento click.
 * @param {'button' | 'submit' | 'reset'} [props.type='button']
 *   Tipo HTML del botón.
 */
export function Button({
  variant,
  size,
  disabled = false,
  isLoading = false,
  children,
  className,
  onClick,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {isLoading && (
        <LoaderLines className="h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}
