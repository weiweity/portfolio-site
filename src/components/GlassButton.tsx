import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size;
  variant?: Variant;
};

const sizeMap: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

const variantMap: Record<Variant, string> = {
  primary:
    "bg-champagne/90 text-prussian hover:bg-champagne shadow-[0_8px_30px_-12px_rgba(224,170,109,0.45)]",
  ghost:
    "bg-white/[0.04] text-ivory/90 border border-champagne/25 hover:bg-champagne/10 hover:border-champagne/45",
};

export const GlassButton = forwardRef<HTMLButtonElement, Props>(
  ({ size = "md", variant = "primary", className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium tracking-wide",
          "backdrop-blur-md transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "active:translate-y-[1px]",
          sizeMap[size],
          variantMap[variant],
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";
