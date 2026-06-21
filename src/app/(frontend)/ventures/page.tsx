import type { Metadata } from 'next'
import { getVentures } from '@/lib/content'
import VenturesPage from '../components/pages/ventures-page'

export const metadata: Metadata = {
  title: 'Ventures',
  description: 'Companies, products, and robots I’ve built — vision first, engineering as proof.',
}

export default async function Page() {
  const ventures = await getVentures()
  return <VenturesPage ventures={ventures} />
}
