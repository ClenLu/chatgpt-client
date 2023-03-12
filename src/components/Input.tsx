import React from 'react';
import clsx from 'clsx';

const base = clsx(
  'w-full border px-3 py-2 rounded-md shadow-sm',
  'placeholder:text-gray-400',
  'focus:border-blue-500',
);

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return <input ref={ref} className={clsx(base, className)} {...props} />;
});

export { Input };
