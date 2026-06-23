import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { Fraunces, Inter, Caveat, Great_Vibes } from 'next/font/google'
import './styles.css'

import { getSite } from '@/lib/content'
import { themeInitScript } from '@/lib/themes'
import { ThemeProvider } from './providers/theme-provider'
import { SmoothScrollProvider } from './providers/smooth-scroll'
import { TransitionProvider } from './providers/transition-provider'
import { PaperTexture } from './components/ui/paper-texture'
import { SiteNav } from './components/site-nav'
import { SiteFooter } from './components/site-footer'
import { PreviewProvider } from './components/preview-context'
import { RefreshRouteOnSave } from './components/live/refresh-on-save'

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT'],
})
const body = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const script = Caveat({ subsets: ['latin'], variable: '--font-caveat', display: 'swap', weight: ['400', '500', '600'] })
// formal signature face for the name (navbar · footer · transition overlay)
const signature = Great_Vibes({ subsets: ['latin'], variable: '--font-great-vibes', display: 'swap', weight: '400' })

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite()
  const SITE_URL = site.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://muztahid.dev'
  return {
    title: {
      default: `${site.name} — ${site.role}`,
      template: `%s — ${site.name}`,
    },
    description: site.metaDescription,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: `${site.name} — ${site.role}`,
      description: site.metaDescription,
      type: 'website',
      url: SITE_URL,
      images: site.ogImage ? [site.ogImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} — ${site.role}`,
      description: site.metaDescription,
      images: site.ogImage ? [site.ogImage] : undefined,
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite()
  const { isEnabled: isPreview } = await draftMode()
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${script.variable} ${signature.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScrollProvider>
            <TransitionProvider site={site}>
              {/* In live preview, force final-state (no scroll-hidden) across the
                  whole tree and refresh the route when the previewed doc saves. */}
              <PreviewProvider value={isPreview}>
                <PaperTexture />
                <SiteNav site={site} />
                {children}
                <SiteFooter site={site} />
                {isPreview && <RefreshRouteOnSave />}
              </PreviewProvider>
            </TransitionProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
