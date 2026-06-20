import { useEffect, useState } from 'react'

export function useScrollState() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      setScrolled(window.scrollY > 36)

      const mid = window.scrollY + window.innerHeight * 0.38
      let current = 'home'
      document.querySelectorAll<HTMLElement>('[data-spy]').forEach((el) => {
        if (el.offsetTop <= mid) current = el.dataset.spy ?? current
      })
      setActiveSection(current)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return { scrolled, activeSection }
}
