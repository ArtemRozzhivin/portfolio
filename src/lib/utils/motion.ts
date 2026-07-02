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

function setupTimeline() {
  const container = document.querySelector<HTMLElement>('[data-tl]')
  const spine = container?.querySelector<HTMLElement>('[data-tl-spine]')
  if (!container || !spine || container.dataset.tlReady) return
  container.dataset.tlReady = 'true'

  const rows = [...container.querySelectorAll<HTMLElement>('[data-tl-row]')]

  if (prefersReducedMotion()) {
    container.style.setProperty('--tl-progress', '1')
    rows.forEach((row) => row.classList.add('is-active'))
    return
  }

  let raf = 0
  const update = () => {
    raf = 0
    const rect = spine.getBoundingClientRect()
    const anchor = window.innerHeight * 0.62
    const progress = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height))
    container.style.setProperty('--tl-progress', progress.toFixed(4))

    rows.forEach((row) => {
      const node = row.querySelector<HTMLElement>('[data-tl-node]')
      if (!node) return
      const nodeRect = node.getBoundingClientRect()
      const nodeCenter = (nodeRect.top + nodeRect.height / 2 - rect.top) / rect.height
      row.classList.toggle('is-active', progress >= nodeCenter - 0.01)
    })
  }

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }

  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
}

function setupBlurUp() {
  document
    .querySelectorAll<HTMLImageElement>('img[data-blur-up]:not(.is-loaded)')
    .forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('is-loaded')
        return
      }
      const reveal = () => img.classList.add('is-loaded')
      img.addEventListener('load', reveal, { once: true })
      img.addEventListener('error', reveal, { once: true })
    })
}

export function initMotion() {
  setupReveal()
  setupMagnetic()
  setupTimeline()
  setupBlurUp()
}
