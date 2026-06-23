import type { Metadata } from 'next'
import { getCertificates, getCertificatesPage } from '@/lib/content'
import CertificatesPage from '../components/pages/certificates-page'

export async function generateMetadata(): Promise<Metadata> {
  const chrome = await getCertificatesPage()
  return {
    title: chrome.metaTitle,
    description: chrome.metaDescription,
  }
}

export default async function Page() {
  const [certificates, chrome] = await Promise.all([getCertificates(), getCertificatesPage()])
  return <CertificatesPage certificates={certificates} chrome={chrome} />
}
