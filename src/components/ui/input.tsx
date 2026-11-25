import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-11 w-full bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#211D19] border-[1.5px] border-[#211D19] placeholder:text-[#211D19]/45 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#173F35] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[96px] w-full bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#211D19] border-[1.5px] border-[#211D19] placeholder:text-[#211D19]/45 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#173F35] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    className={cn(
      "flex h-11 w-full bg-[#FFFFFF] px-3 py-2 text-sm text-[#211D19] border-[1.5px] border-[#211D19] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#173F35] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "block text-xs font-bold uppercase tracking-wider text-[#211D19] mb-1.5",
        className
      )}
      {...props}
    />
  );
}
