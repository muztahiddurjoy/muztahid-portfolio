import type { Metadata } from 'next'
import { Fraunces, Inter, Caveat } from 'next/font/google'
import './styles.css'

import { siteConfig } from '@/lib/portfolio-data'
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

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.metaDescription,
  metadataBase: new URL('https://muztahid.dev'),
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.metaDescription,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${script.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScrollProvider>
            <TransitionProvider>
              <PaperTexture />
              <SiteNav />
              {children}
              <SiteFooter />
            </TransitionProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
