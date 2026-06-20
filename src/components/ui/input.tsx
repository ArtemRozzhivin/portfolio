import * as React from 'react'

import { cn } from '@lib/utils/tailwind-merge'

interface InputProps extends React.ComponentProps<'input'> {
  label?: string
  error?: string
}

function Input({ className, type, label, error, id, ...props }: InputProps) {
  const inputId = id || React.useId()

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className={cn('text-dim mb-1.5 block text-sm font-medium', error && 'text-red-500')}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={cn(
          'border-field-border bg-field-bg text-ink placeholder:text-faint focus-visible:border-accent focus-visible:ring-accent/25 h-[52px] w-full rounded-[var(--card-radius)] border px-[18px] text-[15px] transition-colors outline-none focus-visible:ring-2',
          error && 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/25',
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export { Input }
