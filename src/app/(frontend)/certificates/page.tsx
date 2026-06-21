import type { Metadata } from 'next'
import { getCertificates } from '@/lib/content'
import CertificatesPage from '../components/pages/certificates-page'

export const metadata: Metadata = {
  title: 'Certificates',
  description: 'Credentials and continuous learning across cloud, AI, robotics, and the web.',
}

export default async function Page() {
  const certificates = await getCertificates()
  return <CertificatesPage certificates={certificates} />
}
