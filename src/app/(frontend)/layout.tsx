import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './styles.css'

import { siteConfig } from '@/lib/portfolio-data'
import { SmoothScrollProvider } from './providers/smooth-scroll'
import { TransitionProvider } from './providers/transition-provider'
import { GrainOverlay } from './components/ui/grain-overlay'
import { AmbientBackdrop } from './components/ui/ambient-backdrop'
import { CustomCursor } from './components/ui/custom-cursor'
import { ScrollProgress } from './components/ui/scroll-progress'
import { SiteNav } from './components/site-nav'
import SiteFooter from './components/site-footer'

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description:
    'Bridging autonomous robotics and scalable software. Engineering intelligent systems from hardware to the cloud.',
  metadataBase: new URL('https://muztahid.dev'),
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: 'Bridging autonomous robotics and scalable software.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <SmoothScrollProvider>
          <TransitionProvider>
            <AmbientBackdrop />
            <GrainOverlay />
            <ScrollProgress />
            <CustomCursor />
            <SiteNav />
            {children}
            <SiteFooter />
          </TransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
