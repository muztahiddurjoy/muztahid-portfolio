import type { Metadata } from 'next'
import { getArticles, getWritingPage } from '@/lib/content'
import WritingPage from '../components/pages/writing-page'

export async function generateMetadata(): Promise<Metadata> {
  const chrome = await getWritingPage()
  return {
    title: chrome.metaTitle,
    description: chrome.metaDescription,
  }
}

export default async function Page() {
  const [articles, chrome] = await Promise.all([getArticles(), getWritingPage()])
  return <WritingPage articles={articles} chrome={chrome} />
}
