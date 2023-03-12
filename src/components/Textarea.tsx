import React from 'react';
import clsx from 'clsx';

const base = clsx(
  'w-full border px-3 py-1 rounded-md shadow-sm',
  'placeholder:text-gray-400',
  'focus:border-blue-500',
);

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return <textarea ref={ref} className={clsx(base, className)} {...props} />;
});

export { Textarea };
