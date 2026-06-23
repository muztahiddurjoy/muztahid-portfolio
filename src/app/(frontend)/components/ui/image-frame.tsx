import { cn } from '@/lib/utils'

// Editorial frame for project/portfolio imagery.
// - When `src` is provided, renders the real image (cover-filled) under a
//   theme-aware duotone wash, so any colour photo settles into the active warm
//   palette instead of fighting it. Hovering lifts the wash for a quiet colour
//   reveal. The label/caption sit as a soft overlay; corner ticks frame it.
// - Otherwise falls back to the duotone *placeholder* (no real asset yet).
export function ImageFrame({
  label,
  caption,
  src,
  alt,
  ratio = 'aspect-[4/5]',
  className,
  index,
  tone = true,
}: {
  label: string
  caption?: string
  src?: string
  alt?: string
  ratio?: string
  className?: string
  index?: string
  /** Apply the theme duotone wash + hover colour-reveal (default true). */
  tone?: boolean
}) {
  const hasImage = Boolean(src)
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card',
        ratio,
        className,
      )}
    >
      {hasImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || label}
            loading="lazy"
            decoding="async"
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-[transform,filter] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]',
              // Neutral "ink + paper" grade: desaturated with a hair of warmth so
              // any colour photo settles into the editorial world — and reads the
              // same across all 12 palettes (no theme-coloured blend that could
              // muddy on the cool themes). Hover lifts it to full colour.
              tone &&
                '[filter:grayscale(0.85)_sepia(0.08)_contrast(1.04)] group-hover:[filter:grayscale(0)_sepia(0)_contrast(1)]',
            )}
          />
          {/* quiet bottom anchor for depth + caption legibility (theme-neutral) */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/25 to-transparent"
          />
          {caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 pt-12">
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/90">
                {caption}
              </span>
            </div>
          )}
        </>
      ) : (
        <>
          {/* duotone wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-foreground/[0.16]" />
          <div className="bg-dotgrid absolute inset-0 opacity-50" />
          {/* label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            {index && <span className="mb-2 font-script text-lg text-muted-foreground">{index}</span>}
            <span className="font-display text-2xl tracking-tight transition-transform duration-500 group-hover:-translate-y-0.5">
              {label}
            </span>
            {caption && <span className="eyebrow mt-2">{caption}</span>}
          </div>
        </>
      )}
      {/* corner ticks (shown in both modes) */}
      <span className="absolute left-4 top-4 h-3 w-3 border-l border-t border-border-strong" />
      <span className="absolute right-4 top-4 h-3 w-3 border-r border-t border-border-strong" />
      <span className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-border-strong" />
      <span className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-border-strong" />
    </div>
  )
}
