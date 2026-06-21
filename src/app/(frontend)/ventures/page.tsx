import type { Metadata } from 'next'
import VenturesPage from '../components/pages/ventures-page'

export const metadata: Metadata = {
  title: 'Ventures',
  description: 'Companies, products, and robots I’ve built — vision first, engineering as proof.',
}

export default function Page() {
  return <VenturesPage />
}
