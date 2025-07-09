import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Custom class for dropdown hover animation on buttons.
 * Usage: Add 'dropdown-hover-btn' to the button's className.
 */
// Tailwind classes for dropdown-hover-btn:
// - bg-white text-black border-[#828281] relative overflow-hidden
// - group (for hover state)
// - On hover: background animates from top, bg-black, text-white
// - Responsive and performant
//
// Add this to the file for documentation:
// .dropdown-hover-btn {
//   @apply bg-white text-black border-[#828281] relative overflow-hidden group transition-colors duration-300;
// }
// .dropdown-hover-btn .dropdown-bg {
//   @apply absolute inset-0 top-[-100%] group-hover:top-0 bg-black transition-all duration-300 z-0;
//   transition-property: top, background-color;
// }
// .dropdown-hover-btn .dropdown-content {
//   @apply relative z-10 group-hover:text-white transition-colors duration-300;
// }

const buttonVariants = cva(
  // Add back essential flex and alignment classes for all buttons
  "dropdown-hover-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        hero: "bg-gradient-hero text-primary-foreground hover:scale-105 shadow-glow font-semibold",
        premium: "bg-gradient-premium text-secondary-foreground hover:scale-105 shadow-luxury font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: undefined,
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
