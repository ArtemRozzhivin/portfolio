import { useId } from 'react'

import { toggleTheme } from '@lib/utils/theme'

export function ThemeToggle() {
  const maskId = `moon-${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      aria-label="Toggle theme"
      data-card
      className="glass-2 text-ink grid size-[38px] shrink-0 place-items-center rounded-full"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <g className="tt-rays" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <line x1="12" y1="1.5" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22.5" />
          <line x1="1.5" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22.5" y2="12" />
          <line x1="4.2" y1="4.2" x2="6" y2="6" />
          <line x1="18" y1="18" x2="19.8" y2="19.8" />
          <line x1="19.8" y1="4.2" x2="18" y2="6" />
          <line x1="6" y1="18" x2="4.2" y2="19.8" />
        </g>
        <mask id={maskId}>
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <circle className="tt-mask-circle" cx="30" cy="0" r="9" fill="black" />
        </mask>
        <circle
          className="tt-body"
          cx="12"
          cy="12"
          r="7"
          fill="currentColor"
          mask={`url(#${maskId})`}
        />
      </svg>
    </button>
  )
}
