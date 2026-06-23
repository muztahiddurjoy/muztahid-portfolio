/* ------------------------------------------------------------------ *
 * Pure, Node-safe helpers for Payload Live Preview. No payload imports
 * so they can run in the admin (config) and on the edge.
 * ------------------------------------------------------------------ */

type PreviewTarget =
  | { kind: 'global'; slug: string }
  | { kind: 'collection'; slug: string; docSlug?: string }

/** Map a global/collection being edited to the public frontend path it previews. */
export function frontendPath(target: PreviewTarget): string {
  if (target.kind === 'global') {
    switch (target.slug) {
      case 'home':
      case 'site-settings':
        return '/'
      case 'about':
        return '/about'
      case 'contact':
        return '/contact'
      case 'projects-page':
      case 'project-page':
        return '/projects'
      case 'sessions-page':
      case 'session-page':
        return '/sessions'
      case 'writing-page':
        return '/writing'
      case 'achievements-page':
        return '/achievements'
      case 'certificates-page':
        return '/certificates'
      default:
        return '/'
    }
  }
  const docSlug = target.docSlug
  switch (target.slug) {
    case 'projects':
      return docSlug ? `/projects/${docSlug}` : '/projects'
    case 'sessions':
      return docSlug ? `/sessions/${docSlug}` : '/sessions'
    case 'articles':
      return docSlug ? `/writing/${docSlug}` : '/writing'
    case 'achievements':
      return '/achievements'
    case 'certificates':
      return '/certificates'
    default:
      return '/'
  }
}

/** Wrap a frontend path in the draft-mode entry route (secret-gated). */
export function buildPreviewURL(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || ''
  const secret = process.env.PREVIEW_SECRET || ''
  const params = new URLSearchParams({ path, secret })
  return `${base}/next/preview?${params.toString()}`
}
