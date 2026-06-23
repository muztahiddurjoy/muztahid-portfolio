import { cn } from '@/lib/utils'

/**
 * Atmospheric, theme-aware backdrop for hero / footer chrome.
 *
 * Renders full-bleed (escapes any `container-page` padding via `w-screen`,
 * safe because <body> clips the x-axis) and sits at `-z-10`, so it must be
 * dropped as a child of a `relative` element with content above it. All colour
 * derives from the active palette tokens, so it recolours with every theme.
 *
 * Layers, back to front:
 *   1. a soft two-blob gradient mesh (ink at low alpha)
 *   2. a blueprint grid, radially masked so it dissolves toward the edges
 *   3. an optional faint, grayscale photographic wash (top-anchored, masked)
 */
export function AmbientBackground({
  photo,
  className,
  grid = true,
}: {
  /** Optional faint background photo URL. */
  photo?: string
  className?: string
  /** Render the blueprint grid (default true). */
  grid?: boolean
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2 overflow-hidden',
        className,
      )}
    >
      {/* 1 · gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(42rem 42rem at 78% 8%, color-mix(in oklab, var(--foreground) 11%, transparent), transparent 70%),' +
            'radial-gradient(38rem 38rem at 6% 82%, color-mix(in oklab, var(--foreground) 8%, transparent), transparent 72%)',
        }}
      />

      {/* 2 · blueprint grid, edge-faded */}
      {grid && (
        <div
          className="absolute inset-0 opacity-75"
          style={{
            backgroundImage:
              'linear-gradient(var(--border-strong) 1px, transparent 1px),' +
              'linear-gradient(90deg, var(--border-strong) 1px, transparent 1px)',
            backgroundSize: 'clamp(48px, 6vw, 88px) clamp(48px, 6vw, 88px)',
            maskImage: 'radial-gradient(125% 115% at 50% 0%, #000 28%, transparent 76%)',
            WebkitMaskImage: 'radial-gradient(125% 115% at 50% 0%, #000 28%, transparent 76%)',
          }}
        />
      )}

      {/* 3 · faint photographic wash */}
      {photo && (
        <div
          className="absolute inset-0 opacity-[0.20] mix-blend-multiply"
          style={{
            backgroundImage: `url(${photo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(1) contrast(1.15)',
            maskImage: 'linear-gradient(to bottom, #000 0%, #000 30%, transparent 92%)',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 30%, transparent 92%)',
          }}
        />
      )}
    </div>
  )
}
