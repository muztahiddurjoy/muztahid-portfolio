import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import ContactPage from '../components/pages/contact-page'
import { getContact, getContactRaw, getSite } from '@/lib/content'
import { ContactLive } from '../components/live/contact-live'

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact()
  return {
    title: contact.metaTitle,
    description: contact.metaDescription,
  }
}

export default async function Page() {
  const { isEnabled } = await draftMode()
  const site = await getSite()
  if (isEnabled) {
    const initialContact = await getContactRaw()
    return <ContactLive initialContact={initialContact} site={site} />
  }
  const contact = await getContact()
  return <ContactPage contact={contact} siteConfig={site} />
}
