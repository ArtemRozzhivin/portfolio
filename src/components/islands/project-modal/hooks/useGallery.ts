import { useCallback, useEffect, useRef, useState } from 'react'

export function useGallery(count: number) {
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current
      if (!track) return
      const target = Math.max(0, Math.min(count - 1, next))
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      track.scrollTo({
        left: target * track.clientWidth,
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    },
    [count],
  )

  const onScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setIndex(Math.round(track.scrollLeft / track.clientWidth))
  }, [])

  useEffect(() => {
    if (count < 2) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      goTo(index + (event.key === 'ArrowRight' ? 1 : -1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count, goTo, index])

  useEffect(() => {
    const strip = thumbsRef.current
    const thumb = strip?.children[index] as HTMLElement | undefined
    if (!strip || !thumb) return
    strip.scrollTo({
      left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2,
      behavior: 'smooth',
    })
  }, [index])

  return { trackRef, thumbsRef, index, goTo, onScroll }
}
