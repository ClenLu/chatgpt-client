import React from 'react';
import clsx from 'clsx';
import { cva, VariantProps } from 'class-variance-authority';

const base = clsx(
  'inline-flex gap-1 items-center justify-center px-4 py-2 rounded-md shadow-sm font-medium',
  'focus:ring-2 focus:ring-offset-2',
);
const variants = cva(base, {
  variants: {
    variant: {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      ghost: 'bg-transparent hover:bg-gray-100',
    },
    size: {
      default: 'h-10 px-4',
      tiny: 'h-7 px-1 text-sm',
      small: 'h-9 px-2 text-sm',
      large: 'h-11 px-8 text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof variants>
>(({ className, size, variant, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(variants({ className, size, variant }))}
      {...props}
    />
  );
});

export { Button };
