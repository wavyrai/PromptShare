import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const large = `[&>*]:py-2.5 [&>*]:px-6 h-14 text-lg`;
const small = `[&>*]:py-2 [&>*]:px-3 text-xs`;

const buttonVariants = cva(
  `inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50 active:[&>*]:translate-y-0.5`,
  {
    variants: {
      variant: {
        default: 'bg-primary shadow-sm text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input shadow-sm bg-background hover:bg-accent hover:text-accent-foreground',
        outlinePrimary: `border-primary bg-background border-2 hover:border-primary/80`,
        secondary:
          'bg-secondary shadow-sm text-secondary-foreground hover:bg-secondary/90',
        ghost: 'hover:bg-accent/50 hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        transparent: 'hover:bg-accent hover:text-accent-foreground',
        flat: 'bg-primary/5 text-primary hover:bg-primary/10',
        custom: '',
      },
      size: {
        default: `text-sm h-10 [&>*]:py-2 [&>*]:px-4`,
        small,
        sm: small,
        large,
        lg: large,
        icon: 'h-10 w-10',
        custom: ``,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);


const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
