import type { Metadata } from 'next'
import WritingPage from '../components/pages/writing-page'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Notes on building companies, engineering culture, robotics, and the philosophy of making things that last.',
}

export default function Page() {
  return <WritingPage />
}
