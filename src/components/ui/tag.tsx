import type * as React from 'react'

import { cn } from '@lib/utils/tailwind-merge'

function Tag({ className, ...props }: React.ComponentProps<'span'>) {
  return <span className={cn('tag', className)} {...props} />
}

export { Tag }
