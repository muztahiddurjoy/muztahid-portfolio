import type { Metadata } from 'next'
import ContactPage from '../components/pages/contact-page'
import { getContact, getSite } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Have something audacious in mind? Let’s build something that lasts.',
}

export default async function Page() {
  const [contact, site] = await Promise.all([getContact(), getSite()])
  return <ContactPage contact={contact} siteConfig={site} />
}
