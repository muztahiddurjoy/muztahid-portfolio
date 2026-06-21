import { cn } from '@/lib/utils'

// Editorial placeholder for photography/imagery (no real assets yet).
// Theme-aware: soft duotone wash + dot grid + corner ticks + serif label.
export function ImageFrame({
  label,
  caption,
  ratio = 'aspect-[4/5]',
  className,
  index,
}: {
  label: string
  caption?: string
  ratio?: string
  className?: string
  index?: string
}) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card',
        ratio,
        className,
      )}
    >
      {/* duotone wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-foreground/[0.16]" />
      <div className="bg-dotgrid absolute inset-0 opacity-50" />
      {/* corner ticks */}
      <span className="absolute left-4 top-4 h-3 w-3 border-l border-t border-border-strong" />
      <span className="absolute right-4 top-4 h-3 w-3 border-r border-t border-border-strong" />
      <span className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-border-strong" />
      <span className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-border-strong" />
      {/* label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        {index && <span className="mb-2 font-script text-lg text-muted-foreground">{index}</span>}
        <span className="font-display text-2xl tracking-tight transition-transform duration-500 group-hover:-translate-y-0.5">
          {label}
        </span>
        {caption && <span className="eyebrow mt-2">{caption}</span>}
      </div>
    </div>
  )
}
