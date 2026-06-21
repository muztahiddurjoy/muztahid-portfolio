import type { Metadata } from 'next'
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://muztahid.dev'

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite()
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
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} — ${site.role}`,
      description: site.metaDescription,
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite()
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
              <PaperTexture />
              <SiteNav site={site} />
              {children}
              <SiteFooter site={site} />
            </TransitionProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
