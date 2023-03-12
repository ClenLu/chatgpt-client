import React from 'react';
import clsx from 'clsx';
import { cva, VariantProps } from 'class-variance-authority';

const base = clsx('px-4 py-3 rounded-xl w-fit inline-block');
const variants = cva(base, {
  variants: {
    variant: {
      default: 'bg-blue-500 text-white',
      assistant: 'bg-zinc-100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Message = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof variants>
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(variants({ className, variant }))}
      {...props}
    />
  );
});

export { Message };
