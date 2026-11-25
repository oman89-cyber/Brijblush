import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold tracking-wide transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#263D73] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[#173F35] text-[#F8F1E3] border-[1.5px] border-[#211D19] brj-btn-press hover:bg-[#1f5346]",
        accent:
          "bg-[#E9B949] text-[#211D19] border-[1.5px] border-[#211D19] brj-btn-press hover:bg-[#f0c663]",
        secondary:
          "bg-[#FFFFFF] text-[#211D19] border-[1.5px] border-[#211D19] brj-btn-press hover:bg-[#F8F1E3]",
        krishna:
          "bg-[#263D73] text-[#FFFFFF] border-[1.5px] border-[#211D19] brj-btn-press hover:bg-[#2f4b8c]",
        danger:
          "bg-[#991B1B] text-[#FFFFFF] border-[1.5px] border-[#211D19] brj-btn-press hover:bg-[#7F1D1D]",
        ghost:
          "bg-transparent text-[#211D19] hover:bg-[#211D19]/10",
        outline:
          "bg-transparent text-[#211D19] border-[1.5px] border-[#211D19] hover:bg-[#211D19] hover:text-[#F8F1E3]",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
