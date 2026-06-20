import { useEffect, useState } from 'react'

import { siteConfig } from '@lib/config/site'
import { getActiveTheme, type Theme, toggleTheme } from '@lib/utils/theme'

import { useScrollState } from '../hooks/useScrollState'

const HEADER_OFFSET = 96
const MORPH = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top: y, behavior: 'smooth' })
}

export function Header() {
  const { scrolled, activeSection } = useScrollState()
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(getActiveTheme())
  }, [])

  const onNav = (event: React.MouseEvent, href: string) => {
    event.preventDefault()
    scrollToId(href.slice(1))
  }

  const isDark = theme === 'dark'

  return (
    <nav
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 60,
        top: scrolled ? '18px' : '0',
        width: scrolled ? 'min(940px, calc(100% - 28px))' : '100%',
        transition: MORPH,
      }}
    >
      <div
        data-card
        className="flex items-center justify-between gap-3"
        style={{
          padding: scrolled ? '8px 8px 8px 18px' : '15px clamp(20px, 4vw, 46px)',
          borderRadius: scrolled ? 999 : 0,
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          border: scrolled ? '1px solid var(--card-border)' : '1px solid transparent',
          boxShadow: scrolled ? 'var(--card-shadow)' : 'none',
          backdropFilter: scrolled ? 'blur(var(--blur))' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(var(--blur))' : 'blur(0px)',
          transition: MORPH,
        }}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-ink flex items-center gap-[9px]"
          aria-label="Back to top"
        >
          <span className="bg-accent font-display text-accent-contrast grid size-[30px] place-items-center rounded-[9px] text-[15px] font-extrabold tracking-[-0.5px] shadow-[0_6px_16px_-6px_var(--accent)]">
            {siteConfig.brand.mark}
          </span>
          <span className="text-dim font-mono text-[12.5px] font-semibold tracking-[0.02em]">
            {siteConfig.brand.word}
          </span>
        </button>

        <ul data-nav-links className="flex list-none items-center gap-0.5">
          {siteConfig.nav.map((item) => {
            const active = activeSection === item.href.slice(1)
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => onNav(event, item.href)}
                  className={`block rounded-full px-[13px] py-2 font-mono text-[12.5px] font-medium transition-colors ${
                    active ? 'bg-accent text-accent-contrast' : 'text-dim hover:text-ink'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          onClick={() => setTheme(toggleTheme())}
          aria-label="Toggle theme"
          data-card
          className="glass-2 text-ink grid size-[38px] shrink-0 place-items-center rounded-full"
        >
          {isDark ? (
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}
