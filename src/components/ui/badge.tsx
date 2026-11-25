import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider border border-[#211D19]",
  {
    variants: {
      variant: {
        default: "bg-[#F8F1E3] text-[#211D19]",
        peacock: "bg-[#173F35] text-[#F8F1E3]",
        pitambar: "bg-[#E9B949] text-[#211D19]",
        krishna: "bg-[#263D73] text-[#FFFFFF]",
        danger: "bg-[#FEE2E2] text-[#991B1B] border-[#991B1B]",
        success: "bg-[#DCFCE7] text-[#166534] border-[#166534]",
        muted: "bg-[#E5E0D5] text-[#211D19]/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
