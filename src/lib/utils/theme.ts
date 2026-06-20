export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

export function getPreferredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function getActiveTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {}
}

export function toggleTheme(): Theme {
  const next: Theme = getActiveTheme() === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}
