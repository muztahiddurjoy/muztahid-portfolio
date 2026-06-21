import type { Metadata } from 'next'
import AboutPage from '../components/pages/about-page'

export const metadata: Metadata = {
  title: 'Story',
  description: 'The story of a founder who builds companies and the technology that makes them inevitable.',
}

export default function Page() {
  return <AboutPage />
}
