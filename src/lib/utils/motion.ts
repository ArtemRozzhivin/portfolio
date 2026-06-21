const REVEAL_OPTIONS: IntersectionObserverInit = {
  rootMargin: '0px 0px -10% 0px',
  threshold: 0.1,
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function setupReveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)')

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-revealed'))
    return
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const el = entry.target as HTMLElement
      el.style.transitionDelay = `${Number(el.dataset.delay ?? 0)}ms`
      el.classList.add('is-revealed')
      obs.unobserve(el)
    })
  }, REVEAL_OPTIONS)

  targets.forEach((el) => observer.observe(el))
}

function setupMagnetic() {
  if (prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return

  const targets = document.querySelectorAll<HTMLElement>(
    '[data-magnetic]:not([data-magnetic-ready])',
  )

  targets.forEach((el) => {
    el.dataset.magneticReady = 'true'
    el.style.transition = 'transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1)'

    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      el.style.transform = `translate(${dx * 0.15}px, ${dy * 0.24}px)`
    })

    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1)'
      el.style.transform = 'translate(0, 0)'
    })
  })
}

export function initMotion() {
  setupReveal()
  setupMagnetic()
}
