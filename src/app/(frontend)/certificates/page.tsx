import type { Metadata } from 'next'
import CertificatesPage from '../components/pages/certificates-page'

export const metadata: Metadata = {
  title: 'Certificates',
  description: 'Credentials and continuous learning across cloud, AI, robotics, and the web.',
}

export default function Page() {
  return <CertificatesPage />
}
