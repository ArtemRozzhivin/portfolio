import * as React from 'react'

import { cn } from '@lib/utils/tailwind-merge'

interface TextareaProps extends React.ComponentProps<'textarea'> {
  label?: string
  error?: string
}

function Textarea({ ref, className, label, error, id, rows = 5, ...props }: TextareaProps) {
  const textareaId = id || React.useId()

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className={cn('text-dim mb-1.5 block text-sm font-medium', error && 'text-red-500')}
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cn(
          'border-field-border bg-field-bg text-ink placeholder:text-faint focus-visible:border-accent focus-visible:ring-accent/25 min-h-[130px] w-full resize-y rounded-(--card-radius) border px-[18px] py-3.5 text-[15px] leading-[1.55] transition-colors outline-none focus-visible:ring-2',
          error && 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/25',
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export { Textarea }
