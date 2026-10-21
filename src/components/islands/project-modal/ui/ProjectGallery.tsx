import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { ProjectImage } from '@services/portfolio'
import { imageSrcSet, imageUrl } from '@lib/utils/image'

import { useGallery } from '../hooks/useGallery'

interface ProjectGalleryProps {
  images: ProjectImage[]
  name: string
}

const HIDE_SCROLLBAR = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

export function ProjectGallery({ images, name }: ProjectGalleryProps) {
  const { trackRef, thumbsRef, index, goTo, onScroll } = useGallery(images.length)
  const multiple = images.length > 1

  return (
    <div>
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className={`flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain ${HIDE_SCROLLBAR}`}
        >
          {images.map((image, i) => (
            <div
              key={image.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
              className="bg-tag-bg aspect-video w-full shrink-0 snap-center snap-always bg-cover bg-center"
              style={image.lqip ? { backgroundImage: `url('${image.lqip}')` } : undefined}
            >
              <img
                src={imageUrl(image.src, { w: 1600 })}
                srcSet={imageSrcSet(image.src, [800, 1200, 1600, 2000])}
                sizes="(min-width: 1104px) 1080px, 100vw"
                alt={`${name} — screenshot ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>

        {multiple && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous image"
              className="glass text-ink absolute top-1/2 left-3 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full transition-opacity disabled:pointer-events-none disabled:opacity-0 max-sm:hidden"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === images.length - 1}
              aria-label="Next image"
              className="glass text-ink absolute top-1/2 right-3 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full transition-opacity disabled:pointer-events-none disabled:opacity-0 max-sm:hidden"
            >
              <ChevronRight className="size-5" />
            </button>
            <span
              aria-live="polite"
              className="glass text-ink absolute bottom-3 left-3 rounded-full px-3 py-1.5 font-mono text-[12px] font-semibold"
            >
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {multiple && (
        <div
          ref={thumbsRef}
          className={`relative flex gap-2 overflow-x-auto px-6 pt-4 sm:px-8 ${HIDE_SCROLLBAR}`}
        >
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className={`bg-tag-bg aspect-video w-[92px] shrink-0 cursor-pointer overflow-hidden rounded-[10px] border-2 transition-[opacity,border-color] ${
                i === index ? 'border-accent' : 'border-transparent opacity-55 hover:opacity-100'
              }`}
            >
              <img
                src={imageUrl(image.src, { w: 240 })}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
