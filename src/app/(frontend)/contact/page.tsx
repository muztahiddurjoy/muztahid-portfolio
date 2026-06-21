import type { Metadata } from 'next'
import ContactPage from '../components/pages/contact-page'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Have something audacious in mind? Let’s build something that lasts.',
}

export default function Page() {
  return <ContactPage />
}
