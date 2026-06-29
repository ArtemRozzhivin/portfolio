import * as React from 'react'

import { cn } from '@lib/utils/tailwind-merge'

const MAX_HEIGHT = 300

interface TextareaProps extends React.ComponentProps<'textarea'> {
  label?: string
  error?: string
}

function Textarea({
  ref,
  className,
  label,
  error,
  id,
  rows = 5,
  onInput,
  ...props
}: TextareaProps) {
  const textareaId = id || React.useId()
  const innerRef = React.useRef<HTMLTextAreaElement>(null)

  const setRefs = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      innerRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  const resize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden'
  }

  React.useLayoutEffect(() => {
    if (innerRef.current) resize(innerRef.current)
  }, [])

  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    resize(event.currentTarget)
    onInput?.(event)
  }

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
        ref={setRefs}
        id={textareaId}
        rows={rows}
        onInput={handleInput}
        className={cn(
          'border-field-border bg-field-bg text-ink placeholder:text-faint focus-visible:border-accent focus-visible:ring-accent/25 max-h-[300px] min-h-[130px] w-full resize-none overflow-hidden rounded-(--card-radius) border px-[18px] py-3.5 text-[15px] leading-[1.55] transition-[height,border-color] duration-200 ease-out outline-none focus-visible:ring-2',
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
