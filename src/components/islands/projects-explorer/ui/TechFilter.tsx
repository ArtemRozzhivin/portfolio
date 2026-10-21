import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

interface TechFilterProps {
  techs: string[]
  selected: string[]
  onToggle: (_tech: string) => void
  onClear: () => void
}

export function TechFilter({ techs, selected, onToggle, onClear }: TechFilterProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const label = selected.length === 0 ? 'All technologies' : `${selected.length} selected`

  return (
    <div ref={ref} className="relative w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        data-card
        aria-haspopup="listbox"
        aria-expanded={open}
        className="bg-field-bg text-ink border-field-border inline-flex w-full items-center justify-between gap-2.5 rounded-[14px] border px-[18px] py-3.5 text-[14.5px] font-semibold sm:w-auto sm:justify-start"
      >
        {label}
        <ChevronDown className="size-3.5" />
      </button>

      {open && (
        <div
          data-card
          role="listbox"
          aria-multiselectable="true"
          className="glass-solid absolute top-[calc(100%+8px)] left-0 z-20 w-full rounded-2xl p-2 sm:right-0 sm:left-auto sm:w-[230px]"
        >
          <button
            type="button"
            onClick={onClear}
            className="text-accent w-full rounded-[10px] px-3 py-2.5 text-left font-mono text-[12.5px] font-semibold"
          >
            Clear filters
          </button>
          <div className="max-h-[312px] overflow-y-auto overscroll-contain">
            {techs.map((tech) => {
              const checked = selected.includes(tech)
              return (
                <button
                  key={tech}
                  type="button"
                  role="option"
                  aria-selected={checked}
                  onClick={() => onToggle(tech)}
                  className="text-ink hover:bg-tag-bg flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-[14px] font-medium"
                >
                  <span
                    className={`grid size-[18px] shrink-0 place-items-center rounded-[6px] border-[1.5px] ${
                      checked ? 'bg-accent border-accent text-accent-contrast' : 'border-tag-border'
                    }`}
                  >
                    {checked && <Check className="size-3" strokeWidth={3.5} />}
                  </span>
                  {tech}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
